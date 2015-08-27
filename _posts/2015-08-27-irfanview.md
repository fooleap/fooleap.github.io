---
layout: post
title: "图片浏览器 IrfanView"
description: "说起这个名字，或许大多数人都会感觉很陌生，听都没听说过。若说它是图片浏览器，很多人还是一脸茫然。或许是它的名字比较难记，IrfanView 命名源于软件作者 Irfan Skiljan，将拆成 irfan 及 view 两个单词就很好记。"
date: 2015-08-27 17:00:00 +0800
category: tech
tags: [IrfanView, 看图软件, 图片浏览器, Linux]
---

* toc
{:toc}

## IrfanView 是什么

说起这个名字，或许大多数人都会感觉很陌生，听都没听说过。若说它是图片浏览器，很多人还是一脸茫然。或许是它的名字比较难记，IrfanView 命名源于软件作者 Irfan Skiljan，将拆成 irfan 及 view 两个单词就很好记。

先看界面，IrfanView 的界面可以说有些简陋，在 Windows 10 都出来了的今天，它的界面似乎还活在世纪初。

![IrfanView 界面]({{ site.IMG_PATH }}/irfanview-01.png?imageView2/2/q/90)
▲IrfanView 界面

再看 [官网](http://www.irfanview.com/)，如果没看到底下的 2015，或许会以为穿越到 20 世纪。而在官网显眼的位置，有那么一句话：“...one of the most popular viewers worldwide!”什么意思？英语四级都没过的我也知道，它的意思是：世界上最流行查看器（图片浏览器）之一。

我就觉得奇怪了，一款号称世上最流行的图片浏览器，国内却鲜有人用，界面还那么简陋，它真的有那么流行么？

## 为什么用 IrfanView

其实很多人觉得 Windows 自带的图片浏览器就可以满足其使用需求，但 Windows 自带的图片浏览器功能有限，有不少人还是会选择一款第三方软件作为看图软件。

在我的印象中，好久以前，ACDSee 或许是看图软件的代名词；前几年，美图看看成为国内热门的看图软件；而近几年随着移动端的兴起，PC 端软件或许很少人会关注，很少人专门去挑选看图软件。

几年前，鄙人曾经用过一段时间的 XnView，感觉既免费又好用，还跨平台，实在好棒。其实在用 XnView 的同时，我也在 [善用佳软](http://xbeta.info/) 看到作者不留余力地介绍 [IrfanView](http://xbeta.info/tag/irfanview)，刚开始我并没有去试用这款界面那么丑的软件。后来一次装机突然想试试，便下载 IrfanView 安装使用，发现这款软件还真是很不错。从那以后，我就一直使用 IrfanView 作为看图软件。

IrfanView 支持的 [文件格式](http://www.irfanview.com/main_formats.htm) 很全面，预览 Photoshop 的 PSD 格式文件，数码相机的 RAW 格式（需装插件）都无压力。它虽界面简陋，但是该有的功能都有，值得一提的是快捷键用着很舒服，在大多数菜单操作后面都可以看到对应的快捷键操作支持。IrfanView 各种各样的功能在此就不多说，在功能全面的同时速度还那么快实在难得。

或许我可以用这么一句话来描述 IrfanView 最大的优点：在用 IrfanView 之前我从没用过这么快的一款看图软件。

## Linux 上的 IrfanView

Windows 安装使用 IrfanView 很方便，一般下载 [主程序包](http://www.irfanview.com/main_download_engl.htm)、[插件包](http://www.irfanview.com/plugins.htm)、[语言包](http://www.irfanview.com/languages.htm) 安装即可，最近的版本已有 [64 位版本](http://www.irfanview.com/64bit.htm)。

在 Linux 上，很难找到一款令人满意的看图软件，而且有些软件还依赖于某种桌面环境。虽然不错的 XnView、Picasa 都可以用，但鉴于习惯鄙人还是想用 IrfanView。

鄙人使用的是 Debian 8 LXDE 64 位系统，并 [安装了 Wine](/wineqq-for-debian.html#wine-17)，下面的操作都是在这个环境下执行的。

IrfanView 依赖于 [mfc42.dll](https://zh.wikipedia.org/wiki/MFC)，首先使用 winetricks 安装它。

    $ winetricks mfc42

安装之后便可和 Windows 一样，下载几个安装包后双击安装。

这里需要提到的还有文件关联，在 IrfanView 程序设置文件关联，对文件管理器 PCManFM 是无效的。

可以搞一个自定义命令作为打开 IrfanView 的快捷方式，例如：`/usr/bin/iview`。

{% highlight bash %}
#!/bin/sh
while [ "$1" ]
do
  param=`winepath -w "$*"`
  shift
done
wine "c:\\Program Files\\IrfanView\\i_view32.exe" "$param" &
exit 0
{% endhighlight %}

这样一来，`iview` 命令便可快速打开 IrfanView，后面加文件则是用 IrfanView 打开该文件。

接下来，可以根据 [这个文档](http://www.linuxmintusers.de/index.php?action=wiki;page=IrfanView_(WINE)) 进行设置。

编辑 `~/.local/share/applications/IrfanView.desktop` 文件。

{% highlight bash %}
[Desktop Entry]
Encoding=UTF-8
Name=IrfanView
MimeType=image/bmp;image/gif;image/jp2;image/jpeg;image/png;image/tiff;image/vnd.microsoft.icon;image/x-emf;image/x-jng;image/x-panasonic-raw;image/x-pcx;image/x-portable-bitmap;image/x-portable-graymap;image/x-portable-pixmap;image/x-tga;
Exec= iview %f
Type=Application
Terminal=false
NoDisplay=true
Comment=Bildbetrachter
Categories=Graphics;Wine;
Icon=/usr/share/icons/hicolor/16x16/apps/wine.png
{% endhighlight %}

后编辑 `~/.local/share/applications/mimeinfo.cache` 文件

{% highlight bash %}
[MIME Cache]
image/bmp=IrfanView.desktop
image/gif=IrfanView.desktop
image/jp2=IrfanView.desktop
image/jpeg=IrfanView.desktop
image/png=IrfanView.desktop
image/tiff=IrfanView.desktop
image/vnd.microsoft.icon=IrfanView.desktop
image/x-emf=IrfanView.desktop
image/x-jng=IrfanView.desktop
image/x-panasonic-raw=IrfanView.desktop
image/x-pcx=IrfanView.desktop
image/x-portable-bitmap=IrfanView.desktop
image/x-portable-graymap=IrfanView.desktop
image/x-portable-pixmap=IrfanView.desktop
image/x-tga=IrfanView.desktop
{% endhighlight %}

经过上面的配置，就可以在文件属性中选择采用 IrfanView 打开。

![PCManFM 图像文件属性]({{ site.IMG_PATH }}/irfanview-02.png?imageView2/2/q/90)
▲PCManFM 图像文件属性

另外，其实使用 IrfanView Thumbnails 浏览缩略图也是不错的。

**本文历史**

* 2015 年 08 月 27 日 完成初稿
