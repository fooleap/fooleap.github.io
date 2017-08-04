---
layout: post
title: "Disqus API 的权限问题"
date: 2017-08-04 14:49:40+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API"]
---

折腾 Disqus API 的人总会碰到这样那样的问题，很多是由于权限不足导致的。其中有两点急需解决，分别是匿名评论以及获取评论者电子邮箱。

## 发表/回复评论

评论框最为重要的功能是发表评论，使用 Disqus API，做一个任何人可用的评论框，那么匿名评论显得格外重要。若使用自己申请的 `api_key` 抑或 `api_secret`，带上 `author_name`、`author_email` 参数去请求 `posts/create`，会返回以下错误：

```json
{"code":12,"response":"This application cannot create posts on the chosen forum"}
```

Disqus API 文档对 `posts/create` 的介绍[[1]][1]并不少，但无论如何试，就是搞不定匿名评论。

通过 Google 搜索，我找到了解决方法[[2]][2]。Disqus 官方网页使用的 API 跟提供给我们应该是一样的，区别在于权限。支持匿名评论的原生评论框，其使用的 `api_key` 拥有匿名评论的权限，经查看，原生评论框的 `api_key` 只有一个，也即：

```
E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F
```

使用这个 `api_key` 便能实现匿名评论。后来我发现，`posts/create` 这个 API 而言：

1. 使用原生评论框的 `api_key`，可发表匿名评论，Session（帐号密码登录）认证后，可发表匿名评论、可指定评论状态、不可指定 IP 地址
2. 使用自己申请的 key 进行 OAuth 2 (read,write) 认证后，不可发表匿名评论、可指定评论状态、可指定 IP 地址

两种认证方式的权限如下：

| authentication | anonymous | state | ip_address |
|----------------|-----------|-------|------------|
| Session        | √        | √    | ×         |
| OAuth          | ×        | √    | √         |

我发现其中有个 BUG，当 Session 认证并指定 `state` 为 `approve` 时，回复已登录用户的评论，对方会收到 2 封邮件通知。

## 评论者电子邮箱

为啥要取到评论作者的邮箱？因为取到评论者邮箱，便可以给匿名评论者发回复邮件通知，也可以为匿名评论者指定 Gravatar 头像。

下表是经测试后，`posts/list` 是否能取得评论作者邮箱的权限：

| key              | none | Session | OAuth | 
|------------------|------|---------|-------|
| 官方 api_key     | ×   | √      |       |
| 自己 api_key     | ×   | ×      |       |
| 自己 api_secret  |      |         | √    |

OAuth 认证时，Application 需将权限设置为：

> Permissions:
>
> Read, Write, Manage Forums

以上均为管理员身份的认证，若不是网站管理员，就算认证了，也是无法看到邮箱。由此看来，必须是网站管理员身份才可看到评论者的邮箱。

## 总结

搞清楚以上两个权限后，便会发现：若想要匿名评论，则必须使用原生评论框的 `api_key`，经 Session 认证后，还可指定评论的状态，获取到评论者邮箱。

所以目前我利用 Disqus API 所做的评论框[[3]][3]，在后端仅仅使用原生评论框的那个 `api_key`。为了支持 Disqus 会员登录评论，可能后面会加上 OAuth 认证登录。

## 参考资料

[1]: https://disqus.com/api/docs/posts/create/ "posts/create"
[2]: http://jonathonhill.net/2013-07-11/disqus-guest-posting-via-api/ "DISQUS GUEST POSTING VIA API"
[3]: https://github.com/fooleap/disqus-php-api "Disqus PHP API"

**本文历史**

* 2017 年 08 月 04 日 完成初稿
