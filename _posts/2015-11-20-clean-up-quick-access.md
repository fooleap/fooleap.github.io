---
layout: post
title: 清除快速访问中无法删除的项目
description: "由于某些需要，这段时间一直使用 Windows，目前使用的是 Windows 10，最近碰到一个令强迫症患者无法接受的小问题。"
date: 2015-11-20 08:25:00 +0800
thumb: 'IMG_PATH/windows10.png'
category: tech
tags: [Windows, 快速访问]
---

由于某些需要，这段时间一直使用 Windows，目前使用的是 Windows 10，最近碰到一个令强迫症患者无法接受的小问题。

自从 Windows Vista 开始，资源管理器里侧栏有一个收藏夹的工具栏，有些常用的目录拉到里面挺方便的，使用起来很顺手。

似乎是从 Windows 8.1 起，这个收藏夹被改为快速访问。快速访问比起收藏夹使用起来明显更加方便，它会根据用户的访问频率，将文件夹按照访问次数顺序临时排在已固定的目录后面。

不知何时开始，我的快速访问工具栏里面，多出了一个名为 `aria2-1.19.1-win-64bit-buil...` 的文件，由于前面的图标不是文件夹，因此这里暂时将它称为文件，据前面的字符，或许全名为 `aria2-1.19.1-win-64bit-build1.zip`，这些都无关紧要，可能是之前下载 aria2 的时候不小心拉到那边的。

![无法删除的文件]({{ site.IMG_PATH }}/clean-up-quick-access-01.png)
&#9650;无法删除的文件

那么问题来了，这个文件无法删除，无法使用鼠标右键，按键盘的 `Delete` 键没反应，也无法将它拉到回收站，无奈之下只好 Google 一下。

在微软的官方社区上找到一个相似的问题[[1]][1]，也是一样无法删除快速访问里面的项目，下面有回复提到解决方法，按照里面的方法操作后便恢复默认，方法如下：

    %APPDATA%\Microsoft\Windows\Recent\AutomaticDestinations
    %APPDATA%\Microsoft\Windows\Recent\CustomDestinations

只需删除以上两个目录里面的所有文件，便可将快速访问恢复默认状态。

![默认的快速访问]({{ site.IMG_PATH }}/clean-up-quick-access-02.png)
&#9650;默认的快速访问

## 参考资料

[1]: http://answers.microsoft.com/zh-hans/windows/forum/windows_10-files/win10/7786725e-09af-4c97-8340-1bee9fb246bd "Win10 快速访问中的&#8220;新建文件夹&#8221;不能取消固定&#65292;也删不掉 - Microsoft Community"

**本文历史**

* 2015 年 11 月 20 日 完成初稿
