---
layout: post
title: Linux 学习笔记 (4)
description: "一直以来都对 Arch Linux 十分向往，而 Arch Linux 硬盘安装是十分折腾的，此次安装栽在安装源的设置，宿舍网络情况并不好，把 iso 文件挂载在 /src 目录下，不行，也还没找到相关信息。这我想起了 Archboot，而无意中却碰到了 ArchBang 这个图形界面的 Live CD。"
category: tech
thumb: 'IMG_PATH/linux.png'
tags: ["Arch Bang", "Arch Linux", Linux, locale, NetworkManager, 小小输入法, 硬盘安装, 笔记]
---

一直以来都对 Arch Linux 十分向往，而 Arch Linux 硬盘安装是十分折腾的，此次安装栽在安装源的设置，宿舍网络情况并不好，把 iso 文件挂载在 /src 目录下，不行，也还没找到相关信息。这我想起了 Archboot，而无意中却碰到了 ArchBang ([主页](http://archbang.org)) 这个图形界面的 Live CD，和 Ubuntu 等发行版一样，Live 环境都提供了安装在硬盘的快捷方式。一切只需点击 Install，这给我这等菜鸟带来多大的方便啊！

ArchBang 的引导和 Arch Linux 一样：

在 Windows 下，提取镜像 /arch/boot/i686 路径的 vmlinuz26 和 archbang.img ( Arch Linux 则是 /boot/ 的 vmlinuz26 和 archlinux.img ) 到 C 盘根目录，并把 iso 文件也放 C 盘根目录。

在 Grub for DOS 的配置文件 menu.lst 里添加一项

    title Install ArchBang
    root   (hd0,0)
    kernel /VMLINUZ26 archisolabel=archiso
    initrd /ARCHBANG.IMG


进入引导进入后会自动检测 /dev/disk/by-label/archiso，用所提供的 shell：

    # mkdir /tmp_mnt
    # mount –r –t vfat /dev/sda1 /tmp_mnt
    # modprobe loop
    # losetup /dev/loop6 /tmp_mnt/ArchBang-2011.02.04-i686.iso
    # ln –s /dev/loop6 /dev/disk/by-label/archiso
    # exit

这下检测就有了，不管是在 Grub 的命令行，还是 Bash，多按 tab 都会有好处的。对于 iso 文件名更是方便，不可能忘了之后去查看文件名再回来输入吧？

进入 Live CD 环境后，右键安装

安装过程和 Arch Linux 差不多，而安装完的系统环境就不是一个基本的系统，而是有着图形界面的环境，SLiM + Openbox + tint2 + Conky 的界面（如图）让鄙人倍感亲切。

[![](http://i951.photobucket.com/albums/ad353/Fooleap/Blog/Fooleap/2011-05-08--1304866398_1024x768_scrot.png)](http://i951.photobucket.com/albums/ad353/Fooleap/Blog/Fooleap/2011-05-08--1304866398_1024x768_scrot.png)

安装后的各种配置

资源占用很低，这完全符合 Arch 哲学极简之道。安装完中文字体和输入法之后，用起来就十分舒服了。Linux 各发行版的不同，最直接的是软件包管理，Debian 系是 DEB，Redhat 系则是 RPM，Arch Linux 则是 Pacman。Pacman 用着特舒服，安装软件只需 pacman -S *，如果没有则可 yaourt -S *，当然在此之前必须确认 yaourt 的安装。一般的常用软件 Pacman 都有，而像国内的 youmoney, yong 这些，就需要 AUR。在 Arch Linux 下，意料之外的是，yong 输入法居然不用手动安装，当然如果手动安装会比较麻烦，不是轻易就可完成。

在英文 locale 下，小小输入法的安装

这方面对我来说有点复杂，我的 locale.gen 文件是这样的：

    en_US.UTF-8 UTF-8
    zh_CN.UTF-8 UTF-8
    zh_CN.GBK GBK

通过 AUR 安装 yong 输入法

    # yaourt -S yong

修改 /etc/gtk-2.0/gtk.immodules

找到 "xim" "X Input Method" "gtk20" "/usr/share/locale" "ko:ja:th:zh"

在 local 添加 en, 即为：

    "xim" "X Input Method" "gtk20" "/usr/share/locale" "en:ko:ja:th:zh"

添加环境变量，鄙人添加到 ~/.profile 文件，当然 ~/.xinitrc 等也可以。

    export LC_CTYPE='zh_CN.utf8'
    export XMODIFIERS="@im=yong"
    export GTK_IM_MODULE="xim"
    export QT_IM_MODULE="xim"

自启动只需将"yong -d &"添加到 Openbox 的 autostart.sh 即可

安装 Grub2

    # pacman -S grub2

自动生成配置文件

    # grub-mkconfig -o /boot/grub/grub.cfg

将 Grub 安装到主引导记录中

    # grub-install /dev/sda

Gtk+ 主题的配置可以使用 Lxappearance 来调整，可直接

    # pacman -S lxappearance

联网

ADSL 连接使用 pppoe-setup, pppoe-start，相对来说比起 Ubuntu 等发行版的 pppoeconf 麻烦了点，不过也就手动设置了 DNS 服务器。

也可以使用熟悉的 nm-applet，官方中文 Wiki 关于 NetworkManager 的说明已不适用，gnome-network-manager 已不在。可参考 [英文 ArchWiki](https://wiki.archlinux.org/index.php/NetworkManager)：

    # pacman -S networkmanager network-manager-applet

切记安装后修改 /etc/rc.conf 文件，如下

在 DAEMONS 这个值中的 networkmanager 前加 @, 即 @networkmanager, 否则 nm-applet 将无法启动

在添加 DSL 连接的时候，要撤选左下角“对所有用户可用”，要不会提示权限不足。

用 NetworkManager 管理连接 vpn pptp ，在添加 vpn 连接时，在高级里勾选 Point To Point，在 Arch 用 VPN 的时候，连接后不用重启浏览器就能浏览网页，而 Ubuntu 却要，这是什么原因？还是此前用 Lubuntu 的时候的配置问题？

    # pacman -S networkmanager-pptp pptpclient

昨天在淘宝上买了本杂志，支付宝控件安装后 Firefox 却没识别到，于是 Google 下

> 支付宝 控件依赖于 libpng12.so.0 最新的 Arch Linux 软件包升级到了 linpng14，这对依赖 libpng12 库的部分应用程式来讲，可能会出现 linpng12.so.0 无法截入的问题。 解决方法也很简单，作一个库文件的软连接即可，如下：
>      ln -s /usr/lib/libpng14.so /usr/lib/libpng12.so.0

Arch Linux 在我的小本上发挥极致，更重要的是 Arch Linux 有着完善的 Wiki，Arch Linux Wiki 太强大了。软件使用有什么不懂，可直接往左侧搜索框直接搜索软件名。

2011 年 5 月 13 日

下午再进入 Arch Linux 原盘的 Live 环境，原来 Arch Linux 原盘的 Live 也有 pppoe 拨号，可以直接通过 pppoe-setup, pppoe-start 来连接网络后，通过网络安装系统，这下子 Arch Linux 的安装搞明白了，退出后看了下 Arch Wiki 也确实记录了这一安装方式，多拜读 Wiki 才是对的！不过也确实很想弄明白 Arch Linux 的硬盘安装方法，安装源到底挂载在哪呢？

**相关资料**

1. [硬盘安装 ArchBang！](http://bbs.wuyou.net/viewthread.php?tid=191789)
2. [Arch Linux Wiki](https://wiki.archlinux.org/index.php/Main_Page)

**注**

1. 这个方法可能有些步骤是多余的，不过鄙人经过这样的配置之后输入法正常使用，所以也不想再折腾
2. 免费 VPN 可参考 [新民智工作室（我是王掌柜）](http://since1989.org/) 文章：[郭嘉的故事](http://since1989.org/internet/tenacy-vpn-free-service.html)

**本文历史**

* 2011 年 05 月 09 日  创建文章
* 2011 年 05 月 11 日  添加 NetworkManager 部分
* 2011 年 05 月 12 日  添加支付宝控件部分
* 2011 年 05 月 13 日  添加 grub2 部分
* 2011 年 05 月 14 日  添加 yong 输入法部分
