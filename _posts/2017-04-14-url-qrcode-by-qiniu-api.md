---
layout: post
title: "七牛 API 生成页面 URL 二维码"
description: "七牛是个好平台，不仅免费额度够用，而且 API 足够丰富，相当实用，例如接下来将要说到的二维码 API。"
date: 2017-04-14 15:00:00+0800
thumb: IMG_PATH/qiniu.png
category: tech
tags: ["七牛", "七牛 API", "二维码"]
---

七牛是个好平台，不仅免费额度够用，而且 API 足够丰富，相当实用，例如接下来将要说到的二维码 API。

## 博客托管平台

自从写独立博客以来，博客托管的地方换了又换，所用的平台大概如下：

* **国外虚拟主机** 刚写独立博客时，WordPress 博客托管在国外虚拟主机，访问速度一般般
* **GitHub Pages** 后来，我将博客程序换为 Jekyll，并将博客托管在 GitHub Pages
* **GitCafe Pages** 再后来，众所周知的原因，将国内解析到 GitCafe Pages
* **阿里云虚机** 前年底，领了阿里云的免费虚拟主机后，给域名备了案，并将国内解析到阿里云
* **七牛云存储** 去年，将自定义域名绑定到七牛，发现静态的博客完全可以直接托管在七牛，不分国内外，皆解析到七牛

现在无论图床或是页面均用七牛云存储，虽不算很完美，但用着还算舒服。

## 七牛二维码 API

由于微信的普及，[二维码得到广泛应用](/qrcode.html)。此前，我博客里面的二维码生成是采用 jQuery 插件或者是 JS 库（qrcode.js[[1]][1]）来实现的。

昨天，我发现七牛除了好用的图片处理 API 之外，其资源二维码 API[[2]][2] 用起来体验也是不错的。

因我博客挂在七牛上面，故可以放弃二维码的相关 JS 库，直接采用七牛 API 解决页面二维码问题。

使用起来超方便，仅需在链接后面加上 `?qrcode` 即可得到一张页面 URL 二维码的 PNG 格式图片。

    http://blog.fooleap.org?qrcode

![首页二维码](http://blog.fooleap.org?qrcode)

264px 的宽高，四周空了 32px 的白底，利用七牛 API 的管道处理，可以简单将四周的白色去掉，留下 200px 的二维码。

    http://blog.fooleap.org?qrcode|imageMogr2/crop/!200x200a32a32

![裁剪后的首页二维码](http://blog.fooleap.org?qrcode%7CimageMogr2/crop/!200x200a32a32)

注：为了防止被 Markdown 解释器误以为是表格，管道符 `|` 可用 `%7C` 代替。

后来，我发现其生成的二维码宽高是不一定的，实测 URL 小于等于 32 个字符则为 200px，32 字符以上则为 232px，字符更多还可能还会更大。若先去判断 URL 长度 Liquid 应该挺方便的，但还是直接采用 CSS 解决更加实在。

具体更高级的应用，移步七牛文档。

## 参考资料

[1]: http://davidshimjs.github.io/qrcodejs/ "qrcode.js"
[2]: https://developer.qiniu.com/dora/api/resource-download-the-qr-code-qrcode "资源下载二维码"

**本文历史**

* 2017 年 04 月 14 日 完成初稿
