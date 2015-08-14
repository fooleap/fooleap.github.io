---
layout: post
title: Firefox 的菜单栏
description: "鄙人刚使用浏览器时，无论哪款浏览器，都有经典的菜单栏。菜单使用起来很简单，很多设置、操作都只需要用鼠标点点菜单即可，方便极了。"
date: 2015-08-14 18:00:00 +0800
category: tech
tags: [Firefox, Pentadactyl, 'Windows 10', 菜单栏]
---

* toc
{:toc}

## 浏览器菜单栏

鄙人刚使用浏览器时，无论哪款浏览器，都有经典的菜单栏。菜单使用起来很简单，很多设置、操作都只需要用鼠标点点菜单即可，方便极了。

Google Chrome 出来后，时代变了，各种浏览器的菜单栏没有了，各种浏览器 UI 都从简，只剩下一个菜单按钮。

鄙人是一个怀旧的人，习惯于有菜单栏的浏览器。在 Firefox 还是一款默认有菜单栏的浏览器时，鄙人便习惯于使用 Firefox，一直到现在也是如此。

![Firefox 马克杯镇文]({{ site.IMG_PATH }}/firefox-menubar-01.jpg)
▲Firefox 马克杯镇文

后来 Firefox 变了，默认不显示菜单栏，首先是在左上角搞了个菜单按钮，之后和 Chrome 一样在右上角搞了个菜单按钮，点开之后一阵小清新袭来，但对我来说却是面目全非不知所措，很多操作很难找到或根本没有在这个菜单里面。虽然只要按 Alt 键便可切换菜单栏的显示与否，但我还是将菜单栏设置为常显状态。

![Firefox 现在的菜单按钮]({{ site.IMG_PATH }}/firefox-menubar-01.png)
▲Firefox 现在的菜单按钮

## Pentadactyl 菜单栏

Pentadactyl 默认是不显示菜单栏的，这样可以尽可能的减少鼠标操作，有很多操作都采用键盘形式进行。对于菜单操作，使用 `:emenu` 命令即可，可以使用快捷键绑定几个常用菜单操作，习惯之后，效率应该比较高。加上菜单栏的很多项目，本身就有对应的快捷键操作，其实菜单栏显得有点多余。

![通过 :emenu 实现菜单操作]({{ site.IMG_PATH }}/firefox-menubar-02.png)
▲通过 `:emenu` 实现菜单操作

然而，鄙人还是想要菜单栏，不看到菜单栏不放心，只能修改配置，只要在 `_pentadactylrc` 或 `.pentadactylrc` 里加上 `set go+=m` 即可。

## Windows 10 的 FF 菜单栏

前几天安装了 Windows 10，Firefox 的菜单栏背景颜色居然和其他工具栏的背景颜色不同，这样看起来相当别扭，可能是 Firefox 默认主题有问题。

![显示有问题的 Firefox 菜单栏]({{ site.IMG_PATH }}/firefox-menubar-03.png)
▲显示有问题的 Firefox 菜单栏

于是随便装了一款主题解决，发现主题还不错。这款主题名字为 [FXChrome](https://addons.mozilla.org/zh-CN/firefox/addon/fxchrome)，是一款仿 Google Chrome 风格的主题。

**本文历史**

* 2015 年 08 月 14 日 完成初稿
