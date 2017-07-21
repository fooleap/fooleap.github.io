---
layout: post
title: "Disqus 的评论预审核"
date: 2017-07-20 18:59:53+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API"]
---

一大早就看到 Disqus 功能更新相关文章的推送[[1]][1]，据说这几个月会推出管理相关的更新。今天公布的几项更新主要包括评论政策、话题级预审核以及标记原因。其中比较抢眼的是话题级预审核，毕竟评论预审是此前了解较多的一项。

## 评论预审

评论预审即用户发表评论之后不立即显示，需等待管理员后台审核通过方可显示。这功能对有些人来说是个鸡肋，例如鄙人，巴不得访客多多评论，怎么会去限制访客的留言呢？对评论者而言，评论了却看不到，是不爽的。

在后台，可以很方便打开或关闭评论预审功能，我当然选择关闭。即使是关了，垃圾评论依然需要审核。

![Disqus 评论预审的设置][p1]

Disqus 这个新功能，话题（thread）级评论预审，使用起来就灵活很多，官方原文已经贴了截图，在此就不多此一举。虽然今天才提到，但在 Disqus API 文档中[[2]][2]，至少在 6 月份就已经暴露其参数（validateAllPosts）。

## Disqus API 与评论预审

之前折腾过 Disqus API，使用 `posts/create`[[3]][3] 这个 API 实现匿名评论功能。有不少朋友说用了此接口，但评论必须得审核。一种妥协的解决方法是，把新访客的邮箱号加入白名单，再评便无需再审。

>  Pre-moderation is always enabled for guest comments.

其实在前面截图中，最后一句已道明，对于访客用户，预审始终开启。我一直到现在还搞不懂，为什么自己的都不需要审核。

使用 Disqus API 关闭匿名用户评论预审的正确方法是，评论发表（posts/create）有个 `state` 参数，以管理员身份请求可携带，实现直接指定评论状态，将其设置为 `approved`，即可实现去除匿名用户的评论预审。

## 参考资料

[1]: https://blog.disqus.com/new-tools-for-your-community "New tools for your community: Comment Policy, Thread-level Pre-moderation, and Flagging Reasons"
[2]: https://disqus.com/api/docs/threads/update/ "threads/update"
[3]: https://disqus.com/api/docs/posts/create/ "posts/create"

**本文历史**

* 2017 年 07 月 20 日 完成初稿

[p1]: {{ site.IMG_PATH }}/pre-moderation-on-disqus-01.png "Disqus 评论预审的设置"
