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
{:class="archive-title"}
{% endif %}
{% endunless %}
* {{ post.date | date: "%m-%d" }} &raquo; [{{ post.title }}]({{ post.url }} "{{ post.title }}"){:.archive-item-link}
{% endfor %}
