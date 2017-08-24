---
layout: post
title: "Jekyll 显示每一年的文章数"
date: 2017-08-24 20:23:43+0800
thumb: IMG_PATH/jekyll.svg
category: tech
tags: ["Jekyll", "Liquid"]
---

昨天，看完水八口那边对归档页面的折腾[[1]][1]，感觉自己的归档页面过于简单。我认为归档应尽量简洁，但连文章数量都没显示，就有点说不过去，所以我决定在年份旁，增加显示文章数。

## 按年份归档

Jekyll 文章按年份归档显示的代码可如下：

```liquid{% raw %}
{% for post in site.posts %}
    {% assign year = post.date | date: '%Y' %}
    {% assign nyear = post.next.date | date: '%Y' %}
    {% if year != nyear %}
## {{ post.date | date: '%Y' }}
{:.archive-title}
    {% endif %}
* {{ post.date | date: '%m-%d' }} &raquo; [{{ post.title }}]({{ post.url }} "{{ post.title }}"){:.archive-item-link}
{% endfor %}
{% endraw %}```

原理是这样的：遍历时比较每篇文章及下篇文章的年份，若不等同，则显示年份。

## 降序显示文章数

如果要显示出每一年的文章数，我想只要在每一年的开始定义一个变量，在遍历中自增，一直到下一年开始就是该年的文章数，可显示并重新赋值。

在一次循环遍历中完成的话，文章数应显示在结尾的地方，这与初心有点背道而驰。且仔细看来，文章数也并非可以按照意愿显示出来，因为 `site.posts` 中的文章是按时间降序排序，这个就不多说了。

不改变原有代码的前提下，我们可以在前面增加一次遍历，反转 `site.posts`，把每一年的文章数存进一个数组，再在原有代码添加文章数就很简单了。可实现如下：

```liquid{% raw %}
{% assign count = 1 %}
{% for post in site.posts reversed %}
    {% assign year = post.date | date: '%Y' %}
    {% assign nyear = post.next.date | date: '%Y' %}
    {% if year != nyear %}
        {% assign count = count | append: ', ' %}
        {% assign counts = counts | append: count %}
        {% assign count = 1 %}
    {% else %}
        {% assign count = count | plus: 1 %}
    {% endif %}
{% endfor %}

{% assign counts = counts | split: ', ' | reverse %}
{% assign i = 0 %}

{% for post in site.posts %}
    {% assign year = post.date | date: '%Y' %}
    {% assign nyear = post.next.date | date: '%Y' %}
    {% if year != nyear %}
## {{ post.date | date: '%Y' }} ({{ counts[i] }})
{:.archive-title}
        {% assign i = i | plus: 1 %}
    {% endif %}
* {{ post.date | date: '%m-%d' }} &raquo; [{{ post.title }}]({{ post.url }} "{{ post.title }}"){:.archive-item-link}
{% endfor %}
{% endraw %}``` 

以上代码并不完美，有时间再修改。当然，这只是一种实现的思路，Liquid 模板语言看起来很简单，我想或许会有更灵活的用法。

## 升序显示文章数

根据 [Jimmy]({{ page.url }}#comment-3484506831) 所提示的 CSS Counters 实现思路，直接使用 CSS 计算文章数量，也是要在每个年份的文章后面才能显示，可以使用 `flex-direction` 反转。那文章也得反转输出，也就是：

文章按时间升序输出，再在每一年文章后显示年份，就可以通过 CSS 计算文章数显示在年份。

不过若反转输出文章，使用 Liquid 也可以很方便输出每个年份的文章数，如下：

```liquid{% raw %}
{% assign count = 1 %}
{% for post in site.posts reversed %}
* {{ post.date | date: '%m-%d' }} &raquo; [{{ post.title }}]({{ post.url }} "{{ post.title }}"){:.archive-item-link}
    {% assign year = post.date | date: '%Y' %}
    {% assign nyear = post.next.date | date: '%Y' %}
    {% if year != nyear %}
## {{ post.date | date: '%Y' }}({{ count }})
{:.archive-title}
        {% assign count = 1 %}
    {% else %}
        {% assign count = count | plus: 1 %}
    {% endif %}
{% endfor %}
{% endraw %}``` 

## 参考资料

[1]: https://blog.shuiba.co/limitless-archive-page "无限长的归档页面 - 水八口记"

**本文历史**

* 2017 年 08 月 24 日 完成初稿
* 2017 年 08 月 24 日 补充反转输出文章列表部分
