---
layout: post
title: "安装 Fcitx 输入法，使用小鹤双拼"
description: "为了提高中文打字速度，从 2010 年开始使用双拼输入法。双拼，顾名思义，所有音节都只需输入 2 键，即所有汉字只需按两个键。虽然“音码 + 形码”更能提高打字速度，图个方便就没有使用这种方式，仅仅是纯双拼。起初使用自然码双拼方案，后来换为小鹤双拼。"
thumbnail: "http://pic.yupoo.com/fooleap_v/CEHdpz1L/small.jpg" 
category: tech
tags: [Fcitx, 小鹤, 输入法, 双拼, Linux, ArchLinux]
---

为了提高中文打字速度，从 2010 年开始使用双拼输入法。双拼，顾名思义，所有音节都只需输入 2 键，即所有汉字只需按两个键。虽然“音码 + 形码”更能提高打字速度，图个方便就没有使用这种方式，仅仅是纯双拼。起初使用自然码双拼方案，后来换为小鹤双拼。

在 Linux 下使用双拼很方便，目测当前中文输入法使用量最多的是 Fcitx，即小企鹅输入法。下面就一起来聊聊 Arch Linux 上怎么安装 Fcitx 输入法，使用小鹤双拼。

首先使用 Pacman 安装 Fcitx 输入法

    # pacman -S fcitx

配置环境变量并设置自启动，由于使用 xim 输入模块会导致 Firefox 无法弹出菜单，于是把 Gtk 及 Qt 的输入法模块都换成 Fcitx 自己的，安装上相应的包

    # pacman -S fcitx-gtk2 fcitx-gtk3 fcitx-qt

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>~/.xinitrc</code></pre>
<pre style="margin-top: 0; border-top-style:dashed; padding-top:8px;"><code>export XMODIFIERS="@im=fcitx"
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
fcitx&</code></pre>

运行以初始化配置

    $ fcitx

我们可以注意到 Fcitx 的用户配置在 ~/.config/fcitx，进入这个目录，忽略大小写搜索“ xiaohe ”这个字符串

    $ cd ~/.config/fcitx
    $ grep -ir xiaohe
    conf/fcitx-pinyin.config:# Ziranma MS Ziguang ABC Zhongwenzhixing PinyinJiaJia XiaoHe User Defined

返回结果显示 conf/fcitx-pinyin.config 这个文件有 XiaoHe 这个字符串，也看到其他的双拼方案名称，基本上确定可以在此配置双拼方案，编辑这个文件

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>~/.config/fcitx/conf/fcitx-pinyin.config</code></pre>
<pre style="margin-top: 0; border-top-style:dashed; padding-top:8px;"><code>#DefaultShuangpinSchema=Ziranma
# 注意到如上一行，可以看到默认是自然码，取消注释并设置为小鹤
DefaultShuangpinSchema=XiaoHe</code></pre>

重启输入法即可

若你使用的是全拼，建议安装 Google 拼音( fcitx-googlepinyin )支持，网络状况尚可使用云拼音词库( fcitx-cloudpinyin )也是不错的

使用了双拼两年，效率确实比全拼输入法快点，推荐使用。首先记忆键位放一张键位对应表在旁边，坚持使用下去没几天便会熟悉习惯，熟练之后就是条件反射了。

关于双拼，还有这么一个故事：

[还有一分钟生日结束，转发一帖许个愿：我的生日愿望是获得网友资助的 iPhone 5 和 iOS 开发者账号](http://www.v2ex.com/t/57484)

可见双拼是相当不错的，祝 undozen 早日完成开发～


**参考资料**

* [Fcitx (简体中文) - ArchWiki](https://wiki.archlinux.org/index.php/Fcitx_\(简体中文\))
* [Fcitx - 维基百科](http://zh.wikipedia.org/zh-cn/FCITX)
* [小企鹅输入法 (Fcitx)](http://fcitx-im.org/)
* [fcitx - A Flexible Input Method Framework](https://code.google.com/p/fcitx/)
* [Fcitx at GitHub](https://github.com/fcitx)

**本文历史**

* 2013年02月20日 完成初稿
