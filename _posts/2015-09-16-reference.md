---
layout: post
title: JavaScript 实现参考资料功能
description: "有些时候写博文会引用很多外部链接，如果这些外部链接全部放在文中感觉有些不妥，至少在美观度上就有些偏离大众审美。为了更好地引（zhuāng）用（bī），在工夫茶的二三事中，我致（chāo）敬（xí）维基百科，模仿了其使用参考资料的形式，感觉还不错（当然不错）。"
date: 2015-09-16 12:00:00 +0800
thumb: 'IMG_PATH/js.png'
category: tech
tags: [参考资料, Reference, JavaScript, Jekyll]
---

* toc
{:toc}

有些时候写博文会引用很多外部链接，如果这些外部链接全部放在文中感觉有些不妥，至少在美观度上就有些偏离大众审美。为了更好地引（zhuāng）用（bī），在 [工夫茶的二三事](gongfu-tea.html) 中，我致（chāo）敬（xí）维基百科，模仿了其使用参考资料的形式，感觉还不错（当然不错）。

在 [显示 Disqus 评论计数](disqus-comment-count.html) 的评论中，菠萝格格[[1]] [1] 建议说下这方面，仔细想想也有挺多可以讲的，遂记于此。

## 功能介绍

从下图我们可以看到，维基百科的参考资料，最基本的功能就是点击上标数字可以跳转到参考资料区对应的条目并高亮，且参考资料链接前还有可以点击返回的链接，其次是鼠标焦点位于上标数字时会显示一个框框，里面有对应的链接。

![维基百科的参考资料功能]({{ site.IMG_PATH }}/reference.gif)
&#9650;维基百科的参考资料功能

分解出来，基本功能的实现大概有以下几点：

1. 点击链接跳转
2. 目标背景高亮
3. 鼠标覆盖显示浮框

虽然浮框功能挺好的，但老衲感觉还是略显浮（má）夸（fán），所以这里主要讲一下前面两个功能。

## 点击链接跳转

页内链接的跳转，能想到的就是 HTML 的锚点链接，看看文档[[2]] [2]，一般可以使用 `name` 或 `id` 属性实现，目前一般习惯用 `id`，CSS 以及 JavaScript 的选择处理起来更加比较方便。

上标数字在 HTML 中则使用 `<sup>` 元素，那么参考资料点击跳转使用 HTML 的写法如下：

{% highlight html %}
<!-- <sup> 在外面更利于 CSS 的定义 -->
那一天，我在街上看到了条狗<sup><a href="#note-1" id="ref-1">[1]</a></sup>，后来发现居然是只狼<sup><a href="#note-2" id="ref-2">[2]</a></sup>。

<h2>参考资料</h2>
<ol>
  <li><a href="#ref-1">∧</a> <a href="https://zh.wikipedia.org/wiki/狗" id="note-1" target="_blank">狗 - 维基百科</a></li>
  <li><a href="#ref-2">∧</a> <a href="https://zh.wikipedia.org/wiki/狼" id="note-2" target="_blank">狼 - 维基百科</a></li>
</ol>
{% endhighlight %}

如果和我一样使用 Markdown 写作，并采用 kramdown 作为解析器[[3]] [3]，可以这么写：

{% highlight html %}
那一天，我在街上看到了条狗<sup>[[1]](#note-1){:id="ref-1"}</sup>，后来发现居然是只狼<sup>[[2]](#note-2){:id="ref-2"}</sup>。

## 参考资料

1. [∧](#ref-1) [狗 - 维基百科](https://zh.wikipedia.org/wiki/狗){:id="note-1" target="_blank"}
2. [∧](#ref-2) [狼 - 维基百科](https://zh.wikipedia.org/wiki/狼){:id="note-2" target="_blank"}
{% endhighlight %}

以上用笨方法实现了链接点击页内的功能，点击 <sup>`[数字]`</sup> 就会跳到下面对应的参考资料位置，点击 `∧` 则可以返回引用参考资料所在的位置。

## 目标背景高亮

点击链接高亮目标，似乎这功能离不开 JavaScript。仔细看发现维基百科高亮的不是目标本身，而是目标的父元素。上面的 HTML 写得刚好，一上一下父元素分别是 `<sup>` 以及 `<li>`，使用起来刚好合适。

目标背景高亮可以采用使用广泛的 jQuery 实现：

{% highlight javascript %}
// 选择相关链接，使用正则匹配
var noteLinks = $('a[href^="#note"], a[href^="#ref"]');
noteLinks.click(function(){
  // 清除背景颜色
  noteLinks.parent().css('background-color', '');
  // 高亮目标背景
  var href = $(this).attr('href'); 
  $(href).parent().css('background-color', 'rgb(235, 235, 235)'); 
})
{% endhighlight %}

原生 JavaScript 可以这么实现：

{% highlight javascript %}
// 选择相关链接，使用正则匹配
var noteLinks = document.querySelectorAll('a[href^="#note"], a[href^="#ref"]');
function linkFocus (){
  // 清除背景颜色
  for (var i = 0; i < noteLinks.length; i ++ ){
    noteLinks[i].parentElement.style.backgroundColor = '';
  }
  // 高亮目标背景
  var href = this.href.split('#')[1];
  document.getElementById(href).parentElement.style.backgroundColor = 'rgb(235, 235, 235)';
}
for (var i = 0 ; i < noteLinks.length; i ++  ){
  if (noteLinks[i].addEventListener) {
    noteLinks[i].addEventListener('click', linkFocus, false);
  } else {
    noteLinks[i].onclick = linkFocus;
  }
}
{% endhighlight %}

至于 IE 兼容，只想说先一边去，不出错就好，兼容到 IE8。

## 自动生成参考资料

点击链接跳转实现了，目标背景高亮也实现了，但看起来好像有点不对劲。人总是懒的，每次写参考资料都要那么写，多少个 `<sup>`、`<li>` 向你招手，岂不累死？能不能自动生成参考资料？答案自然是肯定的，使用 JavaScript 就可以实现。

看前面写的 HTML，规则的东西不少，例如 `<sup>` 每次引用链接都会出现，`<li>`、`∧` 等也一样都是重复出现，而 `#note-*`、`#ref-*` 等则是有规律的出现，那这些东西应该可以不用再写，直接采用 JavaScript 生成就行。

HTML 部分可简化如下：

{% highlight html %}
那一天，我在街上看到了条狗<a href="https://zh.wikipedia.org/wiki/狗" title="狗 - 维基百科">[1]</a>，后来发现居然是只狼<a href="https://zh.wikipedia.org/wiki/狼" title="狼 - 维基百科">[2]</a>。

<h2>参考资料</h2>
{% endhighlight %}

使用更方便的 Markdown：

{% highlight html %}
那一天，我在街上看到了条狗[[1]](https://zh.wikipedia.org/wiki/狗){:title="狗 - 维基百科"}，后来发现居然是只狼[[2]](https://zh.wikipedia.org/wiki/狼){:title="狼 - 维基百科"}。

## 参考资料
{% endhighlight %}

哦，对了，Markdown 本身可以以参考式链接形式写链接[[4]] [4]，可以更形象地装逼。

{% highlight html %}
那一天，我在街上看到了条狗[[1]] [1]，后来发现居然是只狼[[2]] [2]。

## 参考资料

[1]: https://zh.wikipedia.org/wiki/狗 "狗 - 维基百科"
[2]: https://zh.wikipedia.org/wiki/狼 "狼 - 维基百科"
{% endhighlight %}

采用 jQuery：

{% highlight javascript %}
if ($('h2').last().html() === '参考资料'){
  $('h2').last().after('<ol id="refs"></ol>')
}
// 选择非本站链接
$('a[href*="http:"]:not([href*="' + location.hostname + '"]), [href*="https:"]:not([href*="' + location.hostname + '"])').each(function(){
  // 去掉所选链接文本的最前、最后字符
  var num = $(this).text().substring(1, $(this).text().length-1);
  // 判断是否为数字
  if(!isNaN(num) && num){
    var note = 'note-' + num;
    var ref = 'ref-' + num;
    var noteTitle = $(this).attr('title');
    var noteHref = $(this).attr('href');
    $(this).attr({href: '#' + note, id: ref, 'class': 'ref'}).wrap('<sup>');
    $('#refs').append('<li class="note"><a href="#'+ ref + '">&and;</a> <a href="'+ noteHref + '" title="' + noteTitle + '" id="' + note +'" class="exf-text" target="_blank">' + noteTitle + '</a></li>')
  } else {
    // 不是数字保留并加上 target 属性
    $(this).attr('target', '_blank');
  }
})

var noteLinks = $('a[href^="#note"], a[href^="#ref"]');
noteLinks.click(function(){
  // 清除背景颜色
  noteLinks.parent().css('background-color', '');
  // 高亮目标背景
  var href = $(this).attr('href'); 
  $(href).parent().css('background-color', 'rgb(235, 235, 235)'); 
})
{% endhighlight %}

JavaScript 原生：

{% highlight javascript %}
var links = document.querySelectorAll('a');
if (document.querySelectorAll('h2')[document.querySelectorAll('h2').length-1].innerHTML === '参考资料'){
  document.querySelectorAll('h2')[document.querySelectorAll('h2').length-1].insertAdjacentHTML('afterend', '<ol id="refs"></ol>');
}
for (var i = 0; i < links.length; i ++) {
  // 选择非本站链接
  if (links[i].hostname != location.hostname && /^javascript/.test(links[i].href) === false ){
    // 去掉所选链接文本的最前、最后字符
    var numText = links[i].innerHTML;
    var num = numText.substring(1, numText.length-1);
    // 判断是否为数字
    if(!isNaN(num) && num){
      var note = 'note-' + num;
      var ref = 'ref-' + num;
      var noteTitle = links[i].getAttribute('title');
      var noteHref = links[i].getAttribute('href');
      links[i].setAttribute('href', '#' + note);
      links[i].setAttribute('id', ref);
      links[i].setAttribute('class', 'ref');
      links[i].outerHTML = '<sup>' + links[i].outerHTML + '</sup>';
      document.getElementById('refs').insertAdjacentHTML('beforeend', '<li class="note"><a href="#'+ ref + '">&and;</a> <a href="'+ noteHref + '" title="' + noteTitle + '" id="' + note +'" class="exf-text" target="_blank">' + noteTitle + '</a></li>');
    } else {
      // 不是数字保留并加上 target 属性
      links[i].setAttribute('target', '_blank');
    }
  }
}

// 选择相关链接，使用正则匹配
var noteLinks = document.querySelectorAll('a[href^="#note"], a[href^="#ref"]');
function linkFocus (){
  // 清除背景颜色
  for (var i = 0; i < noteLinks.length; i ++ ){
    noteLinks[i].parentElement.style.backgroundColor = '';
  }
  // 高亮目标背景
  var href = this.href.split('#')[1];
  document.getElementById(href).parentElement.style.backgroundColor = 'rgb(235, 235, 235)';
}
for (var i = 0 ; i < noteLinks.length; i ++  ){
  if (noteLinks[i].addEventListener) {
    noteLinks[i].addEventListener('click', linkFocus, false);
  } else {
    noteLinks[i].onclick = linkFocus;
  }
}
{% endhighlight %}

看百度百科的参考资料还多了网站标题，引用日期等等，这也可以采用自定义属性[[5]] [5]，一小博客就不瞎起劲。

站外链接后面的图标则可以通过 CSS 定义，例如：

{% highlight css %}
a[target="_blank"]:after {
  content: '↗';
}
{% endhighlight %}

以上 JS 示例: http://runjs.cn/detail/kgsa53l1

<iframe style="width: 100%; height: 300px" src="http://sandbox.runjs.cn/show/kgsa53l1" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

另外，本文就是使用自动生成参考资料的方式来书写，戳左下角“源码”按钮即可查看 Markdown 源码，如果没看到“源码”按钮，那么该换浏览器了。

## 参考资料

[1]: http://www.daquan8.com/ "博客志"
[2]: http://www.w3.org/TR/html401/struct/links.html#h-12.1.3 "Specifying anchors and links"
[3]: http://kramdown.gettalong.org/ "kramdown"
[4]: http://daringfireball.net/projects/markdown/syntax#link "Links - Markdown: Syntax"
[5]: http://www.w3school.com.cn/tags/att_global_data.asp "HTML data-* 属性"

**本文历史**

* 2015 年 09 月 16 日 完成初稿
