---
layout: post
title: "Disqus 的 URL 编码问题"
date: 2017-09-20 22:32:29+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API"]
---

* toc
{:toc}

编码问题一直是编程界老生常谈的问题。由于鄙人博文不使用特殊字符，因此在使用 Disqus API 时，并没有遇到 URL 编码[[1]][1]问题，一切正常。如若博文链接包含汉字，Disqus 又是怎么处理的呢？

我尝试新创建一篇博文来测试，博文链接为 `http://blog.fooleap.org/测试链接.html`

## 原生评论框

使用 Disqus 原生评论框，并采用以下配置：

```js
disqus_config = function () {
    this.page.identifier = location.pathname;
    this.page.title = "测试文章";
    this.page.url = location.href;
}
```

初始化之后，`thread` 正常创建，返回所设置的三个属性正常。

```json
{
    "identifiers":[
        "/%E6%B5%8B%E8%AF%95%E9%93%BE%E6%8E%A5.html"
    ],
    "link":"http://blog.fooleap.org/%E6%B5%8B%E8%AF%95%E9%93%BE%E6%8E%A5.html",
    "title":"\u6d4b\u8bd5\u6587\u7ae0"
}
```

## Disqus API 相关

### 中文链接获取 thread 信息

当我以链接去请求 Disqus API 以获取 `thread` 信息，却返回失败。

```js
var xhr = new XMLHttpRequest();
xhr.open('GET','https://disqus.com/api/3.0/threads/details.json?forum=fooleap&thread:link=http://blog.fooleap.org/%E6%B5%8B%E8%AF%95%E9%93%BE%E6%8E%A5.html&api_key=E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F');
xhr.send();
```

返回的内容，目测链接传过去是被疑似 `decodeURI` 了。

```json
{
    "code":2,
    "response":"Invalid argument, 'thread': Unable to find thread 'link:http://blog.fooleap.org/\u6d4b\u8bd5\u94fe\u63a5.html'"
}
```

于是先自我 `encodeURI`，返回正常。

```js
var xhr = new XMLHttpRequest();
xhr.open('GET','https://disqus.com/api/3.0/threads/details.json?forum=fooleap&thread:link='+encodeURI('http://blog.fooleap.org/%E6%B5%8B%E8%AF%95%E9%93%BE%E6%8E%A5.html')+'&api_key=E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F');
xhr.send();
```

### Disqus API 创建 thread

上面是使用页面链接作为参数，请求 Disqus API 获取数据例子。Disqus API 除了可以获取 `thread` 数据，还可以进行创建 `thread` 操作，也就是使用原生评论框时，自动创建的那个操作。

当我以等同上面的 `identifier`、`title`、`url` 并 `encodeURIComponent` 后作为参数请求 `threads/create`，`thread` 成功创建，属性和原生评论框创建的一致。

从以上例子可得出，我们在请求 Disqus API 时，只要先把链接 `encodeURI` 便可。

当然上面例子只是简单测试一下中文，若链接包含一些特殊符号，估计可能又是另一种情况。在这里，我也不再进行深究，我始终认为链接里不包含特殊字符及汉字较好。

另外，`thread` 的 `slug` 官方的说明是限制字母及数字，我使用过程中发现 `-` 符号也行，若不是强迫症，也可以留空。

## 参考资料

[1]: http://www.ruanyifeng.com/blog/2010/02/url_encoding.html "关于URL编码 - 阮一峰的网络日志"

**本文历史**

* 2017 年 09 月 20 日 完成初稿
