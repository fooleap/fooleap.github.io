---
layout: post
title: 善用 Win32 Disk Imager
description: "很久以前，那时年轻不懂事，没完没了折腾 Linux 的各种发行版，刚开始捣鼓的时身上没有光盘，所以安装系统时常常采用硬盘安装的方式。"
date: 2015-10-18 23:00:00 +0800
thumb: http://7fv9cr.com1.z0.glb.clouddn.com/linux.png
category: tech
tags: [Linux, 硬盘安装, 'U 盘安装']
---

很久以前，那时年轻不懂事，没完没了折腾 Linux 的各种发行版，刚开始捣鼓时身上没有光盘，所以安装系统时常常采用硬盘安装的方式。

虽然一般采用 Google 搜索一下就可以轻松解决，但事实上如果操作有些许失误就得重试，这个过程真够费时间的。折腾的过程便是学习，慢慢学会使用 GRUB，正确引导电脑进入安装界面或者 Live 环境。

折腾期间也记录了一些笔记，例如：

* [Linux 学习笔记 (4)](/linux-study-4.html)
* [硬盘安装 Arch Linux](/hard-disk-installation-for-archlinux.html)

而事实上，在已安装 Windows 的系统安装一个 Linux 系统，Ubuntu，Fedora 或 Arch Linux 等，并不需要那么麻烦的去硬盘安装，或许采用 U 盘安装更加方便。

跟硬盘安装一般，网上也充斥着无数 U 盘安装的相关教程，有些会让采用 UltraISO[[1]][1] 写入镜像到 U 盘，有些则是说用 Universal USB Installer[[2]][2]，还有些介绍 UNetbootin[[3]][3] 这款软件，也不知道是不是自己操作错误，这几款软件似乎无法成功制作有些发行版的安装盘。

前几年有一段时间没使用 Linux 之后，重新再使用 Linux 时，我发现 Win32 Disk Imager[[4]][4] 这款软件兼容性很好，它能让 U 盘（内存卡）都能像安装光盘一样。

使用需注意在选择镜像的时候，需将文件类型切换成任意类型（默认是 `*.img` ），便能看到相关的镜像文件，具体可看官方的视频演示。

![选择镜像]({{ site.IMG_PATH }}/win32-disk-imager.png)
&#9650;选择镜像

## 参考资料

[1]: http://cn.ezbsystems.com/ultraiso/ "UltraISO - EZB Systems, Inc"
[2]: http://www.pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/ "Universal USB Installer &#8211; Easy as 1 2 3 | USB Pen Drive Linux"
[3]: http://unetbootin.github.io/ "UNetbootin - Homepage and Downloads"
[4]: http://sourceforge.net/projects/win32diskimager/ "Win32 Disk Imager download | SourceForge.net"

**本文历史**

* 2015 年 10 月 18 日 完成初稿
