---
layout: post
title: 为 Jekyll 添加一个标签页面
description: "前面介绍过如何为 Jekyll 添加一个简单的 API，利用这个 API，能做的事情可多了，远不止说过的显示文章分页列表那么简单，例如接下来要说到的标签页面。"
date: 2017-05-21 10:35:19+0800
category: tech
thumb: IMG_PATH/jekyll.svg
tags: [Jekyll, Liquid, JavaScript]
---

* toc
{:toc}

前面介绍过[如何为 Jekyll 添加一个简单的 API](/create-a-simple-jekyll-api.html)，利用这个 API，能做的事情可多了，远不止说过的显示文章分页列表那么简单，例如接下来要说到的标签页面。

在没有 API 的情况下，Jekyll 实现标签页面，一般是在页面中输出所有标签以及所有标签的文章链接，再通过 CSS 或 JS 控制显隐，或者干脆直接全都显示。

因为一篇文章不止一个 `tag`，所以输出文章标题列表时，有很多标题会重复输出，导致生成的 HTML 页面不小，不是很和谐。

有了 API 之后，通过简单的 JS 操作，可以实现一个较为完美的标签页面，下面就来看看如何实现比较和谐。

## 页面代码

首先，输出标签列表，根据 Jekyll 的全局变量，使用 Liquid 模板可把相关代码写成：

```liquid{% raw %}
{% for tag in site.tags %}
    {% assign count = tag | last | size %}
    {% assign fontsize = count | times: 4 %}
    {% if count  > 2 %}
    <a class="post-tags-item" href="{{ page.url }}?keyword={{ tag | first }}" title="{{ tag | first }}" data-count="{{ count }}" style="font-size: {% if fontsize > 24 %}24{% else %}{{ fontsize }}{% endif %}px">{{ tag | first }}</a>
    {% endif %}
{% endfor %}

<table id="tags-table" style="display: none">
    <thead>
        <tr></tr>
        <tr>
          <th>日期</th>
          <th>文章</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
{% endraw %}```

其中，`for` 循环内的 `tag | first` 是 `tag` 名，`tag | last` 则是对应的文章 list，所以 `tag | last | size` 是对应的文章数量。 

我做了一些优化：

1. 标签太多，筛选显示超过两篇文章的 `tag`。
2. 为了更直观显示 `tag` 的热门程度，我根据每个 `tag` 的文章数指定文字大小（未完善），当然也可以上标形式显示文章数量，甚至可以搞成标签云模式，全凭个人喜好。
3. 做成链接形式是为了配合 JS 实现点击某一 `tag` 显示相应的文章标题列表。

页面代码也可以直接用 Markdown 来写，具体可以看下我博客的 —— [tags.md](https://raw.githubusercontent.com/fooleap/fooleap.github.io/master/pages/tags.md)。

## JS 代码

```javascript
var keyword = getQuery('keyword');

// 请求 API 获得数据
var tagsData;
var xhrPosts = new XMLHttpRequest();
xhrPosts.open('GET', '/posts.json', true);
xhrPosts.onreadystatechange = function() {
    if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
        tagsData = JSON.parse(xhrPosts.responseText);
        if(keyword){
            tags(decodeURI(keyword));
        }
    }
}
xhrPosts.send(null);

// 显示 tag 对应文章标题列表并修改 title 等
function tags (keyword){
    var title = '标签：' + keyword + ' | Fooleap\'s Blog';
    var url = '/tags.html?keyword=' + keyword;
    var tagsTable = document.getElementById('tags-table');
    tagsTable.style.display = 'table';
    tagsTable.querySelector('thead tr').innerHTML = '<th colspan=2>以下是标签为“'+keyword+'”的所有文章</th>';
    var html = '';
    tagsData.forEach(function(item){
        if( item.tags.indexOf(keyword) > -1){
            var date = item.date.slice(0,10).split('-');
            date = date[0] + ' 年 ' + date[1] + ' 月 ' + date[2] + ' 日';
            html += '<tr>'+
                 '<td><time>'+date+'</time></td>'+
                 '<td><a href="'+item.url+'" title="'+item.title+'">'+item.title+'</a></td>'+
                 '</tr>';
        }
    })
    tagsTable.getElementsByTagName('tbody')[0].innerHTML = html;
    document.title = title;
    history.replaceState({ 
        "title": title,
        "url": url 
    }, title, url);
}

// 给 tag 链接绑定事件
var tagLinks = document.getElementsByClassName('post-tags-item');
var tagCount = tagLinks.length;
for (var i = 0; i < tagCount; i++){
    tagLinks[i].addEventListener('click', function(e){
        tags(e.currentTarget.title);
        e.preventDefault();
    }, false);
}
```

上面一堆代码，其实最主要的，也就是前文有提到的 [Jekyll 简单搜索功能](/jekyll-simple-search.html) 所提到的 `indexOf()` 方法。

为了在文章页面点击相关链接时，能在标签页面筛选显示出相关的文章，我使用了 JavaScript 读取 URL 查询参数，在上面的 JS 代码就没有列出来，N 种实现代码可以看 Stack Overflow 的相关问答[[1]][1]。

阻止 `tag` 链接点击的默认行为，实现不刷新加载，用到 `history` 对象的相关方法，实现在点击链接时改变地址栏的 URL。

简单的应用，可以看出，Jekyll 生成的静态 API，虽然不灵活，但也并不是不好用。只要页面不刷新，请求一次就一劳永逸。

## 参考资料

[1]: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript "How can I get query string values in JavaScript? - Stack Overflow"

**本文历史**

* 2017 年 05 月 21 日 完成初稿
