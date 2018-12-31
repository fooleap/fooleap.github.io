---
layout: post
title: 在 gVim 中使用“非等宽字体”
date: 2018-12-31 19:50:47+0800
thumb: IMG_PATH/vim.svg
category: tech
tags: [Vim, gVim, 非等宽字体, FontForge, Zpix]
---

gVim 默认不支持非等宽字体，使得在 Windows 下编程中文字体的选择少很多。让我郁闷的是，有些字体明明是等宽的，在其他编辑器里使用好好的，却也没法在 gVim 中使用。到底应该怎么做，才能在 gVim 中用上喜欢而又用不了的字体呢？

gVim 是根据字体 Panose 中的 proportion 是否为 “Monospaced” 来判断等宽字体，而有些等宽字体在 Panose 的属性却不是等宽的，故无法在 gVim 中使用。

解决思路大体上有俩个：

1. 改 gVim，使 gVim 支持非等宽字体
2. 改字体属性，让 gVim 觉得它是等宽字体

第一种方案需要自己定制编译 gVim，或者直接使用第三方编译的 gVim 即可。鄙人很是念旧，一款软件一旦习惯，很难改变，尤其是文本编辑器这种日常必备的东西。废话这般多，怎么有种感觉这是要换编辑器呢？虽然第三方编译的 gVim 区别并不大，但我嫌麻烦，还是喜欢最新的官方版。

那只能选择第二种方案，就是改字体。一直感觉字体编辑软件很深奥、很复杂的样子，事实上就改个属性而言并不难，随手一搜便有了教程[[1]][1]。使用开源的字体编辑软件 FontForge[[2]][2]，仅需几步，便可让字体有了等宽的属性。

1. 使用 FontForge 打开所需编辑的字体文件（ttf）
2. 菜单操作 Element -> Font Info
3. 切换标签 OS/2 -> Panose
4. 更改 Proportion 项为 Monospaced 并确定
5. 生成字体 File -> Generate Fonts

使用 Windows 的文本编辑器，我喜欢使用点阵字体，看起来特别清晰，偏爱 SolidZORO 的 Zpix（最像素）[[3]][3]这款字体。

![使用 Zpix C.O.D.E 的 gVim][p1]

在 Vim 我用 Zpix C.O.D.E[[4]][4]，感觉良好。

## 参考资料

[1]: https://groups.google.com/forum/#!msg/vim_use/PWz-m0PybSQ/Qll_bUz5QFMJ "how to use non-monospaced font? (win32)"
[2]: https://fontforge.github.io "FontForge Open Source Font Editor"
[3]: https://github.com/SolidZORO/zpix-pixel-font "SolidZORO/zpix-pixel-font"
[4]: https://www.v2ex.com/t/2259 "Zpix C.O.D.E 面向程序员的点阵字体"


**本文历史**

* 2018 年 12 月 31 日 完成初稿

[p1]: {{ site.IMG_PATH }}/use-a-non-monospace-font-in-gvim-01.png "使用 Zpix C.O.D.E 的 gVim"
