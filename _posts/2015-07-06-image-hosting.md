---
layout: post
title: 图床的那些事儿
description: "博客写得不多，但从 08 年开始到现在，也有大概 7 年左右的时间，这期间，自从使用博客大巴开始便使用图床，到现在也有 5 年左右时间，那么就聊聊图床的那些事吧。"
date: 2015-07-06 21:00:00 +0800
category: tech
tags: [图床, 七牛云]
---

* toc
{:toc}

博客写得不多，但从 08 年开始到现在，也有大概 7 年左右的时间，这期间，自从使用博客大巴开始便使用图床，到现在也有 5 年左右时间，那么就聊聊图床的那些事吧。

## 使用过的图床

1、SkyDrive，微软旗下的网盘，现在已改名“OneDrive”。优点在于可以在本地编辑以同步，支持外链，我是直接点击“查看原件”复制其 URL。

![例图一](https://b7x4rg.by3302.livefilestore.com/y3p6j2KbLqm8ekbQ4GskI0agfyuSzcwnopP2q267krb_rl7D30ar-ERXV9CXRLTJDGgjSJplRm1YWSpQNjvbzG2rIqItgR0ZxJk7DytGDPd85clmeDri8D8MGeAOW4nVPr9EGA9-rj_XpMTSJOqHJoXZd8uKieZGyL62SEJOg8BAsA/image-hosting.jpg)
▲例图一

是的，文件名保留了，但是 URL 太丑太长，只能链接原文件，弃用。

2、Photobucket，这个网络相册我特别喜欢，在使用 WordPress 的时候一直用着它，URL 不丑，保留原文件名，特别是支持嵌入相册，要分享较多图片的时候很好用。

![例图二](http://i951.photobucket.com/albums/ad353/Fooleap/image-hosting.jpg)
▲例图二

这个图床不足之处在于只能外链原文件，这些年抽风也逐渐严重，弃用。

3、又拍图片管家，免费用户空间仅有 100 M，虽然不大，却已够用，只要图片裁剪即可。URL 不长，优点在于可选择外链的图像大小，还可以随时替换图片。

![例图三](http://pic.yupoo.com/fooleap_v/EMtGuxQJ/vwvWz.jpg)
▲例图三

缺点也很明显，URL 非以原文件名命名，有流量限制，也并不是很稳定，弃用。


## 正在使用的图床

现在用的是七牛云存储，改大小都不是事，剪裁、加滤镜、图片质量，甚至是加水印，几乎无所不能，具体可以参考 [图片处理文档](http://developer.qiniu.com/docs/v6/api/reference/fop/image/)，还可以定义常用的图片处理样式。

![例图四]({{site.IMG_PATH}}/image-hosting.jpg_640)
▲例图四

网站的操作体验也很棒，如果用 WordPress 也可使用 [七牛镜像存储插件](https://wordpress.org/plugins/wpjam-qiniu/)，实现一键加速静态文件。

关键是免费拥有，存储空间有 10 G，每月下载流量 10 G，PUT 请求 10 万次，GET 请求 100 万次。

我的 [七牛邀请链接](https://portal.qiniu.com/signup?code=3lmtscszx8zf4)。

**本文历史**

* 2015 年 07 月 06 日 完成初稿
