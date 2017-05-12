---
layout: post
title: "为 Jekyll 加上简单搜索功能"
description: "使用静态博客，除却棘手的评论功能，搜索功能也是个问题。想要实现全文搜索功能不难，在不借助外力的条件下只能用 JS，搜索便必须遍历所有文章内容，文章内容少还好，多了就不是很合适。"
date: 2017-05-11 19:28:55+0800
category: tech
thumb: IMG_PATH/js.svg
tags: [JavaScript, Jekyll]
---

* toc
{:toc}

使用静态博客，除却棘手的评论功能，搜索功能也是个问题。想要实现全文搜索功能不难，在不借助外力的条件下只能用 JS，搜索便必须遍历所有文章内容，文章内容少还好，多了就不是很合适。

鄙人写了这么多年博客，博文也没几篇，之前一直觉得没有必要搞什么搜索功能，其实是懒。

简单的标题搜索实现十分简单，想到归档页面本身就加载所有文章标题，何不直接扔个搜索框在归档页面呢？就简单写下。

## 页面代码

本博客的归档页面源码如下：

```liquid{% raw %}
{% for post in site.posts %}
{% unless post %}
{% else %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% if year != nyear %}
## {{ post.date | date: '%Y' }}
{:class="archive-title"}
{% endif %}
{% endunless %}
* {{ post.date | date: "%m-%d" }} &raquo; [{{ post.title }}]({{ post.url }} "{{ post.title }}"){:.archive-item-link}
{% endfor %}
{% endraw %}```

经 Jekyll 渲染生成后见[归档页面](/archive.html)，列表项的源码如下：

```html
<li>
    <p>05-11 » <a href="/jekyll-simple-search.html" title="为 Jekyll 加上简单搜索功能" class="archive-item-link">为 Jekyll 加上简单搜索功能</a></p>
</li>
```

其中，配合搜索功能的主要是 `class` 以及 `title`，在归档页面放个搜索框：

```html
<input class="page-search-input" type="text" placeholder="搜索" />
```

## JavaScript 代码

```javascript
document.querySelector('.page-search-input').addEventListener('keyup',function(e){
    var archive = document.getElementsByClassName('archive-item-link');
    for (var i = 0; i < archive.length; i++){
        if( archive[i].title.toLowerCase().indexOf(this.value.toLowerCase()) > -1 ) {
            archive[i].closest('li').style.display = '';
        } else {
            archive[i].closest('li').style.display = 'none';
        }
    }
    if(e.keyCode == 13){
        window.open('https://www.google.com/#q=site:blog.fooleap.org+'+this.value);
    }
})
```

监听输入框的 `keyup` 事件，每一次触发则遍历每一个标题，忽略大小写并使用 `indexOf` 方法判断是否含有输入框内的字符串，有则显示该项，无则隐藏掉。

如果碰到输入回车，则跳到 Google 搜索。

## 流程图

其大致流程如下：

```flow
st=>start: 开始
e=>end: 结束
io1=>inputoutput: 输入
cond1=>condition: 是否含有该字符串
op1=>operation: 显示
op2=>operation: 隐藏
cond2=>condition: 是否回车
op3=>operation: 跳转到 Google

st->io1(right)->cond1
cond1(yes,right)->op1
cond1(no)->op2
op1->cond2
op2->cond2
cond2(yes,right)->op3
cond2(no)->e
op3->e
```

**本文历史**

* 2017 年 05 月 11 日 完成初稿
