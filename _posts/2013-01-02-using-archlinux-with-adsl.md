---
layout: post
title: "Arch Linux 下的 ADSL 拨号上网"
description: "前几天拉了网，普通的 ADSL 宽带，由于没有路由器，因此只能通过自身的拨号。在 Arch Linux 下，可以通过自带的 Netcfg 来连接，可以通过 RP-PPPoE 来连接，也可直接配置 pppd 实现拨号。"
thumbnail: "http://pic.yupoo.com/fooleap_v/CCpuJG8L/small.jpg"
category: tech
tags: [ArchLinux, ADSL, Netcfg, RP-PPPoE, pppd]
---

前几天拉了网，普通的 ADSL 宽带，由于没有路由器，因此只能通过自身的拨号。

在 Arch Linux 下，可以通过自带的 Netcfg 来连接，可以通过 RP-PPPoE 来连接，也可直接配置 pppd 实现拨号。

###Netcfg###

这款软件，从它需要安装，到 Arch 自带，功能不断地增强，使用越来越方便，现在已经支持 ADSL 拨号，简单快速。

从实例中复制 pppoe 作为 adsl 拨号的配置

    # cp /etc/network.d/examples/pppoe /etc/network.d/fooleap

只需修改这两行中的用户名和密码

<pre style='margin-bottom: 0; border-bottom:none; padding-bottom:8px;'><code>/etc/network.d/fooleap</code></pre>
<pre style='margin-top: 0; border-top-style:dashed; padding-top:8px;'><code>USER='example@yourprovider.com'
PASSWORD='very secret'</code></pre>

尝试拨号

    # netcfg fooleap


添加守护进程实现自动联网

    # systemctl enable netcfg@fooleap

###RP-PPPoE###

安装 rp-pppoe

    # pacman -S rp-pppoe

启动配置程序，按提示，一般填上用户名、密码、 DNS 服务器即可

    # pppoe-setup

拨号

    # pppoe-start

作为守护进程启动

    # systemctl enable adsl

注：若在 pppoe-setup 没有设定 DNS 服务器，记得手动搞定 /etc/resolv.conf

###pppd###

仔细观察，不难发现，通过 Netcfg 及 RP-PPPoE 拨号后，都是启用了 pppd 进程，所以 Netcfg、RP-PPPoE 只是配角，提供自动化脚本方便使用 pppd，真正的主角是 pppd，手动配置 pppd 理论上更省资源。

在 /etc/ppp/peers 这个目录下创建一个文件，如 fooleap，内容如下，其实一般只需改“帐号”，即宽带帐号

<pre style='margin-bottom: 0; border-bottom:none; padding-bottom:8px;'><code>/etc/ppp/peers/fooleap</code></pre>
<pre style='margin-top: 0; border-top-style:dashed; padding-top:8px;'><code>plugin rp-pppoe.so
# 不需要安装 rp-pppoe 这个包
eth0
name "帐号"
usepeerdns
persist
defaultroute
hide-password
noauth</code></pre>

编辑 /etc/ppp/pap-secrets

<pre style='margin-bottom: 0; border-bottom:none; padding-bottom:8px;'><code>/etc/ppp/pap-secrets</code></pre>
<pre style='margin-top: 0; border-top-style:dashed; padding-top:8px;'><code>"帐号" * "密码"</code></pre>

pap-secrets 文件的权限设为 600

    # chmod 600 /etc/ppp/pap-secrets

拨号，只需使用 pppd call your_provider，your_provider 即刚创建于 /etc/ppp/peers 下的文件名，此例中是

    # pppd call fooleap

若没有连上，检查 eth0 端口有没激活

    $ ifconfig eth0 | grep UP

没返回即没被激活，可以使用下面命令激活 eth0 端口

    # ifconfig eth0 up

连接也可以使用 pon ( 这脚本藏在 /usr/bin/pon )

    # pon fooleap

断开连接可以使用 poff

    # poff fooleap

也可以直接 kill 它

    # killall pppd

做软链接 /etc/ppp/peers/provider，就可以直接通过 pon 这个命令拨号，断开链接也就可以直接使用 poff 啦

    # ln -s /etc/ppp/peers/fooleap /etc/ppp/peers/provider

设置为守护进程

自动加载 ppp_generic 模块

    # echo "ppp_generic" > /etc/modules-load.d/ppp.conf

添加守护进程

    # systemctl enable ppp@fooleap

注：可以用 systemd 将激活端口及拨号作为守护进程，实现自动拨号，参考 [systemd 初体验](http://www.linuxsir.org/bbs/thread382947.html)

鄙人折腾了许久，还是没成功，不知道是 Arch 和 Gentoo 有区别，还是哪里出现问题，搞定告知哈～

**参考资料**

* pppd: [https://wiki.archlinux.org/index.php/pppd](https://wiki.archlinux.org/index.php/pppd)
* Direct Modem Connection: [https://wiki.archlinux.org/index.php/Direct_Modem_Connection](https://wiki.archlinux.org/index.php/Direct_Modem_Connection)

**本文历史**

* 2013年01月02日 完成初稿
