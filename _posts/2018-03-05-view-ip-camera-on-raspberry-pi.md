---
layout: post
title: "使用树莓派做监控显示"
date: 2018-03-05 14:13:11+0800
category: tech
tags: [树莓派, 网络摄像头, 监控, 萤石]
---

现如今，门口的监控摄像头似乎成为家庭必需品。主要是为了有人按门铃，瞥一眼就知道谁来了。新安装的监控摄像头，一般会选择数字摄像头，我家也不例外。

萤石是海康威视的家用品牌，之前帮二叔买了一款感觉还不错，后来就买了一款萤石 C5S 家里用。为了在 2 楼客厅可以看实时监控，入了基本款的录像机萤石 N1，外接个显示器，顺便也有了录像功能。

本来打开手机 APP 能看实时监控也是挺方便的，3 楼客厅便没放上监控显示，但每次想看都得几秒才能打开那粗糙的 APP，屡试不爽。所以最近买了个显示器，配合吃灰已久的树莓派一代 B+，撸了一个监控显示。

## 我的树莓派

说起这个树莓派，一翻老照片，才想起那么一段黑历史。在学生时代，为了装逼，总是喜欢使用 Linux，虽然没学到什么大知识，但也学会了基本的 shell 操作。工作后，刚开始时基本上用 Windows 很少再去折腾 Linux。

14 年工作挺闲的，反正 Linux 操作没有压力，就买了个树莓派 B+ 来折腾。那时候也不知道可以干什么，刚开始用 SSH 登录，架个网站、搞个音乐电台什么的挺没意思，其实是不大懂折腾，也没想买什么扩展硬件。

![Raspberry Pi Model B+][p1]

没有显示器，也没打算买全新的，打听到朋友家居然有台老式飞利浦显示器闲置，方屏很感兴趣。一天傍晚就真去朋友那扛，这大屁股可真重，相距就几公里。扛上公交，抱回住处，再走楼梯上七楼，那个流的汗啊，没把我给累死。

![朋友的老式显示器][p2]

老式显示器没有 HDMI 接口，就买了根转接线，那时候硬件连接及效果如下：

![硬件连接][p3]

![老显示器显示效果][p4]

## 网络摄像头的局域网直播

局域网内实现监控视频播放，一般直接播放其 rtsp 流媒体即可，海康及萤石的摄像头均有提供，其 rtsp 流地址格式如下，只允许两台或以下设备同时播放，包括 APP 客户端。

```
rtsp://[username]:[password]@[ip]:[port]/[codec]/[channel]/[subtype]/av_stream
```

说明：

* username：用户名，默认为 admin
* password：密码，萤石默认为验证码
* ip：为设备 IP，例如 192.168.1.172，建议路由器指定固定 IP
* port：端口号，默认为 554，若为默认可不填写
* codec：编码，有 h264、MPEG-4、mpeg4 这几种
* channel：通道号，起始为 1。例如通道 1，则为 ch1
* subtype：码流类型，主码流为 main，辅码流为 sub

在电脑上，可以直接使用支持 rtsp 的播放器，打开对应的地址即可播放。而我想要实现的是，树莓派开机即自动播放，并保持正常状态。

## 树莓派上的监控摄像头

下面是我折腾的过程：

之前一张 16G 的内存卡坏了，就在家找了张 2G 的内存卡。没想到树莓派版本的 KODI（即 LibreELEC） 体积很小，就安装上了。根据网上的教程，无论我怎么搞，KODI 都没法播放萤石的 rtsp 流，不找原因，直接放弃。

利用本来打算装在摄像头端的 32G 内存卡，装上亲切的 Raspian，开始折腾 omxplayer 播放 rtsp 流。

使用 omxplayer 播放萤石的 rtsp 流很方便，只需：

```
omxplayer --live -n -1 --avdict rtsp_transport:tcp rtsp://[camera_url]
```

可惜的是，简单的操作无法保持一直正常实时播放。有时候几分钟，有时候几个小时，omxplayer 的状态不变，但画面定格住了。或许是萤石，或许是树莓派，又或许是 omxplayer 的问题，具体原因我也没去深究，只是在想如何解决。

试着在 GitHub 找一些 omxplayer 的相关项目，看看能否实现检测到画面定格住，则重新播放，浪费了一些时间后一无所获，还是往简单的方面想，就在网上找了一些使用树莓派实现监控显示的代码。

其中有一帖子[[1]][1]讨论挺热闹的，内容是使用树莓派实现多摄像头监控显示，主要是使用 crontab 执行定时任务，实现检测 omxplayer 是否退出，退出则重新运行。

针对我所遇到的问题，画面定格时 omxplayer 并没退出，参考复制了一些代码，干脆一不做二不休，每 20 分钟重新运行一次，延迟几秒后，杀死原有的 screen 进程。

在淘宝上买了个廉价外壳，几近完美。

![锈迹斑斑的树莓派][p5]

![完美贴合外壳][p6]

![外壳开孔准确][p7]

## 参考资料

[1]: https://community.ubnt.com/t5/UniFi-Video/Tutorial-RTSP-Raspberry-Pi-B-Viewer-6-Cam-4-Cam/td-p/1536448 "[Tutorial] RTSP Raspberry Pi B+ Viewer [6-Cam] [4-Cam]"

**本文历史**

* 2018 年 03 月 05 日 完成初稿
* 2018 年 03 月 06 日 添加图片，更新黑历史等

[p1]: {{ site.IMG_PATH }}/view-ip-camera-on-raspberry-pi-01.jpg_640 "Raspberry Pi Model B+"
[p2]: {{ site.IMG_PATH }}/view-ip-camera-on-raspberry-pi-02.jpg_640 "朋友的老式显示器"
[p3]: {{ site.IMG_PATH }}/view-ip-camera-on-raspberry-pi-03.jpg_640 "硬件连接"
[p4]: {{ site.IMG_PATH }}/view-ip-camera-on-raspberry-pi-04.jpg_640 "老显示器显示效果"
[p5]: {{ site.IMG_PATH }}/view-ip-camera-on-raspberry-pi-05.jpg_640 "锈迹斑斑的树莓派"
[p6]: {{ site.IMG_PATH }}/view-ip-camera-on-raspberry-pi-06.jpg_640 "完美贴合外壳"
[p7]: {{ site.IMG_PATH }}/view-ip-camera-on-raspberry-pi-07.jpg_640 "外壳开孔准确"
