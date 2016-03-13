---
layout: post
title: LFTP 镜像功能排除多个文件
description: "昨天在老杨处得知 WordPress 最近更新版本，不过鄙人无意换用博客引擎。今天想想以前弃用 WordPress 时留下一个备份，刚好阿里云的免费虚拟主机，目前仅用于本站的存储，就想在上面再搭个 WordPress，看看以前的备份是否能成功恢复。"
date: 2015-12-10 23:00:00 +0800
thumb: IMG_PATH/lftp.png
category: tech
tags: [LFTP, FTP, mirror]
---

昨天在老杨处得知 WordPress 最近更新版本[[1]][1]，不过鄙人无意换用博客引擎。今天想想以前弃用 WordPress 时留下一个备份，刚好阿里云的免费虚拟主机，目前仅用于本站的存储，就想在上面再搭个 WordPress，看看以前的备份是否能成功恢复。

以前的备份 [内容完美恢复](/old/)，就是所用的主题没有跟着程序的更新而更新，需要修改。此前说过，我是 [使用 LFTP 对博客的镜像进行同步](/server-and-baidu-seo.html)，这下问题来了，此前进行镜像同步的时候命令如下：

    mirror -R --delete _site htdocs --exclude logreport/

最后的 `--exclude` 是排除的参数，意思是 `logreport` 目录不包含在内。我搭在虚拟主机上的 WordPress 是放在一个名为 `old` 的目录里，如何再排除一个目录呢？我试着再后面加上 `old/`

    mirror -R --delete _site htdocs --exclude logreport/ old/

结果呢？执行命令时哗啦啦地将我的 `old` 目录下的文件直删，只好再改了。

    mirror -R --delete _site htdocs --exclude logreport/ --exclude old/

完美，虽然感觉有点多此一举，但完美排除了两个目录。

至于更巧妙的用法，甚至采用正则来排除，还是得看 LFTP 的文档[[2]][2]或者别人的例子[[3]][3]。

此文颇为扯淡，也留下记录以备忘。

## 参考资料

[1]: https://cyhour.com/330 "WordPress 4.4“Clifford”&#038; PHP 7.0 | 常阳时光"
[2]: http://lftp.yar.ru/lftp-man.html "lftp.1"
[3]: http://www.cyberciti.biz/faq/lftp-command-mirror-x-exclude-files-sub-directory-syntax/ "lftp Mirror Command Exclude Matching Files [ Regex ]"

**本文历史**

* 2015 年 12 月 10 日 完成初稿
