---
layout: post
title: "Disqus API 基础"
description: ""
date: 2017-03-24 08:00:00+0800
thumb: IMG_PATH/disqus.png
category: tech
tags: ["Disqus", "Disqus API"]
---

在 Disqus 被墙的大环境下，位于墙内的我们艰难地使用着 Disqus 的服务。现在还用着 Disqus，是因为 Disqus 的服务确实很稳定，Disqus 的盈利模式[[1]][1]应该也是靠谱的，期待有一天能够重新开放。

如前文所述，利用 Disqus API 来解决问题是目前较为可行的办法。本博客在用的几个 API，是我边查手册边搞的，相当粗糙。简单的评论框功能实现起来并不复杂，只是略显繁琐，且过程中有些坑，有编程基础的博友可直接看我的 DEMO[[2]][2]。

有时间我会将具体的思路一点点码出来，尽可能讲清楚，算是解决 Disqus 评论问题的一个小记录。

|对象|描述|
|---
|forum|网站，自己站点的 `forum` 名可以在 Disqus 后台设置看到( shortname )|
|category|分类，一个 `forum` 下可以有多个 `category`|
|thread|文章，一篇文章是一个 `thread`，可以设置 `category`|
|post|评论，`post`有个重要属性——`parent`，是前端页面实现嵌套评论的前提|
|user|用户，以上所有对象都有对应的 `author`，这个 `author` 由用户充当，`post` 的 `author` 可以匿名（anonymous）|


## 参考资料

{% assign repo = site.github.public_repositories | where: "name","disqus-php-api" | first %}

[1]: https://disqus.com/home/discussion/androidpolice/join_us_for_an_ama_with_disqus_at_11am_pst/#comment-2649731809 "We make money through a few different ways"
[2]: {{ repo.html_url }} "{{ site.github.owner_name }}/{{ repo.name }}"
