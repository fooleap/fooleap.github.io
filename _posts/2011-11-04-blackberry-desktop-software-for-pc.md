---
layout: post
title: "我的黑莓 8700 之桌面篇"
description: "一款智能手机少不了的东西，除了应用之外，还有强大的桌面管理器，以方便用户在电脑端管理手机上的软件、文件，同步数据到电脑，利用手机进行拨号上网等。目前，黑莓的 PC 端软件，虽说不上完美，但以够用。主流桌面操作系统上都可对进行刷机，软件的安装 / 卸载，同步数据等操作。"
thumb: IMG_PATH/blackberry.png
category: tech
tags: [手机, "黑莓 8700", Barry, Linux, Windows]
---

一款智能手机少不了的东西，除了应用之外，还有强大的桌面管理器，以方便用户在电脑端管理手机上的软件、文件，同步数据到电脑，利用手机进行拨号上网等。目前，黑莓的 PC 端软件，虽说不上完美，但以够用。主流桌面操作系统上都可对进行刷机，软件的安装 / 卸载，同步数据等操作。黑莓官方有 Windows 及 MAC 上的桌面管理软件，Windows 上的第三方桌面管理软件很多，其中国人开发的 BBctrl 或 BerryBox 很方便 BBer，Linux 则有 Barry 及 LinBerry 等第三方软件。

Windows 平台上有官方的桌面管理器，可以有刷机，同步，备份数据等等功能，还可直接对黑莓上的文件进行管理，这是第三方软件所没有的，我使用的版本是 4.2。（注：4.2 版本在 Win7 上会有蓝屏问题，以 WinXP 兼容模式及管理员权限运行即可解决。)

而第三方管理工具都使用 javaloader.exe 作为后端，提供人性化的图形界面来对黑莓进行管理。之前我管理软件都是用 BerryBox 进行安装，发现 BBctrl 功能比 BerryBox 更加强大，单文件，支持 alx 及 jad 安装，而且不需要。Net 以及 VC 组件。国内外还有更多的类似软件，就不说明了。

使用 BBerSMSManager 可将短信保存为 txt 或者 excel 文件：先用官方桌面管理器将短信及电话簿分别导出备份为 ipd 文件，然后在 BBerSMSManager 里导入备份文件进行保存。

![备份短信]({{site.IMG_PATH}}/blackberry-desktop-software-for-pc.png)
备份短信

以上软件均可在此下载：http://pan.baidu.com/s/1jHeJNDG  7dqg

~~http://dl.dbank.com/c0t9va2u9u~~

~~也可在此共享找到：http://www.dbank.com/share/blackberry8700~~

Linux 平台上主要使用 barry 对黑莓进行管理，linberry 我没用过。barry 的安装使用等可参考 felonwan 的这两篇文章：

> “黑莓的 Linux 桌面管理器”-Barry 的安装：http://blog.sina.com.cn/s/blog_59cf67260100g6ga.html
>
> “黑莓的 Linux 桌面管理器”-Barry 的使用：http://blog.sina.com.cn/s/blog_59cf67260100en94.html

Archlinux 上可通过 aur 安装 Barry：

    $ yaourt -S barry

或者

    $ yaourt -S barry-git

> Barry 项目中主要组成： barrybackup 有图形界面，用来备份和恢复数据，比如说通讯薄、短信等； barry-util
>
> 一些工具，比如说 bcharge──充电，breset──重启（？），btool，bidentify……； bjavaloader
>
> 用来安装和卸载应用程序 ppp 提供带电脑上网的拨号工具 opensync 用来与 Evelution 同步邮件

bjavaloader 的功能和 javaloader.exe 差不多，可进行对、*.cod 的加载删除及保存，还可对手机进行截图、修改时间、wipe 等操作。

列出手机上模块列表时，可使用"\>"重定向输出符号把列表保存在一个文件中，如：

    # bjavaloader dir > 1.txt

安装软件的时，可使用"\*"匹配任意字符，对指定的、*cod 文件进行加载，如：

    # bjavaloader load GoogleMaps/*cod
    # bjavaloader load Google*cod

删除在用文件时，可以用参数"-f"进行强制删除，如：

    # bjavaloader erase -f UCBrowser

截图时只能保存图像为 BMP 格式文件，保存为 PNG 等格式，文件大小和 BMP 文件是一样的。

此前我在 Ubuntu 上能用 barrybuckup 进行同步，在 Archlinux 上还没解决，不知道什么回事，反正也不用。

**了解更多**

* BBctrl 主页：[http://www.pageniao.com/bbctrl](http://www.pageniao.com/bbctrl/ "BBctrl")
* BerryBox 主页：[http://oteam.cn/BerryBox](http://oteam.cn/BerryBox/ "BerryBox")
* Barry 主页：[http://www.netdirect.ca/software/packages/barry](http://www.netdirect.ca/software/packages/barry "Barry")

**本文历史**

* 2011 年 11 月 04 日 创建文章
* 2015 年 05 月 24 日 换图床
