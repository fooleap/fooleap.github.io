---
layout: post
title: "初识 Disqus API"
description: ""
date: 2017-06-28 08:00:00+0800
thumb: IMG_PATH/disqus.png
category: tech
tags: ["Disqus", "Disqus API"]
---

Disqus 的服务很稳定，Disqus 的盈利模式[[1]][1]应该也是靠谱的，期待有一天能够重新开放。

利用 Disqus API 来解决问题是目前较为可行的办法。本博客在用的几个 API，是我边查手册边搞的，相当粗糙。简单的评论框功能实现起来并不复杂，只是略显繁琐，且过程中有些坑。

## Disqus API 基础
{:#disqus-api-base}

| 对象     | 描述                                                                                                      |
|----------|-----------------------------------------------------------------------------------------------------------|
| forum    | 网站，自己站点的 `forum` 名可以在 Disqus 后台设置看到( shortname )                                        |
| category | 分类，一个 `forum` 下可以有多个 `category`                                                                |
| thread   | 文章，一篇文章是一个 `thread`，可以设置 `category`                                                        |
| post     | 评论，`post`有个重要属性 `parent`，若不为 `null` 则是回复                                                 |
| user     | 用户，以上所有对象都有对应的 `author`，可以由用户充当，`post` 的 `author` 则可以匿名（anonymous）         |

## 参考资料

[1]: https://disqus.com/home/discussion/androidpolice/join_us_for_an_ama_with_disqus_at_11am_pst/#comment-2649731809 "We make money through a few different ways"

**本文历史**

* 2017 年 06 月 28 日 完成初稿
