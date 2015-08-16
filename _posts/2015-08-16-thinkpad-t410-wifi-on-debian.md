---
layout: post
title: 驱动 Debian 上的无线网卡
description: "鄙人的 ThinkPad T410 此次安装的 Debian，是采用 Debian 8 LXDE 64 位的 CD1，安装过程中检测网络时提示硬件需要的是非自由固件驱动，需要手动安装。"
date: 2015-08-16 18:00:00 +0800
category: tech
tags: [Debian, 'ThinkPad T410', 'Wi-Fi', 无线驱动]
---

鄙人的 ThinkPad T410 此次安装的 Debian，是采用 Debian 8 LXDE 64 位的 CD1，安装过程中检测网络时提示硬件需要的是非自由固件驱动，需要手动安装。

![安装 Debian 时的提示]({{ site.IMG_PATH }}/thinkpad-t410-wifi-on-debian-01.png)
▲安装 Debian 时的提示

系统安装完成，第一次进入系统时，更换软件源，选择业界良心的网易镜像，具体可看帮助页面：[Debian 镜像使用帮助](http://mirrors.163.com/.help/debian.html)。

安装完中文字体后，首先要解决的就是驱动无线网卡这个问题，根据 Debian 官方的 Wiki：[iwlwifi](https://wiki.debian.org/iwlwifi)，可知我的无线网卡只需要安装这个固件就可驱动。根据 Wiki，第一步是添加 `non-free` 组件，更换软件源时已添加，还是速度飞快的网易源，安装即可。

    # apt-get install firmware-iwlwifi

手动加载模块

    #  modprobe -r iwlwifi ; modprobe iwlwifi

根据 [此页面](https://wiki.debian.org/WiFi/HowToUse) 进行配置，因为我使用的是 LXDE 桌面环境，其默认采用的是 Wicd 管理网络，所以根据其帮助进行设置操作。

![Wicd 的默认设置]({{ site.IMG_PATH }}/thinkpad-t410-wifi-on-debian-02.png)
▲Wicd 的默认设置

无奈操作之后还是没有检测出 Wi-Fi，一片慌忙之后终于在 Wicd 的设置中找到原因。其网络接口的无线网络选项中居然是空白的，填上 wlan0 确定后在主界面点刷新，熟悉的 SSID 就出现在眼前。

到此，Wi-Fi 就能使用，以上。

**本文历史**

* 2015 年 08 月 16 日 完成初稿

