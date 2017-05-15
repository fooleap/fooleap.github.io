---
layout: post
title: "为 Jekyll 添加一个简单的 API"
description: "Jekyll 是静态博客生成器，只能生成静态页面，原则上是没法创建一个动态的 API。但灵活利用 Liquid 的语法，还是可以创建一个简单的静态的 API，也就是说传参无效的，直接返回 JSON 数据的 API。"
date: 2017-05-14 13:16:49+0800
category: tech
thumb: IMG_PATH/jekyll.svg
tags: [Jekyll, API, Liquid]
---

* toc
{:toc}

Jekyll 是静态博客生成器，只能生成静态页面，原则上是没法创建一个动态的 API。但灵活利用 Liquid 的语法，还是可以创建一个简单的静态的 API，也就是说传参无效的，直接返回 JSON 数据的 API。

Jekyll 可以生成静态的 HTML 页面，也可以生成其他文本格式的文件。只要稍微一改，便可生成一个包含 JSON 数据的文件，这也就是 API。

下面以一个简单的例子来看看是怎么实现的。

## 确定需求

Jekyll 有分页功能，这是由一个官方的插件 `jekyll-paginate` 提供的[[1]][1]。这个插件会给文章列表分页，并生成页数相应的页面文件。

我们想要实现不刷新的分页，可以直接在一个页面输出所有文章列表，经 CSS 实现显隐，并通过 JS 来进行 DOM 操作即可。这样是不完美的，如果文章够多，列表项足够复杂，页面会很大，若带上图，那就更加酸爽了。

这时候，若有个简单的 API 就好了，这个 API 一般是这样的：传入页数输出相应的文章数据。前面已经说过，Jekyll 实现的 API 没法实现传参，那么这个 API，只能是返回所有文章数据。

## 实现需求

那么，应该如何创建这样一个 API 呢？这才是关键，我们很懒，遇到问题第一时间不是自己苦想怎么实现，而是进行 Google 搜索，这不，随便一搜有不少答案[[2]][2][[3]][3]。

以下代码将创建一个文件，包含所有文章的数组，每篇文章有标题、链接、分类、时间、标签等属性。

```liquid{% raw %}
---
layout: null
permalink: /post.json
---
[{% for post in site.posts %}
    {
        "title": {{ post.title | jsonify }},
        "url": {{ post.url | jsonify }},
        "category": {{ post.category | jsonify }},
        "date": {{ post.date | jsonify }},
        "tags": {{ post.tags | jsonify }}
    }{% unless forloop.last %},{% endunless %}
{% endfor %}]
{% endraw %}```

其中所用到的 Liquid 语法主要有标签 `for`、`unless` 以及过滤器 `jsonify`。

## 参考资料

[1]: https://jekyllrb.com/docs/pagination/ "Pagination &#124; Jekyll • Simple, blog-aware, static sites"
[2]: https://www.frobiovox.com/posts/2015/10/25/add-an-api-to-your-jekyll-blog.html "Add an API to Your Jekyll Blog – Frank Robert Anderson"
[3]: https://www.techiediaries.com/how-to-use-jekyll-like-a-pro-output-data-as-json/ "How to use Jekyll like a pro : build a JSON API for your static website  • techiediaries"

**本文历史**

* 2017 年 05 月 14 日 完成初稿
