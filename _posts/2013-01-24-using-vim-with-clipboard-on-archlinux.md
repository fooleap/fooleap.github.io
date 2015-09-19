---
layout: post
title: "Vim 与系统剪切板交互"
description: "很多时候使用 Vim 编辑文本，总需要复制里面的东西出来，粘贴到其他地方，比如说网页，聊天窗口等等，而有些时候有需要从网页等地方复制文字过来粘贴到 Vim 正在编辑的文件里。"
category: tech
thumb: 'http://7fv9cr.com1.z0.glb.clouddn.com/vim.png'
tags: [Vim, 剪切板, "Arch Linux"]
---

* toc
{:toc}

很多时候使用 Vim 编辑文本，总需要复制里面的东西出来，粘贴到其他地方，比如说网页，聊天窗口等等，而有些时候有需要从网页等地方复制文字过来粘贴到 Vim 正在编辑的文件里。这个两个过程应该怎么完成呢？

## 一般的解决方法

### 复制文本

当我们要将 Vim 里面的文本复制出来，往往会用鼠标选中，然后到需要粘贴的地方小点下鼠标中键或 `Shift` + `Insert`，完成复制粘贴的过程。

但 Vim 设置显示行号，多窗口使用，或者使用 Tmux 这类有利于提高效率的工具的时候，这样选择未必行的通。

这时候，需要鼠标可以选中 Vim 单个窗口且不包含行号的文本，可以使用 `:set mouse=a`，让 Vim 支持鼠标选择，大概事情就可以解决，这样的感觉也挺爽的，赶紧把 `set mouse=a` 加入你的 `.vimrc` 文件：)

### 粘贴文本

当我们在其他地方选择文本后，想粘贴到 Vim，一般都会切换到插入模式点鼠标中键或 `Shift` + `Insert`，完成复制粘贴的过程。

但有些时候，比如说复制在网页一些代码，粘贴时有时会出现不对齐，前面未加注释代码却被加上注释，这样一些恼人的问题。

这时候，可以通过 `:set paste` 将 Vim 设置为粘贴模式后再进行粘贴，既然是两种模式，肯定是有区别的，`:set nopaste` 是返回正常模式。这么干毕竟不方便，可以通过 `.vimrc` 添加映射来解决这个问题，更是有 `set pastetoggle=` 这个方便的选项，若在 `.vimrc` 文件里添加 `set pastetoggle=<F11>`，则 `F11` 为粘贴模式的切换键。


## 比较 Vim 的方法

上述方法，大致可以解决问题，但很多同学并不喜欢用这种方式来复制粘贴，或是喜欢键盘操作的爽快，或是习惯了 Windows 下那套 `Ctrl` + `c`, `Ctrl` + `v`，通过系统剪切板来实现。还有，使用 VirtualBox 的时候，若设置剪切板互通，也是用到系统剪切板。

Vim 不是通过 `Ctrl` + `c`, `Ctrl` + `x`, `Ctrl`  + `v` 来实现复制、剪切、粘贴的，而是通过 `y`, `d`, `p` 这些更为方便的键来实现各种复杂的文本操作。

对于和系统剪贴板的交互，又应该怎么用呢？遇到问题一般第一个寻找的是帮助文档，剪切板即是 Clipboard。

通过 `:h clipboard` 查看帮助，发现里面有一句这样的话

> When using this register under X11, also see x11-selection.
>
> 若在 X11 中使用该寄存器，另见 x11-selection。

顺着思路 `:h x11-selection`，里面详细地介绍了 Vim 提供的使用 X11 主选择缓冲区和剪切板的方法，它们是通过 `"*` 和 `"+` 两个寄存器来实现。

大致可以明白，在 Windows 上只能通过 Clipboard，而可爱的 X11 却还给了我们 Primary，所以有了选中即复制，鼠标中间即粘贴这么神奇的粘贴操作。

在 Vim 里，正常模式下，复制文本到 Clipboard，基本只是在前面加上 `"+`，其他一样，例如

复制当前行

    "+yy 或 "+Y

复制当前行及向下二行

    "+y2j

选择后复制

    Vjj"+y

复制到 Primary 和复制到 Clipboard 差不多，这里就不再详述，而粘贴则是加 `p`，自然还有剪切 `d`。

## 注意事项

需要注意的是，Arch Linux 官方仓库中的 Vim 并不支持以上操作

    $ vim --version | grep clipboard

返回显示 `clipboard` 及 `xterm_clipboard` 前面是减，我们可以安装 gVim 来使 Vim 支持 X

    # pacman -S gvim

也可通过 ABS 这种方便的编译系统，重新编译 Vim

    # pacman -S abs
    # abs extra/vim
    # cp -r /var/abs/extra/vim ~/ && cd ~/vim

修改 PKGBUILD 文件

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>PKGBUILD</code></pre>
<pre style="margin-top: 0; border-top: 1px dashed #ddd; padding-top:8px;"><code>...
pkgname=('vim'<del> 'gvim' 'vim-runtime'</del>)
# 去除不需要编译的包
# 至于编译依赖，不了解可以像我一样选择不取消
...
--with-x=<del>no</del>yes \
# 把 Vim 编译选项中 --with-x 的 no 改为 yes
...
</code></pre>

编译并创建包

    $ makepkg -s

安装 Vim

    # pacman -U vim-7.3.754-1-x86_64.pkg.tar.xz

重新进行验证，果然生效

## 参考资料

* [Copy and paste from the system clipboard with vim](http://maxolasersquad.blogspot.com/2012/01/copy-and-paste-from-system-clipboard.html)
* [X Selections, Cut Buffers, and Kill Rings.](http://www.jwz.org/doc/x-cut-and-paste.html)
* [Arch Build System](https://wiki.archlinux.org/index.php/Arch_Build_System)

**本文历史**

* 2013 年 01 月 24 日 完成初稿
