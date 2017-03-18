---
layout: page
permalink: /archive.html
title: 归档
tags: [归档]
---

{% for post in site.posts %}
{% unless post %}
{% else %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% if year != nyear %}
## {{ post.date | date: '%Y' }}
{% endif %}
{% endunless %}
* {{ post.date | date: "%Y 年 %m 月 %d 日" }} &raquo; [{{ post.title }}]({{ post.url }})
{% endfor %}
