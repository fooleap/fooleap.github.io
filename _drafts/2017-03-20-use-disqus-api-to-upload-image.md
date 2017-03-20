---
layout: post
title: "使用的 Disqus API 上传图片"
description: "现 Disqus 上传图片 API，较之前有明显的区别，配合访客评论 API，可较完美地实现访客评论的上传图片功能。"
date: 2017-03-20 08:00:00+0800
category: tech
tags: ["Disqus", "Disqus API", "PHP", "CURL", "JavaScript"]
---

现 Disqus 上传图片 API，较之前有明显的区别，配合访客评论 API，可较完美地实现访客评论的上传图片功能。

此前 Disqus 评论框还能正常加载，也就没研究过 Disqus 的插图，故图片如何被上传、发表评论时如何携带图片已不得而知。

最近，为了完善评论框，本想使用七牛 API 实现上图功能。在此之前，我研究了下 Disqus 的插图方式，对比了以前评论的内容及图片 URL，发现有相当明显的区别。现在 Disqus 保存已上传图片的方式，很合适配合访客评论的 API，实现完美插图。

现在，Disqus API 的传图流程大概是这样的：

```flow
```
