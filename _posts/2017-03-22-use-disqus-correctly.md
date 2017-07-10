---
layout: post
title: "科学使用 Disqus"
description: "当初选择静态博客就是想更简单的备份博文，但静态博客的评论本身就是问题，还好有 Disqus，感觉还挺好。然而前段时间我却为博客评论操碎了心，因为 Disqus 被墙了。"
date: 2017-03-22 13:00:00+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API", "cURL"]
---

* toc
{:toc}

当初选择静态博客就是想更简单的备份博文，但静态博客的评论本身就是问题，还好有 Disqus，感觉还挺好。然而前段时间我却为博客评论操碎了心，因为 Disqus 被墙了。

## 为什么还用 Disqus

在使用静态博客之前，我也是很犹豫，到底是使用什么来做评论框比较好？当时有想过用多说，好评如潮，功能相对齐全，但也看到不少人对它的评价也并不高，不是很稳定。最终，我还是选择老牌且逼格满满的 Disqus，因是社交评论框，当年也懂有被墙的隐患。

半年前，`disqus.com` 在国内大部，终于从“偶尔抽风”转向“完全被墙”，这样一来，本来访问量就不多的博客，访客想留言、写写评论都得翻墙？我想不应该是这样的，如此博客评论功能就相当于废了。

那么，是不是该考虑更换评论系统？我在许久之前就考虑过转向多说，还好最终因为某些问题没转多说，它已经通知即将下线[[1]][1]。找一套评论系统程序，数据存储等用自己的主机，新博客可以这么干，但想要保留原评论，这个工程估计不会小。更别说自造评论系统了，我估计还搞不定。

评论系统能不换我就不会换，Disqus 目前依然是最大的第三方评论系统，不容易翻船。

怎么不换是个问题，Disqus 被墙已是事实，自己可以翻墙访问，但并不能保证每个访客都能翻墙，怎么解决？之前看过反向代理实现无需翻墙访问 Google，对 Disqus 而言，也许只能是反向代理。

事实上，我对正向代理、反向代理这些概念并不熟悉，也不曾想去配置服务器实现反向代理 Disqus，想想就感觉很复杂。

## 借路访问 Disqus

之前为了在首页[显示评论计数](/disqus-comment-count.html)，我折腾过 Disqus API。现在由于 Disqus 已被墙，并没法在网页中直接通过 XMLHttpRequest 来发起请求。除却浏览器可以发起请求，cURL 也能发起请求。

我想起了一种方法，想要实现不翻墙即可访问 Disqus API，可以找一个服务器，客户端数据把发送到这个服务器，它接过手后顺便使用 cURL 发给 Disqus，根据 Disqus 返回的内容，服务器可直接返回给客户端，也可以将其简单处理一下再返回，感觉这也是反向代理。

cURL 需要程序支持，要使用 cURL，就需要另外一台 VPS 或者支持 cURL 的虚拟主机等。理论上，境内的网络大多无法直接访问 Disqus，虽说可以使用指定 IP，但访问 Disqus 速度明显没有境外主机快，所以这台主机~~必须~~最好在境外。

下面，用简单的流程图（不一定标准），将这个过程画出来。

在 Disqus 可以流畅访问的情况下，我们可以这么使用 Disqus API：

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 客户端请求(XHR)
io1=>inputoutput: Disqus 响应

st(right)->op1->io1(right)->e
```
如今 Disqus 被墙，因此我们可以这么搞：

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 客户端请求(XHR)
op2=>operation: 服务器请求(cURL)
io1=>inputoutput: Disqus 响应
io2=>inputoutput: 服务器响应

st(right)->op1->op2(right)->io1->io2(right)->e
```

有了 libcurl，后端程序也能够发送请求，为了方便后续使用，我选择了 PHP cURL[[2]][2]（毕竟 PHP 的虚拟主机好找）。

## 使用 Disqus API 的优点

到这里，我能想象得到使用 Disqus API 的优点不少，例如：

* 不用翻墙即可使用
* 样式可以完全自定义
* 可实现 Disqus 评论框没有的功能
* ……

优点那么多，想想都口水直流，但具体怎么实现才是大问题。

## 如何使用 Disqus API

提供评论的浏览及发表这两个功能，可以说是博客评论最为基础的。为了丰富文章列表页的显示，我还在首页放了相关文章评论数的显示。

我查看了 Disqus 的 API 文档[[3]][3]，以上所述功能都找到了对应的 API 接口。

* 评论计数 `threads/list`
* 评论浏览 `threads/listPosts`, `posts/list`
* 评论发表 `posts/create`

至此，想要实现不翻墙使用 Disqus，研究的内容至少如下：

* Disqus API 核心，其他围着它转
* PHP 主要是 PHP cURL 的使用
* HTML/CSS/JS 需要自己写一个评论框

相比较复制几行代码即可实现加载 Disqus 评论框，任不重，但道似乎还很远。

## 参考资料

[1]: http://dev.duoshuo.com/threads/58d10f50e9a8cb4433fd5c5d "重要通知: 多说即将关闭"
[2]: http://php.net/manual/zh/book.curl.php "PHP: cURL - Manual"
[3]: https://disqus.com/api/docs/ "API Documentation - Disqus"

**本文历史**

* 2017 年 03 月 22 日 完成初稿
