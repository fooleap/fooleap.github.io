---
layout: post
title: 科学使用 Google Earth Pro
description: "那些年，一张地图，一辆买菜车，狂奔的车轮下映射的便是我那美好周末。如今，我已忘记买了几张本地地图，几本地图册，地图程序的出现，或许他们大多数的命运就只有吃灰。"
category: tech
thumb: 'IMG_PATH/googleearth.png'
tags: ["Google Earth", hosts, 科学上网]
---

* toc
{:toc}

那些年，一张地图，一辆买菜车，狂奔的车轮下映射的便是我那美好周末。如今，我已忘记买了几张本地地图，几本地图册，地图程序的出现，或许他们大多数的命运就只有吃灰。

## Google Earth

当我第一次打开 Google Earth 时，就被它狠狠地吸引，西北戈壁，一览无余；江南水乡，尽收眼底。不费吹灰之力找到我家屋顶，通过广大网友分享在 Panoramio 的相片，便可轻松了解地球上任何区域的建筑特色及自然风光，Google 街景更是有身临其境的感觉。

说多了都是泪，不知何时开始，Google Earth 无法正常访问，打开 Google Earth 就是一片漆黑，许久之后弹出如下对话框，鄙人偶尔想看看家乡的谷歌卫星地图有没更新，就只能科学上网。

更新，是 Google Earth Pro，Google Earth 不需要科学上网似乎还能使用。

![无法连接对话框]({{site.IMG_PATH}}/google-earth-hosts-01.png)
▲Google 地球无法连接对话框

## 对相片进行地理标记

有时候想对无地理标记功能相机拍出的相片进行地理标记，Google Picasa 不失为最佳工具，Picasa 自身的功能偏弱，结合 Google Earth 进行批量标记最好不过。

![无法连接对话框]({{site.IMG_PATH}}/google-earth-hosts-02.png)
▲利用使用 Google Earth 进行地理标记

## 尝试解决连接问题

可是在编辑过程中，我并不想使用全局代理，根据 Google Earth Pro的警告框，进入了[连接诊断测试页面](https://support.google.com/earth/troubleshooter/3058364)。

根据引导，最后可以看到 Google Earth Pro使用的相关服务器网址，

    maps.google.com
    geoauth.google.com
    kh.google.com
    mw1.google.com
    mw2.google.com

也就是说只要以上网址能够正常访问，Google Earth Pro 便可正常使用，我尝试更改 [PAC](http://zh.wikipedia.org/zh/ 代理自动配置) 文件，但是结果没能成功。

## 科学使用 Google Earth

国内大多数 Google Earth Pro 用户采用修改 `hosts` 文件进行使用，简单的说修改 `hosts` 文件可指定域名映射的 IP 地址，Google 服务器众多，总有一部分尚能使用，那么应该如何查找可用的 Google 服务器 IP 地址呢？在这也不扯那么多，网上有无数“雷锋”在默默贡献着，最简便的方法即是在 GitHub 搜“[hosts](https://github.com/search?q=hosts)”便可。

随便找个 `hosts` 文件，替换本机的原文件便可轻松免翻墙使用 Google、Twitter 等的服务。

不过鄙人只想在 Google Erath Pro 中采用这种方法，那么可以通过 [gscan](https://github.com/yinqiwen/gscan) 找个可用的 Google IP，修改本机 `hosts` 文件，将上面提到的几个域名指向可用的 IP 地址便可，如下。

    64.233.162.83 maps.google.com
    64.233.162.83 geoauth.google.com
    64.233.162.83 kh.google.com
    64.233.162.83 mw1.google.com
    64.233.162.83 mw2.google.com

前段时间 Google 说要关闭 Panoramio 服务，但目前它尚在 Google Earth 中，自然不能落下。

    64.233.162.83 panoramio.com
    64.233.162.83 www.panoramio.com
    64.233.162.83 static.panoramio.com

这方法虽然有时效性，但这样便可不用代理也能正常使用 Google Earth Pro，需要注意的是，首次登录需要的并不仅仅这几个域名。

**本文历史**

* 2015 年 06 月 07 日 完成初稿
* 2015 年 07 月 07 日 更新
