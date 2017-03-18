---
layout: post
title: 显示 Disqus 评论计数
description: "使用 Jekyll 生成静态页面做博客访问很快，可是网站托管在 GitHub，并不支持直接写入，所以就不得不外挂第三方评论系统。之前我也折腾对比过 Disqus 和多说，但最终还是没有切换到多说，选择继续留在 Disqus 观望，希望 Disqus 以后能一直保持不被墙。"
date: 2015-09-14 15:00:00 +0800
thumb: 'IMG_PATH/disqus.png'
category: tech
tags: [Disqus, 'Disqus API', Jekyll, 评论]
---

* toc
{:toc}

使用 Jekyll 生成静态页面做博客访问很快，可是网站托管在 GitHub，并不支持直接写入，所以就不得不外挂第三方评论系统。之前我也折腾 [对比过 Disqus 和多说](talk-about-duoshuo.html)，但最终还是没有切换到多说，选择继续留在 Disqus 观望，希望 Disqus 以后能一直保持不被墙。

怎么部署 Disqus 这里就不多说了，鄙人博客上除了显示评论框，还在首页显示评论计数，这是如何做到的，下面就来看看。

## 通过 count.js

在官方的帮助文档中，显示评论计数并不复杂<sup>[[1]](#note-1){:id="ref-1"}</sup>，仅需在页面添加一段 JS 代码，并按照一定的规则写好 HTML 便可。

JavaScript 代码，找个合适的地方放好：

{% highlight javascript %}
/* * * 自定义变量 * * */
var disqus_shortname = 'example'; // 替换为你 Disqus 的 shortname

/* * * 不要动 * * */
(function () {
var s = document.createElement('script'); s.async = true;
s.type = 'text/javascript';
s.src = '//' + disqus_shortname + '.disqus.com/count.js';
(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}());
{% endhighlight %}

### 超链接标签

最粗暴的方法直接给链接指定 `href` 属性，属性值为 `页面链接 + '#disqus_thread'`，这样既能使此元素的内容替换为评论数，点开此链接也会跳转到相关页面的 Disqus 评论框，一举两得。

在 Jekyll 上可以这么写：

{% highlight html %}
{{"{% for post in site.posts "}}%}
  ...
  <a href="{{"{{ site.url "}}}}{{"{{ post.url "}}}}#disqus_thread"></a>
  ...
{{"{% endfor "}}%}
{% endhighlight %}

如果不希望点开链接即跳到评论框，那么也可以使用 `disqus_url` 等变量，即可加上 `data-disqus-url` 等属性，可以这么写：

{% highlight html %}
{{"{% for post in site.posts "}}%}
  ...
  <a href="{{"{{ site.url "}}}}{{"{{ post.url "}}}}" data-disqus-url="{{"{{ site.url "}}}}{{"{{ post.url "}}}}"></a>
  ...
{{"{% endfor "}}%}
{% endhighlight %}

### 其他标签

当然，你可能不希望在链接上显示评论数，在其他标签上显示评论数只需要加上一个 `class='disqus-comment-count'` 属性，且加上相关变量即可。例如：

{% highlight html %}
{{"{% for post in site.posts "}}%}
  ...
  <span class='disqus-comment-count' data-disqus-url="{{"{{ site.url "}}}}{{"{{ post.url "}}}}"></span>
  ...
{{"{% endfor "}}%}
{% endhighlight %}

对了，在 Disqus 后台中可以设置评论计数链接的文字<sup>[[2]](#note-2){:id="ref-2"}</sup>，鄙人设置如下图：

![设置评论计数链接的文字]({{ site.IMG_PATH }}/disqus-comment-count-01.png)
设置评论计数链接的文字

经过上面的方式处理之后，打开页面的时候刷刷的，一看原来加载了三个文件。虽然加载时间用不了多少，但为了显示评论数要多增加三次响应，是不是有点得不偿失？不管是不是，强迫症告诉我应该找找有没有更好的方式。

![加载的文件1]({{ site.IMG_PATH }}/disqus-comment-count-02.png)
加载的文件1

## 通过 Disqus API

就为了显示下评论计数而已，使用 Disqus 的 API 实现应该不麻烦，首先得去 Disqus 注册一个新的应用，获取公钥。

折腾了一下，可以这样实现：

{% highlight html %}
{{"{% for post in site.posts "}}%}
  ...
  <a class='disqus-comment-count' href="{{"{{ site.url "}}}}{{"{{ post.url "}}}}#disqus_thread" data-disqus-url="{{"{{ site.url "}}}}{{"{{ post.url "}}}}"></a>
  ...
{{"{% endfor "}}%}
{% endhighlight %}

使用 JavaScript 取数据，并写入：

{% highlight javascript %}
var disqusShortName = "example"; // 替换为你 Disqus 的 shortname
var disqusPublicKey = "Public Key"; // 申请的公钥
var urlArray = [];
var commentsCount = document.querySelectorAll('.disqus-comment-count');
if (commentsCount.length) {
  for (i=0; i < commentsCount.length; i++) {
    var url = commentsCount[i].getAttribute('data-disqus-url');
    urlArray.push('thread=link:' + url);
  }
  function jsonpCallback(result) {  
    for (var i in result.response) {
      var count = result.response[i].posts;
      if ( count ) {
        document.querySelector('[data-disqus-url="' + result.response[i].link + '"]').innerHTML = count;
      }
    }  
  }
  (function () {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://disqus.com/api/3.0/threads/set.jsonp' + '?callback=jsonpCallback' + '&api_key=' + disqusPublicKey + '&forum=' + disqusShortName + '&' + urlArray.join('&') ;
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
  }());
}
{% endhighlight %}

看看是不是快多了？好像也没快多少，不过只需加载一个文件便可。

![加载的文件2]({{ site.IMG_PATH }}/disqus-comment-count-03.png)
加载的文件2

使用 jQuery 实现更方便<sup>[[3]](#note-3){:id="ref-3"}</sup>：

{% highlight javascript %}
var disqusShortName = "example"; // 替换为你 Disqus 的 shortname
var disqusPublicKey = "Public Key"; // 申请的公钥
var urlArray = [];
$('.disqus-comment-count').each(function () {
  var url = $(this).attr('data-disqus-url');
  urlArray.push('link:' + url);
});
$.ajax({
  type: 'GET',
  url: "https://disqus.com/api/3.0/threads/set.jsonp",
  data: { api_key: disqusPublicKey, forum : disqusShortName, thread : urlArray }, 
  cache: false,
  dataType: "jsonp",
  success: function (result) {
    for (var i in result.response) {
      var count = result.response[i].posts;
      if ( count ) {
        $('.disqus-comment-count[data-disqus-url="' + result.response[i].link + '"]').html(count);
      }
    }
  }
});
{% endhighlight %}

代码中实现没评论不显示，对了，本博评论计数样式模仿 V2EX、Ruby China 等站，至于 Disqus 具体参考 Disqus API 的相关文档<sup>[[4]](#note-4){:id="ref-4"}</sup>。

Disqus API 看起来相当有趣，不过鉴于 Disqus 不在天朝，所以暂时也不折腾更多。

## 参考资料

1. [∧](#ref-1) [Adding comment count links to your home page \| DISQUS](https://help.disqus.com/customer/en/portal/articles/565624-adding-comment-count-links-to-your-home-page){:id="note-1"}
2. [∧](#ref-2) [Settings > General](https://disqus.com/admin/settings/){:id="note-2"}
3. [∧](#ref-3) [Disqus Comment Counts Example](https://github.com/disqus/DISQUS-API-Recipes/blob/master/snippets/js/comment-counts-api/commentcounts.html){:id="note-3"}
4. [∧](#ref-4) [API - Disqus](https://disqus.com/api/){:id="note-4"}

**本文历史**

* 2015 年 09 月 14 日 完成初稿
