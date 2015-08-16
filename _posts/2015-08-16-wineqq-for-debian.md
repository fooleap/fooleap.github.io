---
layout: post
title: Debian 上安装 Wine QQ
description: "QQ 或许是无法离开 Windows 的借口之一，在 Linux 上也会想用 QQ，还好现在 Wine 版本的 QQ 还能使用，就没有去使用并不是很好用的 pidgin-lwqq。"
date: 2015-08-16 12:30:00 +0800
category: tech
tags: [Debian, Wine, QQ]
---

QQ 或许是无法离开 Windows 的借口之一，在 Linux 上也会想用 QQ，还好现在 Wine 版本的 QQ 还能使用，就没有去使用并不是很好用的 pidgin-lwqq。

很容易就能找到清风老师打包的 [WineQQ 和安装教程](http://phpcj.org/wineqq/)，我用的是 Debian 8 64 位版本，直接采用 APT 安装 Wine 默认是 1.6 版本，可看样子 Wine QQ 依赖于 Wine 1.7，貌似也可以采用添加 PPA 源就可以安装 Wine 1.7，开撸。

    # add-apt-repository ppa:ubuntu-wine/ppa

添加完 PPA 源执行更新，很完美地出现 404 错误，毕竟 PPA 是给 Ubuntu 用的，可以理解。只好手动编辑 /etc/apt/sources.list 添加源：

    deb http://ppa.launchpad.net/ubuntu-wine/ppa/ubuntu trusty main 
    deb-src http://ppa.launchpad.net/ubuntu-wine/ppa/ubuntu trusty main

这里选择 trusty，也即是 Ubuntu 14.04 适用的，也不知道其他版本用的是否一样，但就用它，编辑之后执行更新软件包列表

    # apt-get update

可能会出现“W: GPG 错误，由于没有公钥，无法验证下列签名”错误提示，导入加该 PPA 的公钥

    # apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5A9A06AEF9CB8DB0

重新更新成功，执行安装

    # apt-get install wine1.7

出现“依赖: wine1.7-i386 (= 1:1.7.44-0ubuntu1) 但无法安装它”错误，这是因为没打开 32 位软件的支持。

    # dpkg --add-architecture i386

到此终于可以不怎么愉快地安装 Wine 1.7，为什么不愉快呢？这边访问 launchpad.net 太慢了，搞的不得不采用 aria2 加速 APT。

安装过程中，经过长长的字符刷屏之后，终于安装完成。根据清风老师的教程下载自己喜欢的 [WineQQ](http://pan.baidu.com/s/1qWyPHA8){:title="密码:e2k8"} 版本 并解压。打开 QQ，提示安装 Mono，那就安装吧，等待之后，久违的 QQ 登录界面就见天日了。

![Wine QQ]({{ site.IMG_PATH }}/wineqq-for-debian.png)
▲Wine QQ

若在 QQ 中 Fcitx 无法输入，可参考这篇文章：[fcitx输入法在wps、wineqq中失灵问题的解决](http://segmentfault.com/a/1190000000361008)。

至于字体啥的，日（jiu）后（shi）再（bu）说（shuo）。

**本文历史**

* 2015 年 08 月 16 日 完成初稿
