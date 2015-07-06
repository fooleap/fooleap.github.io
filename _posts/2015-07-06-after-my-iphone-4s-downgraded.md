---
layout: post
title: 记在 iPhone 4s 降级之后
description: "iPhone 4s 滚回 iOS 6 后，用习惯 iOS 7/8 的我感觉还是稍不适，所以选择越狱装插件。"
date: 2015-07-06 13:00:00 +0800
category: tech
tags: ["iOS 6", "iPhone 4s", "越狱", "插件", "p0sixspwn"]
---

* toc
{:toc}

iPhone 4s 滚回 iOS 6 后，用习惯 iOS 7/8 的我感觉还是稍不适，所以选择越狱装插件。

## iOS 6 的不足

搭载 iOS 6 的 iPhone 4s 虽操作流畅，而对比 iOS 7/8 在功能上 iOS 6 有一些不足，例如：

* 通知中心无常用开关
* 无控制中心
* 关闭程序太麻烦
* 不支持第三方输入法

面对这些不足，流畅的 iPhone 4s 似乎找不到不越狱的理由。

## iOS 6.1.3 如何越狱？

iOS 6.1.3 可采用 [p0sixspwn](http://p0sixspwn.com/) 进行越狱，不过 Windows 版本打开会提示“p0sixspwn requires iTunes 9 or above”，现在版本是高于 iTunes 9 啊，可能也并不兼容最新版本的 iTunes，那么只能安装旧版本的。

![p0sixspwn 错误]({{site.IMG_PATH}}/after-my-iphone-4s-downgraded.png)
▲p0sixspwn 错误


在 ipsw.me 找到 iTunes 的旧版本，推荐 iTunes 11.0.5（[32-bit](https://secure-appldnld.apple.com/iTunes11/091-9269.20130816.Azfre/iTunesSetup.exe)、[64-bit](https://secure-appldnld.apple.com/iTunes11/091-9270.20130816.Qw23e/iTunes64Setup.exe)，似乎比这个新就不行）。

安装旧版本之前需先卸载 iTunes，卸载 iTunes 有一定讲究，可以根据苹果官方给出的 [帮助文档](https://support.apple.com/zh-cn/HT1923) 进行卸载。

卸载完正常安装下载好的旧版本 iTunes，装完就能正常使用 p0sixspwn。

具体步骤可参考这篇文章：[How To Fix p0sixspwn Requires iTunes 9 Or Above & Untethered iOS 6.1.6 Jailbreak](http://www.inati0n.com/how-to-fix-p0sixspwn-requires-itunes-9-or-above-untethered-ios-6-1-6-jailbreak/)。


## 安装的软插件列表

越狱之后，我装了那些插件？

  * Accelerate(BigBoss)：加快程序中的动画（Cydia 搜不到，遂：[accelerate_2.0-1.deb](http://files14.thebigboss.org/repofiles/cydia/debs2.0/accelerate_2.0-1.deb)）
  * AccountChanger(BigBoss)：在 App Store 快速切换 Apple ID
  * Activator(BigBoss)：手势增强
  * Burst Mode(BigBoss)：照相连拍
  * Chinese Calendar for NotificationCenter(BigBoss)：通知中心添加农历
  * f.lux(Telesphoreo)：自动调节屏幕色温（[官网](https://justgetflux.com/)）
  * FakeClockUp([modyashi](http://hitoriblog.com/apt/))：加快程序外的动画
  * iCleaner(BigBoss)：清理缓存垃圾
  * KuaiDial([kuaidial](http://kuaidial.googlecode.com/svn/deb))：号码归属地
  * NCSettings(ModMyi)：通知界面开关
  * No keyboard Spotlight(BigBoss)：Spotlight 界面不自动跳出键盘
  * OpenSSH(Telesphoreo)：SSH 服务
  * Poof(BigBoss)：隐藏图标，配合 Activator 使用
  * Pull TO Dismiss(BigBoss)：下滑关闭键盘
  * ShadowSocks(BigBoss)：科学上网利器
  * ShadowSocks Per-App Plugin(BigBoss)：设置程序内代理
  * Speedy Homey(ModMyi)：屏蔽双击 Home 键打开后台，加快单击 Home 速度，配合 Activator 使用
  * SwipeAway(ModMyi)：滑动关闭后台程序，配合 Activator 使用
  * SwipeShiftCaret(BigBoss)：方便移动光标
  * WI-InputMethod：WI 输入法（[wiinputmethod-ios-2.1-1413.deb](http://att6.weiphone.net/temp16/201311/21/5/wiinputmethod-ios-2.1-1413.deb)）
  * Yahoo!Weather is Better(BigBoss)：雅虎天气取代内置天气

*.deb 文件可以使用 [iFunbox](http://www.i-funbox.com/) 移入手机安装。

不少插件有可替代的类似插件，Accelerate 和 FakeClockUp 据我使用的感受是如上所说明，所以两款都装。值得一提的是 Activator，这款插件让我有了 [webOS](/small-but-complete.html) 的感觉，虽然滑动是在屏幕内，目前我的配置也仅在于实现手势打开后台（上滑）、打开拍照、锁屏界面打开闪光灯等。

以上全为免费插件，拒绝盗版插件，拒绝盗版源从我做起。

**本文历史**

* 2015 年 07 月 06 日 完成初稿
