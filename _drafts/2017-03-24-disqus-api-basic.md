---
layout: post
title: "Disqus API 基础"
description: ""
date: 2017-03-24 08:00:00+0800
thumb: IMG_PATH/disqus.png
category: tech
tags: ["Disqus", "Disqus API"]
---

在 Disqus 被墙的大环境下，位于墙内的我们艰难地使用着 Disqus 的服务。我现在还用着 Disqus，是因为 Disqus 的服务确实很稳定，Disqus 的盈利模式[[1]][1]应该也是靠谱的，期待有一天能够重新开放。

如前文所提，利用 Disqus API 来解决问题是目前较为可行的办法，@qgy18 大神的博客[[2]][2]也是做了类似的处理，Disqus 评论框加载不了，则激活基础模式。事实上，若有人能将 Disqus 常用的 API 封装起来，就可方便他人使用，现在也已经有人在做了。

鄙人的 PHP 编程能力，可能还算不上入门，仅仅是简单的看得懂。本博客在用的几个 API，也是边查手册边搞的，相当粗糙。实现简单的功能并不复杂，只是实现过程中会有些小问题，有时间我会将具体的思路一点点码出来，尽可能讲清楚，算是解决 Disqus 评论问题的一个小记录。

Disqus API

forum 论坛
thread 文章
post 评论
category 分类

## 参考资料

[1]: https://disqus.com/home/discussion/androidpolice/join_us_for_an_ama_with_disqus_at_11am_pst/#comment-2649731809 "We make money through a few different ways"
[2]: https://imququ.com "JerryQu 的小站"
