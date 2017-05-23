---
layout: post
title: Jekyll 的中文字数统计
description: "文章页面显示字数统计很常见，也没啥好说的，但当我们把所有文章的字数都加起来，就有点意思了。多年的博客，积累下来真不容易。"
date: 2017-05-23 20:21:19+0800
category: tech
thumb: IMG_PATH/jekyll.svg
tags: [Jekyll, Liquid, 字数统计]
---

* toc
{:toc}

文章页面显示字数统计很常见，也没啥好说的，但当我们把所有文章的字数都加起来，就有点意思了。多年的博客，积累下来真不容易。

简书是个好平台，可是当年宣传便冠以“最好的中文写作和阅读平台”，我对其的好感度降了些。今天进某人的简书个人页面，看到显示了总字数，话说以前咋没发现，在每篇文章底下的作者简介，也有显示写了多少字。

我便想到了在自己博客也显示个总字数，再没意思至少能装装逼。

## 字数统计

关于单篇文章的字数统计，TaoAlpha 的这篇文章《Jekyll 中如何做中文字数统计》[[1]][1]已经说得够清楚的。但我觉得还是得再加一个过滤器，去掉所有的空格，一篇文章下来无无空格还是挺多的。也就是说 Jekyll 统计文章中文字数的代码如下：

```liquid{% raw %}
{{ page.content | strip_html | strip_newlines | remove: " " | size }}
{% endraw %}```

还是感觉不妥，如果是纯中文的还行，但是例如本篇文章这种带代码段的，那字数偏差就有点大了，有没有解决方法呢？有是有的，怎么破，这篇就暂不提及，就先以上面的为准吧。

对于阅读分钟数，我的代码如下：

```liquid{% raw %}
{{ page.content | strip_html | strip_newlines | remove: " " | size | divided_by: 350 | plus: 1 }} 
{% endraw %}```

因过滤器 `divided_by` 得出的值是去尾的整数，故我觉得还是加一比较合理。

## 总字数统计

所有文章的字数加起来就是总字数，没啥技术含量，我就直接贴代码了。

```liquid{% raw %}
{% assign count = 0 %}
{% for post in site.posts %}
    {% assign single_count = post.content | strip_html | strip_newlines | remove: " " | size %}
    {% assign count = count | plus: single_count %}
{% endfor %}

{% if count > 10000 %}
    {{ count | divided_by: 10000 }} 万 {{ count | modulo: 10000 }}
{% else %}
    {{ count }}
{% endif %} 
{% endraw %}```

为了方便看，字数过万就加个万字。

## 参考资料

[1]: http://taoalpha.github.io/blog/2015/05/21/tech-jekyll-count-of-chinese-characters/ "Jekyll 中如何做中文字数统计 &#124; TaoAlpha's Blog"

**本文历史**

* 2017 年 05 月 23 日 完成初稿
