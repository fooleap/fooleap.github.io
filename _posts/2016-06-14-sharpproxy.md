---
layout: post
title: 手机端调试 ASP.NET 网站
description: "公司之前一个项目是采用 ASP.NET 开发，第一次使用 Visual Studio 写代码，感觉挺好用的说。然而，在调试时，有一个问题困扰了我，就是无法在手机预览调试。"
date: 2016-06-14 17:50:00+0800
thumb: IMG_PATH/.net.png
category: tech
tags: ["SharpProxy", "ASP.NET", "移动端"]
---

公司之前一个项目是采用 ASP.NET 开发，第一次使用 Visual Studio 写代码，感觉挺好用的说。然而，在调试时，有一个问题困扰了我，就是无法在手机预览调试。

同在一个局域网的手机并不能通过 IP 直接访问到本地网站，在 PC 端也仅能使用类似 `http://localhost:15002/` 这样的地址访问，如果采用 `http://127.0.0.1:15002/` 或者本机局域网地址来访问的时候，则显示 400 错误。

移动端网站无法采用手机来调试，真的挺麻烦的，毕竟电脑上没法提供真实手机环境，尤其是 iOS。我相信一定很多人跟我一样碰到这个问题，先用 Google 搜搜看有木有解决方法，是否通过设置即可解决。

通过搜索，我发现了一篇文章[[1]][1]，找到了作者制作并开源一个好用的小工具——SharpProxy[[2]][2]。

作者的需求跟我一模一样，是为了手机能够访问通过 Visual Studio 创建的本地开发服务器。于是呢，小工具就刚好适用。

小工具需要 .NET 4.0 framework 的环境，使用起来很简单，先让手机位于同 PC 一样的局域网内，设置一个外部端口（External Port），一个内部端口（Internal Port），猛戳开始（Start）即可。

外部端口自定义，只要没被占用的端口都可以使用；内部端口即项目设置的端口，例如上面的 `15002`。

![SharpProxy]({{site.IMG_PATH}}/sharpproxy-01.png)
SharpProxy

开启之后，之前提及的 `http://127.0.0.1:15002/` 及局域网地址 `http://10.0.0.30:150002/` 均能访问，手机端当然是采用局域网地址访问该网站。

浏览其项目时发现有人 Fork 并增加显示外部地址二维码的功能[[3]][3]，也就是说手机访问可以直接通过扫码，这样使用起来就更加方便了。

![带二维码的 SharpProxy]({{site.IMG_PATH}}/sharpproxy-02.png)
带二维码的 SharpProxy

带二维码的 SharpProxy，这里传一个，下载地址： [SharpProxy.zip]({{site.IMG_PATH}}/SharpProxy.zip)

当然其他解决方法应该还不少[[4]][4]，而鄙人就感觉这个小工具挺方便的，无需改配置。

## 参考资料

[1]: http://www.codefromjames.com/wordpress/?p=97 "Test and debug your ASP.NET sites on iPhone / iOS, Android, and other mobile devices locally with SharpProxy"
[2]: https://github.com/jocull/SharpProxy "jocull/SharpProxy"
[3]: https://github.com/mjbrusso/SharpProxy "mjbrusso/SharpProxy"
[4]: http://blog.csdn.net/qiujuer/article/details/40350385 "[环境搭建] VS-Visual Studio-IIS Express 支持局域网访问"
