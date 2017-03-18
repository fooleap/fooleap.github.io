---
layout: post
title: iPhone 4s 已降级至 iOS 6.1.3
description: "这两天，iPhone 4s 可以降级的消息一爆出，iPhone 4s 用户激动纷纷，鄙人今日（6 月 30 日）已降级，发篇博吧，感受啥的后面补上。"
thumb: IMG_PATH/ios6.png
category: tech
tags: ["iPhone 4s", "iOS 6", 降级, odysseusOTA, iPhone]
---

* toc
{:toc}

这两天，iPhone 4s 可以降级的消息一爆出，iPhone 4s 用户激动纷纷，鄙人今日（6 月 30 日）已降级，发篇博吧，感受啥的后面补上。

## iPhone 4s 固件往事

我的 iPhone 4s （8G 版本）购于 2013 年 11 月，预装 iOS 7。虽然那时候有些人认为 iPhone 4s 运行 iOS 7 不够流畅，但没用过 iOS 6 的我觉得 iOS 7 使用挺流畅的，除了一些比较“重”的 App 用起来吃力。iOS 7 的最终版本是 7.1.2，由于苹果已经把 iOS 7 的 [SHSH 认证](https://www.theiphonewiki.com/wiki/SHSH) 关掉，我原本以为我的手机再也不会升级系统，可是后来发生了意想不到的事情。

有一天，不小心 [错删系统文件](/shuangpin-for-iphone.html#section)，导致不得不将 iPhone 4s 系统升级到 iOS 8，那次失误让我耿耿于怀，因为 iOS 8 在 iPhone 4s 上并不是很流畅，一些软件的使用可以用“卡顿”来形容。不过使用了一段时间，逐渐接受 iOS 8，最新版本其实对 iPhone 4s 的优化已经足够，用起来感觉也还可以。

后来，发现 iOS 9 竟然还支持 iPhone 4s，感觉 iPhone 4s 的生命力足够顽强，固件版本最初为 iOS 5，竟然还能使用 iOS 9，也刷了 iOS 9 Beta 感觉不爽弃用，据说 Beta 2 对 4s 进行了一定程度的优化，不过现在我最多也就看看 [对比视频](https://www.youtube.com/channel/UCg7ckDevnFST7lWlCCZ1c3w)，不折腾。

移动互联网大行其道的如今，手机真的很普遍，就连长辈们都纷纷用上了微信，动不动就小视频发过来。我平时对手机依赖性挺强的，不过还不能称为“手机玩家”，iPhone 4s 的性能对我来说太够了，唯一的缺点就是手机电池不是很耐用，还有我觉得大屏不便携，要不当初可能也不会选择性价比并不高的 iPhone 4s。

## odysseusOTA

前两天，刷 CnBeta 的时候看到一篇文章：[[视频] 怀念拟物风格？iPhone 4s 可以降至 iOS 6.1.3](http://www.cnbeta.com/articles/406483.htm)，眼睛直盯着加粗的文字，好的，我会降级的。

[了解了一下](http://www.reddit.com/r/jailbreak/comments/3bfrd5/)，由于在 iPhone 4s 上， iOS 5.0.1 通过 OTA 升级到最新版本的 iOS 则必须先升级到 iOS 6.1.3，所以苹果保留通过 OTA 升级到 iOS 6.1.3 的认证，而且很可能永远不会关闭，因为一旦关闭，iOS 5.0.1 将无法通过 OTA 升级到最新版本。

看了下降级视频，感觉挺简单的，[odysseusOTA](https://youtu.be/Wo7mGdMcjxw) 看样子是 [@tihmstar](https://twitter.com/tihmstar) 基于 [@daytonhasty](https://twitter.com/daytonhasty) 的 [Odysseus](http://dayt0n.github.io/articles/Odysseus/) 重新打包方便使用的。

odysseusOTA 可以在 Mac OS 及 Linux 64 位上使用，对于一些依赖问题，Mac OS 下需要安装的有以下这些。

    brew install usbmuxd automake autoconf libtool pkg-config libplist libzip openssl

并按顺序编译安装 [libirecovery](https://github.com/xerub/libirecovery.git)、[libusbmuxd](https://github.com/libimobiledevice/libusbmuxd.git)、[libimobiledevice](https://github.com/libimobiledevice/libimobiledevice.git)、[idevicerestore](https://github.com/xerub/idevicerestore.git)，可参考[这里](http://www.reddit.com/r/jailbreak/comments/3bfrd5/release_odysseusota_downgrade_iphone4s_or_ipad2/csm408n)。

Ubuntu 等一些 DEB 系的 Linux 发行版，则可以通过 [@daytonhasty](https://twitter.com/daytonhasty) 的 [OdysseusLinuxSetup](https://github.com/dayt0n/OdysseusLinuxSetup) 安装依赖。

依赖装完之后，将 odysseusOTA（[odysseusOTA-v2.3.zip](https://www.dropbox.com/s/zmol1g84msi4aih/odysseusOTA-v2.3.zip)）及 iPhone 4s 的 iOS 6.1.3 固件（[iPhone4,1_6.1.3_10B329_Restore.ipsw](http://appldnld.apple.com/iOS6.1/091-2611.20130319.Fr54r/iPhone4,1_6.1.3_10B329_Restore.ipsw)）下载好，就可以根据 odysseusOTA 的 README.txt 开搞。

在此需要提醒的是，若是在 Windows 上使用虚拟机的话，请采用 VMWare。

7 月 2 日，[@CPVideoMaker](https://twitter.com/cpvideomaker) 共享了一个在 Windows 行得通的方法，文件和安装说明在 [Testing](https://drive.google.com/folderview?id=0ByxMOiAf78kIfkRSa211YXlCZzA4dS1IV3p3YTVncU1UZldEWXNraTZ2RG5Ha083WFllYzQ)，看起来似乎将步骤缩掉一些，具体步骤可看 ReadMe。

## Beehind

![Beehind]({{site.IMG_PATH}}/downgrade-iphone-4s-to-ios-613-01.png?imageView2/2/w/640)
Beehind

有不少人降级无门，没有 Mac 电脑，电脑性能也不够装虚拟机，Linux 更不想碰，如果有 Windows 版本该多好，就不用为降级那么折腾。好消息总是来得很快，7 月 1 日，[@blackgeektuto](https://twitter.com/blackgeektuto) 发布了一款名为 Beehind（[官网](http://geeksn0w.it/Beehind/)） 的 Windows 降级工具，这下，iPhone 4s 的降级不用愁了。

## 降级后的 iPhone 4s

![搭载 iOS 6 的 iPhone 4s 主界面]({{site.IMG_PATH}}/downgrade-iphone-4s-to-ios-613-02.png?imageView2/2/w/480)
搭载 iOS 6 的 iPhone 4s 主界面

如丝般顺滑的操作；

续航暂时未发现比 iOS 8 长；

相当一部分软件最新版不支持 iOS 6（App Store 可下载支持 iOS 6 的最后一个版本）。

**本文历史**

* 2015 年 07 月 02 日 完成初稿
* 2015 年 07 月 02 日 更新 @cpvideomaker 的共享
* 2015 年 07 月 21 日 更新
