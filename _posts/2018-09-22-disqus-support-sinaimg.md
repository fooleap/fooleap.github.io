---
layout: post
title: Disqus 支持新浪微博图床
date: 2018-09-22 06:49:14+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API", "微博"]
---

你或许知道 Disqus 支持 Instagram、支持 Imgur、支持 Twitter，甚至是 Youtube，但你可能不知道，Disqus 也支持新浪微博图床。Disqus 支持微博图床，但并不完全支持。微博上的图片，有一部分可被支持，一部分却不行。

Disqus 使用久了，会发现若复制一些富媒体链接，一粘贴到 Disqus 的评论框，Disqus 会自动获取，插入并显示在留言中，这是很贴心的一个服务。Disqus 文档[[1]][1]提到，Disqus 支持以下站点的服务。

* Youtube
* Vimeo
* Twitter (tweets)
* Facebook (status, video, photo)
* Instagram (photo only)
* Giphy
* Imgur
* Google Maps
* Soundcloud
* Vine

之前想要在墙内上传图片到 Disqus，便研究了一番 [Disqus 的图片上传](/use-disqus-api-to-upload-image.html)，我觉得这样基本够用。在显示评论媒体信息时，也只是简单处理一下，后来发现若 Youtube 等媒体信息就无法被正常显示。

经过测试之后，我搞定了大多数媒体显示，还发现了一点，那就是 Disqus 支持新浪微博图床。发现粘贴媒体链接时，Disqus 会将链接作为参数请求 `https://disqus.com/api/3.0/media/details.json`，以获取媒体详情信息，若被支持，便会返回详情。如果是图片，那么返回的图片链接格式是：

    //a.disquscdn.com/get?url=原地址&key=XX

无法得知请求过程中 Disqus 是否会将原文件上传至 Disqus 的服务器，但以上地址在墙内能够正常显示。

对了，我也模仿了 Disqus 的操作，以下评论框也支持粘贴富媒体链接自动获取媒体信息，当然这是不完全支持的。

## 参考资料

[1]: https://help.disqus.com/commenting/adding-images-and-videos "Adding Images and Videos"

**本文历史**

* 2018 年 09 月 22 日 完成初稿
