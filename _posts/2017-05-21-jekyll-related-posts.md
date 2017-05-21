---
layout: post
title: 为 Jekyll 文章页添加相关文章
description: "标题所指的文章页相关文章，就是小博的“猜你喜欢”这个列表。Jekyll 原生实现不完美且麻烦，故还是使用 JavaScript 来实现。"
date: 2017-05-21 18:00:00+0800
category: tech
thumb: IMG_PATH/jekyll.svg
tags: [Jekyll, JavaScript]
---

* toc
{:toc}

标题所指的文章页相关文章，就是小博的“猜你喜欢”这个列表。Jekyll 原生实现不完美且麻烦，故还是使用 JavaScript 来实现。

Jekyll 提供了全局变量 `site.related_posts`，这个变量默认是最新的十篇文章。据文档描述，可以在运行 Jekyll 的时候加上 `--lsi` （潜在语义索引）选项，则会根据 Tags 等筛选出类似的文章。遗憾的是，GitHub Pages 并不支持 lsi，就算只在本地运行 Jekyll，也需要安装另外两个 gem：`gsl` 以及 `classifier-reborn`[[1]][1][[2]][2]，总之两个字——麻烦。还不知能否实现生成随机的文章列表，就算能随机，也是静态的，遂放弃。

## 需求分析

相关文章理应是随机的同一类别文章，而鄙人博客只有两个类别，同类的文章有些也并不是很相关，所以还得根据 Tags 来考虑。火烧猪头熟面熟面，上篇才讲到，是的，这个相关文章也要利用那个简单的 API 来实现。

我初步设想是这样的，根据 Tags 获取所有的相关文章，若文章数量不足 5 篇，则随机再取相关 Category 的文章添至 5 篇。最后乱序之取 5 篇，并输出标题链接列表贴到网页上。

## 实现流程

根据鄙人上面的想法，其流程图大致如下：

```flow
st=>start: 开始
e=>end: 结束
io1=>inputoutput: 文章的 Tags 以及 Category
io2=>inputoutput: 显示到页面
cond1=>condition: 文章数量是否足够
op1=>operation: 筛选出相关 Tag 的所有文章
op2=>operation: 随机取尚缺数量的同类文章
op3=>operation: 随机取 5 篇

st->io1->op1->cond1
cond1(yes,right)->op3
cond1(no)->op2(right)->op3
op3(right)->io2->e
```

## 详细代码

```javascript
// 获取文章数据
var postData;
var xhrPosts = new XMLHttpRequest();
xhrPosts.open('GET', '/posts.json', true);
xhrPosts.onreadystatechange = function() {
    if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
        postData = JSON.parse(xhrPosts.responseText);
        randomPosts(relatedPosts(page.tags, page.category));
    }
}
xhrPosts.send(null);

// 获取相关文章
function relatedPosts(tags, cat){
    var posts = [];
    var used = [];
    // 获取相关 Tags 的文章
    postData.forEach(function(item, i){
        if( item.tags.some(function(tag) {return tags.indexOf(tag) > -1;}) && item.url != location.pathname ){
            posts.push(item);
            used.push(i);
        }
    })
    // 文章数不足，则随机添加同 Category 文章
    while (posts.length < 5) {
        var index = Math.floor(Math.random() * postData.length);
        var item = postData[index];
        if( used.indexOf(index) == '-1' && item.category == cat && item.url != location.pathname ){
            posts.push(item);
            used.push(index);
        }
    }
    return posts;
}

// 随机（即乱序）取 5 篇文章，并显示在页面
function randomPosts(posts){
    var used = [];
    var counter = 0;
    var html = '';
    while (counter < 5 ) {
        var index = Math.floor(Math.random() * posts.length);
        if (used.indexOf(index) == '-1') {
            html += '<li class="post-extend-item"><a class="post-extend-link" href="' + posts[index].url + '" title="' + posts[index].title + '">' + posts[index].title + '</a></li>\n';
            used.push(index);
            counter++;
        }
    }
    document.querySelector('#random-posts ul').insertAdjacentHTML('beforeend', html);
}
```

## 参考资料

[1]: http://tonyarnold.com/2014/03/27/speeding-up-jekylls-latent-semantic-mapping.html "Speeding up Jekyll's Latent Semantic Mapping on OS X - Tony Arnold"
[2]: http://www.classifier-reborn.com/ "Classifier Reborn"

**本文历史**

* 2017 年 05 月 21 日 完成初稿
