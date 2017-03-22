---
layout: post
title: "科学使用 Disqus"
description: "当初选择静态博客就是想将数据托管给第三方，自己只管内容就行，偶尔有空可以换换皮，然而前端时间却博客评论操碎了心，因为 Disqus 被墙了。"
date: 2017-03-06 15:00:00+0800
thumb: IMG_PATH/disqus.png
category: tech
tags: ["Disqus", "Disqus API", "PHP", "cURL", "JavaScript"]
---

当初选择静态博客就是想将数据托管给第三方，自己只管内容就行，偶尔有空可以换换皮，然而前段时间却为博客评论操碎了心，因为 Disqus 被墙了。

## 我为什么还用 Disqus？

在使用静态博客之前，我也是很犹豫，到底是使用什么来做评论框比较好？当时有想过用多说，好评如潮，功能相对齐全，但也看到不少人对它的评价也并不高，不是很稳定。最终，我还是选择老牌且逼格满满的 Disqus，毕竟是社交评论框，当年也就懂有被墙的风险。

半年前，`disqus.com` 在国内大部，终于从“偶尔抽风”转向“完全被墙”，这样一来，本来访问量就不多的博客，访客想留言、写写评论都得翻墙？我想不应该是这样的，如此博客评论功能就相当于废了。

那么，是不是应该实践许久之前就考虑过的转向多说？固然，[Disqus 有不少缺点](/talk-about-duoshuo.html#id-disqus-)，有些人也不喜欢这个评论框，但换评论系统真的麻烦，能不换我就不会换。

怎么不换是个问题，Disqus 被墙已是事实，自己可以翻墙访问，但并不能保证每个访客都能翻墙，怎么解决？之前看过反向代理实现无需翻墙访问 Google，对 Disqus 而言，也许只能是反向代理。

事实上，我对正向代理、反向代理这些概念并不熟悉，也不曾想去配置 Nginx 实现反向代理 Disqus，想想就感觉很复杂。

## 借路使用 Disqus API


使用之前为了在首页[显示评论计数](/disqus-comment-count.html)，折腾过 Disqus API。现在由于 Disqus 已被墙，并没法在网页中直接通过 AJAX 来发起请求。除却网页中可以发起请求，cURL 也能发起请求。

我想起了另一种方法，想要实现不翻墙即可访问 Disqus API，可以找一个服务器，我们把数据提交到这个服务器，它接过手后顺便转发给 Disqus，返回内容可以是 Disqus 返回的内容，也可以将其简单处理一下再返回。

除了使用 JS AJAX 来操作 API 之外，另外我们也可以使用 cURL 来操作 API。cURL 需要后端支持，要使用 cURL，就需要另外一台 VPS 或者支持 cURL 的虚拟主机等。理论上，境内的网络无法访问 Disqus，所以这台主机必须在境外。

在 Disqus 可以流畅访问的情况下，我们可以这么使用 Disqus API：

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 浏览器发送请求
io1=>inputoutput: Disqus 响应

st(right)->op1->io1(right)->e
```
如今 Disqus 被墙，因此我们可以这么搞：

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 浏览器发送请求(XHR)
op2=>operation: 服务器发送请求(cURL)
io1=>inputoutput: Disqus 响应
io2=>inputoutput: 服务器响应

st(right)->op1->op2(right)->io1->io2(right)->e
```
