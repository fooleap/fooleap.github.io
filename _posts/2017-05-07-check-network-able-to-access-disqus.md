---
layout: post
title: "检测网络是否能够访问 Disqus"
description: "此前，顺着科学使用 Disuqs 的思路，鄙人利用 Disqus API 实现了基本的访客留言功能，虽不完美，但也够用。后来，还是想在网络条件允许的情况下加载 Disqus 原生评论框，网络条件不佳的情况下加载自制评论框。"
date: 2017-05-07 23:00:50+0800
category: tech
thumb: IMG_PATH/disqus.svg
tags: [Disqus, JavaScript, AJAX]
---

* toc
{:toc}

此前，顺着[科学使用 Disuqs](/use-disqus-correctly.html) 的思路，鄙人利用 Disqus API 实现了基本的访客留言功能，虽不完美，但也够用。后来，还是想在网络条件允许的情况下加载 Disqus 原生评论框，网络条件不佳的情况下加载自制评论框。

## 存在问题

利用 Disqus API 实现的评论框，所谓的不完美主要有以下：

1. Disqus 原生评论框已不为访客用户调用 Gravatar 头像
2. 尚未实现发送访客自己 IP 给 Disqus
3. 未实现推荐、点赞等功能


第一点，Disqus 评论框以前根据访客用的邮箱信息调用 Gravatar 头像，但在某次更新之后，就没有再调用 Gravatar 头像。若博客评论都采用 Disqus 访客留言的 API，那么在 Disqus 原生评论框上显示就是默认头像，虽可指定，但强迫症你懂的。

第二点，IP 信息 Disqus API 有提供参数，发送请求却返回权限不足，同理还有位置信息等数据。是的，这个并不是重点，所以我也没有花再多时间去研究。

第三点，因所有访客用户的 HTTP Headers 及 IP 信息都一样，故推荐、点赞等功能无法实现。若能实现第二点，才有可能实现推荐、点赞等功能。

若直接在网页中使用 AJAX 去请求 Disqus API，应该能实现二、三点所提及的功能。但这样就得翻墙，倒不如直接加载 Disqus 原生评论框。

## 屏蔽现状

我们总说 Disqus 被墙，那么 Disqus 被墙的域名是什么？目前，Disqus 三个域名目前在国内的情况大致如下：

| 域名          | 说明                                        | 使用         |
|---------------|---------------------------------------------|--------------|
| disqus.com    | Disqus 主域名，国内大多数网络无法访问       | 网站、API 等 |
| disquscdn.com | Disqus 静态资源 CDN，国内大多数网络可以访问 | 头像、图片   |
| disq.us       | Disqus 出站链接，国内大多数网络可以访问     | 跳转链接     |

从上表可以看出，最为主要还是主域名 `disqus.com`，想要实现检测网络是否能够访问 Disqus，干脆就直接检测能否连接 `disqus.com`。

## 实现流程

能想到的方法就是在网页中通过 AJAX GET 请求 `disqus.com` 一个小文件，若能成功返回，则加载 Disqus 原生评论框；若返回失败，则加载自制评论框。

其大致流程如下：

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 请求
cond1=>condition: 响应
op2=>operation: Disqus 评论框
op3=>operation: 自制评论框

st->op1(right)->cond1
cond1(yes)->op2->e
cond1(no)->op3->e
```
## 具体代码

我发现 Disqus 评论框加载的时候，都会请求一个小文件：

    https://disqus.com/next/config.json

经测试，这个文件不存在跨域的权限问题，在自己网站上亦可发送异步请求。

在这里，直接使用XMLHttpRequest 这个 API 来发送请求便可，具体应用起来需要考虑的就没有上面流程图那么简单任性，必须配合 XMLHttpRequest 的具体事件来做一些适配，以下是一个简单的例子：

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', '//disqus.com/next/config.json?' + new Date().getTime(), true);
xhr.timeout = 3000;
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // 加载 Disqus 评论框
    }
}
xhr.ontimeout = function () {
    xhr.abort();
    // 加载自制评论框
}
xhr.onerror = function() {
    // 加载自制评论框
}
xhr.send(null);
```

采用超时的方法来判断是否能连接上 Disqus，是因为我想 3 秒内无法成功 `GET` 这个小文件，就算翻了墙，评论框的加载速度也不容乐观。

## 更加合理

加载 Disqus 评论框最初就是需要加载一个 js 文件，何不在根据它的状态来判断呢？`onload` 便是能加载，这不就能省去一步了吗？搞起：

```javascript
var disqus_onload = false;
var disqus = document.createElement('script');
disqus.src = '//shortname.disqus.com/embed.js';
disqus.setAttribute('data-timestamp', +new Date());
disqus.onload = function(){
    disqus_onload = true;
}
disqus.onerror = function(){
    disqus_onload = false;
}
document.head.appendChild(disqus);

setTimeout(function(){
    if ( !disqus_onload ){
        disqus_onload = true;
        // 加载自制评论框，隐藏掉 Disqus 原生评论框的 div
    }
}, 3000);
```

Disqus JS 文件三秒内没有 `onload`，则加载自制评论框。这里有一个 bug，有可能只是网速慢点，Disqus 评论框会继续加载，所以加载自制评论框的同时可以隐藏掉原生评论框。

事实上，若灵活利用 Disqus 相关的回调函数，或许能带来更好的体验。比如说 `onReady` 时，给个可以切换的提示。

这些天感觉就算翻了墙，有时候访问 Disqus 还是挺慢的。我想了另一种方案，就是无论如何，同时加载两种评论框，Disqus 评论框做隐藏，监听 Disqus 的事件，当某个事件发生时切换至 Disqus 评论框。

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 加载两种评论框
cond1=>condition: Disqus 加载失败
op2=>operation: 某事件切换到 Disqus 评论框

st->op1(right)->cond1
cond1(no,right)->op2->e
cond1(yes)->e
```

流程图看起来是否简单了很多？有时间我会把这些想法打成包。

**本文历史**

* 2017 年 05 月 07 日 完成初稿
* 2017 年 05 月 11 日 完善
* 2017 年 05 月 24 日 另一种方案
