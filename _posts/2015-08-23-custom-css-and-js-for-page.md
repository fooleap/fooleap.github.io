---
layout: post
title: 页面样式脚本各得其所
description: "在写日志的时候，鄙人有时候需要引入及写自定义的 CSS 或 JS，一般是在日志里面直接引入标签直接写。"
date: 2015-08-23 12:00:00 +0800
category: tech
tags: [Jekyll, Liquid, CSS, JavaScript]
---

* toc
{:toc}

## 问题描述

在写日志的时候，鄙人有时候需要引入及写自定义的 CSS 或 JS，一般是在日志里面直接引入标签直接写。

众所周知，`<style>` 标签位于 `<head>` 内，虽然写在 `<body>` 浏览器也能渲染成功，但这毕竟有悖于标准；而 `<script>` 标签一般都会放在 `<body>` 标签的最后（即 `</body>` 之前），以免网速影响体验。

不按上面所提到的写，虽然偶尔一两个页面这样没大碍，但对于鄙人这种强迫症患者忍不了，所以只好想办法解决。

## 解决过程

想要改变 Jekyll 生成的 HTML，还得从 Jekyll 的模板入手，而 Jekyll 采用的是 Liquid 模板语言。

Liquid 是由 Shopify 设计并开源的模板引擎，Liquid 的相关语法不难，具体可以看这个页面：[Liquid for Designer](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)，更详细的介绍在：[Liquid Documentation](https://docs.shopify.com/themes/liquid-documentation/)，Jekyll 自身也有一些的扩展语法，可以查看：[Templates](http://jekyllrb.com/docs/templates/)。

这次要做的是将页面的自定义 CSS 以及 JS 移个位置，而 CSS 及 JS 对应的是 `<style>` 标签以及 `<script>` 标签，可以采用过滤器 `split` 分隔开内容。

这里先拿 CSS 部分做例子，考虑到标签闭合前面有个 `/` 符号，可以这么处理：

{% highlight liquid %}
{% raw %}
{% assign content_style = content | split: 'style>' %}
{% endraw %}
{% endhighlight %}

那么 {% raw %}`{{ content_style[0] }}`{% endraw %} 便是 `<style>` 之前的部分，后面多加了个 `<`；{% raw %}`{{ content_style[1] }}`{% endraw %} 是 CSS 代码后面多加了 `</`；{% raw %}`{{ content_style[2] }}`{% endraw %} 则是 CSS 代码之后的部分。

这样需要过滤掉不需要的字符，又不能保证原文中有且只有一个 `<` 符号，没有找到相关的更方便方法，所以鄙人采用笨方法，在原文中：

{% highlight html %}
<!--<style>
CSS 代码
</style>-->
{% endhighlight %}

原模板 `default.html` 中的 `{% raw %}{{ content }}{% endraw %}` 就可替换成

{% highlight liquid %}
{% raw %}
{{ content_style[0] | remove: '<!--<' }}{{ content_style[2] | remove: '-->' }}
{% endraw %}
{% endhighlight %}

其实不做 `remove` 处理页面上也不会出现多余的内容，只是源码多出了`<!--<-->`。若含有 CSS 代码的日志才这么干，没有的不干，这里采用 Jekyll 提供的自定义页面变量，在 Front Matter 加上 `style: true`，使用 Liquid 的判断语句。

{% highlight liquid %}
{% raw %}
{% if page.style %}
...
{% endif %}
{% endraw %}
{% endhighlight %}

JS 脚本类似于 CSS，另外，引入 CSS 或 JS 文件则可以直接将其命名为自定义变量引入。

## 完整方案

经过折腾之后，在模板 `default.html` 文件中，鄙人做如下处理。
{% highlight liquid %}
{% raw %}
<!DOCTYPE html>
<html>
<head>
...
{% assign content_js = content | remove: '<!--<' | remove: '-->' | split: 'script>' %}
{% assign content_style = content | remove: '<!--<' | remove: '-->' | split: 'style>' %}
{% if page.link %}
  <link rel="stylesheet" type="text/css" href="{{ page.link }}" />
{% endif %}
{% if page.style %}
  <style type="text/css">{{ content_style[1] }}style>
{% endif %}
...
</head>
<body>
...
{% if page.style or page.js %}
  {% if page.style and page.js != true %}
    {{ content_style[0] }}{{ content_style[2] }}
  {% endif %}
  {% if page.js and page.style != true %}
    {{ content_js[0] }}{{ content_js[2] }}
  {% endif %}
  {% if page.style and page.js  %}
    {{ content_style[0] }}{{ content_js[2] }}
  {% endif %}
{% else %}
  {{ content }}
{% endif %}
...
  <script type="text/javascript" src="/assets/js/jquery.min.js"></script>
  {% comment %}鉴于引入的 JS 文件或脚本可能依赖于 jQuery，故放此。{% endcomment %} 
{% if page.scripts %}
  {% for script in page.scripts %}
    <script type="text/javascript" src="{{ script }}"></script>
  {% endfor %}
{% endif %}
{% if page.js %}
  <script type="text/javascript">{{ content_js[1] }}script>
{% endif %}
...
</body>
</html>
{% endraw %}
{% endhighlight %}

代码比较简单比较丑，但可以用，这里需要说明的是，鄙人往往将 `<style>`、`<script>` 按顺序排在一起。例子的话，可以查看鄙人任何一篇含有自定义代码的日志，点击左下角“源码”按钮便可看到相关 `*md` 文件内容，例如：[我那丢了的手机 ](/talk-about-my-lost-cell-phone.html)。

## 参考资料

* [Liquid for Designer](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
* [Liquid Documentation](https://docs.shopify.com/themes/liquid-documentation/)

**本文历史**

* 2015 年 08 月 23 日 完成初稿
