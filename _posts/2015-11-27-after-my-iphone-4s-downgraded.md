---
layout: post
title: 记在 iPhone 4s 降级之后
description: "iPhone 4s 滚回 iOS 6 后，用习惯 iOS 7/8 的我感觉还是稍不适，所以选择越狱装插件。"
date: 2015-11-27 16:20:00 +0800
thumb: IMG_PATH/ios6.png
category: tech
tags: [iPhone, "iOS 6", "iPhone 4s", "越狱", "插件", "p0sixspwn"]
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


## 安装的软插件

越狱之后，我装了那些插件？

|    插件   |    源    |  说明  | 
|-----------|----------|--------|
|[AccountChanger](cydia://package/kr.typostudio.accountchanger)|BigBoss|在 App Store 快速切换 Apple ID|
|[Activator](cydia://package/libactivator)|BigBoss|手势增强|
|[Actual Battery](cydia://package/com.pw5a29.actualbattery)|ModMyi|显示实际电量|
|[AdBlocker (iOS 3 - 7)](cydia://package/com.yllier.blocker)|BigBoss|屏蔽广告（收费），不知是否自己不会用，较贵|
|[AltKeyboard (iOS 6)](cydia://package/com.a3tweaks.altkeyboard)|BigBoss|滑动式快捷输入数字/符号（收费）|
|[AntiTint](cydia://package/com.rpetrich.antitint)|BigBoss|让 iOS 6 保持黑色状态栏|
|[AppSync](cydia://package/com.linusyang.appsync)|[YangRepo](cydia://url/https://cydia.saurik.com/api/share#?source=http://yangapp.googlecode.com/svn/)|ipa 补丁|
|[Ayecon (iOS 5 & 6)](cydia://package/org.thebigboss.ayecon)|BigBoss|主题（收费）|
|[BatteryPeek](cydia://package/me.qusic.batterypeek)|BigBoss|手势显示电池百分比，配合 Activator|
|[BrightVol](cydia://package/ws.hbang.brightvol)|BigBoss|切换音量、亮度调节，配合 Activator|
|[<s>Burst Mode</s>](cydia://package/org.thebigboss.burstmode)|BigBoss|照相连拍|
|[f.lux](cydia://package/org.herf.flux)|Telesphoreo|自动调节屏幕色温（[官网](https://justgetflux.com/)）|
|[f.lux Flipswitch](cydia://package/miktr.switch.flux)|BigBoss|配合 Activator 使用|
|[Five Icon Dock](cydia://package/com.saurik.iphone.fid)|Telesphoreo|Dock 栏五个图标|
|[Five Icon Switcher](cydia://package/com.chpwn.five-icon-switcher)|Telesphoreo|后台五个图标（其实可以设置 1 - 10）|
|[Five-Column SpringBoard](cydia://package/net.r-ch.fcsb)|ModMyi|主菜单五列图标|
|[InstaSnap](cydia://package/com.ravirajm.instasnap)|ModMyi|通知中心快速启动 Instagram 拍照界面|
|[KuaiDial](cydia://package/kuaidial-beta)|[kuaidial](cydia://url/https://cydia.saurik.com/api/share#?source=http://kuaidial.googlecode.com/svn/deb)|号码归属地|
|[LastApp](cydia://package/jp.ashikase.lastapp)|BigBoss|快速切换上一个 app，配合 Activator|
|[LiveClock](cydia://package/liveclock)|BigBoss|实时时钟图标|
|[MultiIconMover](cydia://package/jp.ashikase.multiiconmover)|BigBoss|同时移动多个 app|
|[NCSettings](cydia://package/com.jamied360.ncsettings)|ModMyi|通知中心开关|
|[NetworkList](cydia://package/me.qusic.networklist)|BigBoss|查看已保存的 WiFi 及密码|
|[No keyboard Spotlight](cydia://package/com.itaysoft.nokeyspotlight)|BigBoss|Spotlight 界面不自动跳出键盘|
|[NoNewslsGoodNews](cydia://package/com.rpetrich.nonewsisgoodnews)|BigBoss|隐藏报刊杂志图标|
|[OpenNotifier](cydia://package/com.n00neimp0rtant.opennotifier)|ModMyi|自定义状态栏通知|
|[OpenSSH](cydia://package/openssh)|Telesphoreo|SSH 服务|
|[OSLite](cydia://package/bluecocoa.oslite)|BigBoss|清理缓存|
|[PasswordPilot](cydia://package/com.filippobiga.passwordpilot)|BigBoss|自动填充 AppStore 密码|
|[Poof](cydia://package/com.bigboss.poof)|BigBoss|隐藏图标，配合 Activator|
|[PreferenceOrganizer 2](cydia://package/net.angelxwind.preferenceorganizer2)|[Karen's Pineapple](cydia://url/https://cydia.saurik.com/api/share#?source=http://cydia.angelxwind.net/)|自动归类设置里的插件和应用|
|[Pull To Dismiss](cydia://package/com.rpetrich.pulltodismiss)|BigBoss|下滑关闭键盘|
|[RecordMyScreen (Tweak)](cydia://package/org.coolstar.recordmyscreentweak)|BigBoss|录制屏幕|
|[ShadowSocks](cydia://package/com.linusyang.shadowsocks)|BigBoss|科学上网利器|
|[ShadowSocks Per-App Plugin](cydia://package/com.linusyang.ssperapp)|BigBoss|设置程序内代理|
|[Speed Intensifier](cydia://package/com.pw5a29.speedintensifier)|[pw5a29](cydia://url/https://cydia.saurik.com/api/share#?source=https://pw5a29.github.io/)|加快动画|
|[Speedy Homey](cydia://package/com.pw5a29.speedyhomey) |ModMyi|屏蔽双击 Home 键，配合 Activator|
|[SPi](cydia://package/com.gviridis.spi)|BigBoss|原生双拼输入法，可免费试用 7 天|
|[SpringFlash](cydia://package/com.springflash)|BigBoss|打开闪光灯，配合 Activator|
|[SwipeNav](cydia://package/me.devbug.swipenav)|BigBoss|滑动返回|
|[SwipeSelection](cydia://package/com.iky1e.swipeselection)|[pw5a29](cydia://url/https://cydia.saurik.com/api/share#?source=https://pw5a29.github.io/)|方便移动光标，可在键盘区域滑动|
|[SwitcherCleaner](cydia://package/jp.r-plus.switchcleaner)|BigBoss|快速关闭程序，配合 Activator|
|[WeatherIcon 6](cydia://package/com.dba-tech.weathericon)|ModMyi|实时天气图标|
|[WeChat for OpenNotifier](cydia://package/com.modmyi.wechatforopennotifier)|ModMyi|配合 OpenNotifier 显示微信图标|
|[微信无限小视频](cydia://package/com.oopswxlongvideo)|BigBoss|拍摄超过 6 秒小视频，6.1.5 完美|
|[<s>WI-InputMethod</s>](cydia://package/wiim-iphone)|[wiim](cydia://url/https://cydia.saurik.com/api/share#?source=http://cydia.myrepospace.com/wiim/){:title="不知为何，添加了并没有发现 for iPhone 的包"}|WI 输入法（[deb 文件](http://www.wicld.com/down_load/ios/WIInputMethod-ios-2.1-1413.deb)）|
|[WinterBoard](cydia://package/winterboard)|Telesphoreo|主题管理|
|[Yahoo!Weather is Better](cydia://package/com.ba.yahooweatherisbetter)|BigBoss|雅虎天气取代内置天气|

在已越狱装有 Cydia 的 iPhone 中可直接点击插件名链接进行安装，点击源链接添加源。`*.deb` 文件可以使用 [iFunbox](http://www.i-funbox.com/) 移入手机安装。

不少插件有可替代的类似插件，值得一提的是 Activator，这款插件让我有了 [webOS](/small-but-complete.html) 的感觉，虽然手势范围仅在屏幕内。

鄙人插件均为正版，不装 XX 助手、拒绝盗版插件，远离盗版源从我做起。

**本文历史**

* 2015 年 07 月 06 日 完成初稿
* 2015 年 07 月 08 日 修改排版，完善列表
* 2015 年 11 月 27 日 更新一部分插件
