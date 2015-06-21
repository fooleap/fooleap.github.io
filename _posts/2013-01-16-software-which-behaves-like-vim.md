---
layout: post
title: 几款 Vi 操作方式的软件 / 插件
description: "Vim 是编辑器之神，和 Emacs 有并列的关系，它的操作方式影响了好多 Linuxer，当然也不乏使用 Windows 之人士，如 xbeta 等。便捷高效的操作是它最吸引人的地方，还有很多扩展，如 VimIM 这样 Cool 的插件层出不穷，还有神奇的应用，如 Vim 也是个播放器。"
category: tech
tags: [Vim, Apvlv, Pentadactyl, Vifm, Vimium, Vimperator]
---

Vim 是编辑器之神，和 Emacs 有并列的关系，它的操作方式影响了好多 Linuxer，当然也不乏使用 Windows 之人士，如 [xbeta](http://xbeta.info) 等。便捷高效的操作是它最吸引人的地方，还有很多扩展，如 VimIM 这样 Cool 的插件层出不穷，还有神奇的应用，如 [Vim 也是个播放器](http://qixinglu.com/archives/vim_is_ascii_player)。

如此高效率的操作方式使模仿其的其它软件不少，有 Firefox 插件 Vimperator/Pentadactyl，有 Chrome 插件 Vimium，有文件管理器 Vifm，还有 PDF 阅读器 Apvlv。就是装逼，就我学习使用 Vim 这几十天的感受，vim 的操作方式的高效也是毋庸置疑的

Vimperator/Pentadactyl

Vimperator 官网：[http://vimperator.org/](http://vimperator.org/)
Pentadactyl on sf.net:[http://dactyl.sourceforge.net/](http://dactyl.sourceforge.net/)

首先当然是 Firefox 之个人必备神器 Vimperator/Pentadactyl，它的知名度也应该是这几款类 Vim 操作方式软件中最高的。我是看了 [这篇文章](http://xbeta.info/vimperator.htm) 之后试用的，直接使用 Pentadactyl，没想到试用之后明显离不开它，它是我 Firefox 第一款必备的插件。装完之后自动隐藏菜单栏地址栏等不需要的模块，使用 4 以上的 Firefox 就完美了，因为左上角有个很帅的按钮。

用 o 和 t 打开网页和新建 tab 打开网页的方式实在比平常用鼠标去点来得更快一些，虽然可以用快捷键，但远不及它。定义 rc 用快捷键打开常用网页更是方便，总之，是一款十分不错的 Firefox 扩展。从 Vimperator 官网可看出该团队还有另外两款 Vim 操作模式的插件，适用于 Songbird 的 Xulmus，还有适用于 Thunderbird 的 Muttator，用兴趣的同学可以试试。

Vimium

Vimium on GitHub:[http://vimium.github.com/](http://vimium.github.com/)

Chrome 在界面上比 Firefox 更加友好，简洁快速深得人心。但这款适用于 Chrome 的插件，在功能上明显比 Vimperator 要弱很多，不过日常的使用已足够。使用 vim 最舒服的应该是，在操作上，手指基本不用离开主键盘，是键盘党的必需品。

Vifm

Vifm on sf.net:[http://vifm.sourceforge.net/](http://vifm.sourceforge.net/)

这是一款命令行下的文件管理器，我觉得用 vim 的同时使用它来管理文件是最适合不过了，对于程序员来说十分方便~目前正在熟悉中……

Archlinux 可通过 pacman 安装

    # pacman -S vifm

Apvlv

Apvlv on Google Code:[http://code.google.com/p/apvlv/](http://code.google.com/p/apvlv/)

这是一款国人开发的 pdf 阅读软件，还支持手机电子书格式 UMD 的读取。类 Vim 的操作方式是它最大的亮点，但它确实没有 Foxit Reader 等 pdf 阅读软件优秀，喜欢 vim 的同学可以试试。

Archlinux 可通过 AUR 安装

    # yaourt -S apvlv

下面是截图

[![Vim for Firefox](http://i951.photobucket.com/albums/ad353/Fooleap/Blog/Fooleap/vim-for-firefox.png)](http://i951.photobucket.com/albums/ad353/Fooleap/Blog/Fooleap/vim-for-firefox.png)

[![Vifm](http://i951.photobucket.com/albums/ad353/Fooleap/Blog/Fooleap/vifm.png)](http://i951.photobucket.com/albums/ad353/Fooleap/Blog/Fooleap/vifm.png)

[![Apvlv](http://i951.photobucket.com/albums/ad353/Fooleap/Blog/Fooleap/apvlv.png)](http://i951.photobucket.com/albums/ad353/Fooleap/Blog/Fooleap/apvlv.png)

这几款软件 / 插件，有着 vim 的优秀操作方式，更有如同 vimrc 的配置文件。使用 vim 最重要的还是配置文件。vimrc，因为它是定制 vim 更加符合自己使用的一种工具，Vimperator/Pentadactyl,Vimium,Vifm,Apvlv 同样有 rc 配置文件，Vimperator/pentadactyl 的配置文件能让你更加舒服地使用 Firefox，比如说定制复制粘贴的按键。

**本文历史**

2011 年 05 月 29 日 完成初稿
2013 年 01 月 16 日
