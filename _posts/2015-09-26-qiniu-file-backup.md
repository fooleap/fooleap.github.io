---
layout: post
title: 备份七牛云的文件
description: "之前说过我现在是用七牛云做图床的，那么备份已经上传在七牛云的图片是否方便呢？在官网翻了一下，并没有找到类似一键备份的工具。"
date: 2015-09-26 12:00:00 +0800
thumb: 'http://7fv9cr.com1.z0.glb.clouddn.com/qiniu.png'
category: tech
tags: [七牛云, 备份, qrsb]
---

之前说过我现在是 [用七牛云做图床的](/image-hosting.html)，那么备份已经上传在七牛云的图片是否方便呢？在官网翻了一下，并没有找到类似一键备份的工具。

那就只能先 Google 一番，有人提示可以使用其 API 来获取相关资源再进行相关操作以下载[[1]][1]。这明显有些麻烦，只能继续搜寻。

终于找到一款官方的备份工具 qrsb 的相关文档[[2]][2]，但却没找到下载地址；后以工具名搜索很轻松找到下载地址[[3]][3]；而后得知该工具似乎早已下架[[4]][4]。

使用过程中发现很是奇怪，qrsb 的配置文件 `qrsb.conf` 居然不是放在工具所在目录下或手动指定，而是应该放在用于存放备份文件的本地目录，不过这个工具使用起来很方便，没一会就把所有文件扒了下来。

写博客也可以配合同步上传工具 QRSBox[[5]][5]，就可不用打开网页也能传文件了。

评论区 Bohan Yang 提醒，qshell [[6]][6]也可轻松实现备份数据，尝试了一下，以上功能均可实现，很方便。

## 参考资料

[1]: http://segmentfault.com/q/1010000000694227/a-1020000000694343 "求七牛下载空间全部文件的方法 - SegmentFault"
[2]: http://developer.qiniu.com/docs/v6/tools/qiniu-backup.html "备份工具 | 七牛云存储"
[3]: http://kb.qiniu.com/5rq9zcs8 "备份工具 Qrsb 的下载及使用 - 七牛云存储"
[4]: http://segmentfault.com/q/1010000003034609 "寻七牛官方提供的备份工具qrsb以及文档 - SegmentFault"
[5]: http://developer.qiniu.com/docs/v6/tools/qrsbox.html "QRSBox 同步工具 | 七牛云存储"
[6]: http://developer.qiniu.com/docs/v6/tools/qshell.html "qshell 命令行工具 | 七牛云存储"

**本文历史**

* 2015 年 09 月 26 日 完成初稿
* 2015 年 10 月 07 日 qshell
