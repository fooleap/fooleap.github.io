---
layout: post
title: Linux学习笔记(3)
description: "习惯于 Linux 之后，对 Windows 似乎有点陌生，前天一进去马上中毒，下了个 Avast 查杀，重起之后却无法进入系统，不知道什么原因了，于是重装了一下 XP……"
categories: tech
tags: [Grub, Linux, 学习, 笔记, 重装]
---

习惯于 Linux 之后，对 Windows 似乎有点陌生，前天一进去马上中毒，下了个 Avast 查杀，重起之后却无法进入系统，不知道什么原因了，于是重装了一下 XP。现在使用的是英文原版 XP。重装 XP，用 PE 十分简单，只要进入 PE环境，加载 iso 镜像，进入 i386 目录双击 winnt32.exe 进行安装，记得如果是 U 盘 PE 要在镜像加载成功之后拔掉 U 盘，要不安装以后引导是在 U 盘的。重装 XP 覆盖了原来的 MBR，要修复原来 Linux 的 Grub，可以直接使用 Grub for DOS 进入硬盘上的 Linux，然后再重新安装 Grub。
    
我的 Grub 启动管理器里面并没有 Windows 的启动项，也不想使其有，记得刚开始学习 Linux 的时候，首先是学习 Grub，Grub 很强大，学习其基本不难。现在我要进入 XP 都要进入 Grub2 命令行模式

    grub> set root=(hd0,1)
    grub> chainloader +1
    grub> boot

这些命令早已成为习惯，如果是 Grub 则是 "root=(hd0,0)"，Grub 是以 0 为第一个分区，Grub2 则是以 1 为第一个分区，我们的习惯自然是第一个分区是 1，由此看来，Grub2 相对 Grub 来说改进是明显的，不过计算机专业的我们可能早已习惯从 0 开始数数。

机子配置低，说实话，使用桌面环境有点吃不消，Lxde 是以 Openbox 作为默认窗口管理器，我在 Lubuntu 上面直接登录进入 Openbox Session，再安装了 tint2，dmenu，如此，已满足平时的使用，需要自启的程序可使用 Openbox 的 autostart.sh 实现。登录管理器没有换，之前试用过 SLiM，可是配置出现问题，再五一之前还是不要折腾先了，所以换回了默认的，SLiM 并没有删。机子的低配置使其在 Windows，Ubuntu 下面视频播放效果不佳，前几天试用了一下只包括 Mplayer 的系统 GeeXboX ([官网](http://geexbox.org)，[中文版](http://code.google.com/p/geexbox-chinese/))，对于配置低的机器确实是一个好工具。由于机子配置低，所以 Ubuntu 11.04 的发布并没有给我带来多少惊喜，也不打算试用，另一方面还是想着 Arch Linux。
 
学习 Linux 的过程中，我相信大部分人都看过：

* 王垠的《完全用GNU/Linux工作》[查看](http://www.chinaunix.net/jh/4/16102.html)
* 纪录片 Revolution OS
   
eD2k 链接：
[视频文件](ed2k://\|file\|Revolution.OS.2001.DVDRip.XviD-RETRO.avi\|735442944\|4df0329803e34c9fa868d97e6c33b14a\|h=TBJDWURXWBRNDIMYPEKWUIERL3LRZGCJ\|/)  [中文字幕](ed2k://\|file\|Revolution.OS.2001.DVDRip.XviD-RETRO.gb.srt\|173754\|4b6394055bc1395be8b50b0994f61ed1\|/)  [英文字幕](ed2k://\|file\|Revolution.OS.2001.DVDRip.XviD-RETRO.en.srt\|131269\|9f46d04d92f480d4f60354724e5f78e3\|/)

BT种子：[下载](http://dl.dbank.com/c0xkyrgpje)

网盘下载：[视频文件](http://u.115.com/file/f6809e2b24)  [英文字幕](http://u.115.com/file/f62e193aa0)  [简体中文字幕](http://u.115.com/file/f6c4b7dd95)  [繁体中文字幕](http://u.115.com/file/f644a97ddd)

* 纪录片 The Code - Linux

eD2k链接：[视频文件](ed2k://\|file\|%5B%E4%BB%A3%E7%A0%81%5D.The.Code.-.Linux.2001.TVRip.DivX.Linux_Documentary.avi\|629690368\|28ee139448197791814)  [中文字幕](ed2k://\|file\|%5B%E4%BB%A3%E7%A0%81%5D.The.Code.-.Linux.2001.TVRip.DivX.Linux_Documentary.chs.srt\|69669\|c4de2bc7acabf6a5d634b1b)

BT种子：[下载](http://dl.dbank.com/c0opkvt2nh)

网盘下载：[视频文件](http://u.115.com/file/f6e797cf91)  [中文字幕](http://u.115.com/file/f6f892d00c)

**注**：GeeXboX提供Windows安装器geexbox-win32-installer，可以直接使用它选择自己喜欢的安装方式（安装到硬盘并添加到启动菜单或安装到其他磁盘）进行安装。

![GeeXboX-Installer]({{site.IMG_PATH}}/linux-study-3.png)


**本文历史**

* 2011年04月29日 创建文章
* 2011年11月06日 修正grub2启动硬盘上xp的命令
* 2015年05月10日 换图床
