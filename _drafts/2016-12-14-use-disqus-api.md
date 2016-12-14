---
layout: post
title: "科学使用 Disqus"
description: ""
date: 2016-12-14 05:00:00+0800
category: tech
tags: ["Disqus", "Disqus API", "PHP", "CURL", "JavaScript"]
---

## 为什么还用 Disqus？

在使用静态博客之前，我也是很犹豫，到底是使用什么来做评论框比较好？当时有想过用多说，好评如潮，功能相对齐全，但也看到不少人对它的评价也并不高，不是很稳定。最终，我还是选择老牌且逼格满满的 Disqus，毕竟是社交评论框，当年也就懂有被墙的风险。

几个月前，`disqus.com` 在国内大部，终于从“偶尔抽风”转向“完全被墙”，这样一来，本来访问量就不多的博客，访客想留言、写写评论都得翻墙？看客想留下足迹都没办法，实在不堪。

那么，是不是应该实践许久之前就考虑过的转向多说？固然，[Disqus 有不少缺点](/talk-about-duoshuo.html#id-disqus-)，有些人也不喜欢这个评论框，但换评论系统真的麻烦，如果能不换我也不想换。

## 怎么用 Disqus API？

之前为了在首页[显示评论计数](/disqus-comment-count.html)，折腾过 Disqus API。现在由于 Disqus 已被墙，并没法在网页中直接通过 AJAX 来提交请求。想要实现不翻墙即可访问 Disqus API 的话，按理说应该要像我们翻墙一样，需要一个代理服务器。

除了使用 JS AJAX 来操作 API 之外，另外我们也可以使用 CURL 来操作 API。CURL 需要后端支持，要使用 CURL，就需要另外一台 VPS 或者支持 CURL 的虚拟主机等。理论上，境内的网络无法访问 Disqus，所以这台主机必须在境外。
