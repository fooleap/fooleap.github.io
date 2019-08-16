---
layout: post
title: 解决小程序开发“当前系统代理不是安全代理”
date: 2019-08-16 14:13:18+0800
thumb: IMG_PATH/miniprogram.svg
category: tech
tags: [微信小程序]
---

小程序开发，我们在电脑上使用微信开发者工具进行预览、上传等。由于微信开发者工具的环境与小程序原生不一样，有时会有一些莫名的问题出现，比如开发者工具正常、小程序异常，反过来的情况也有。

我这次要啰嗦的问题是，使用 `wx.downloadFile` 下载文件时，提示“当前系统代理不是安全代理，是否信任？”，无论我点确定或者取消，都会有以下错误发生：

    downloadFile:fail Error: unable to verify the first certificate

既然是代理问题，第一时间前往工具代理设置，将代理设置为直连 —— **无效**

通过搜索，网上很多文章都说要去注册表，将 `HKEY_CURRENT_USER/Software/Microsoft/Windows/CurrentVersion/Internet Settings` 下这两项 `ProxyEnable`、`ProxyOverride` 删除。先不说 macOS 没有注册表，我在 Windows 上试了一下，问题没解决，倒是看到 SS 的系统代理被关 —— **无效**

网上还有说是服务器域名 SSL 证书配置有问题的，可是小程序原生和浏览器都没提示有问题，又没很快找到答案，放弃修改 —— **无试**

还想过曲线救国的方式绕开这个烦人的提醒，即通过 `wx.request` 请求直接获取文件，再通过 `FileSystemManager` 的相关 API 写入 —— **可行**

最后还是算了，我勾选了开发者工具中的“不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书”，提示不再，正常下载文件 —— **可行**

看来可能是证书的问题。

**本文历史**

* 2019 年 08 月 16 日 完成初稿
