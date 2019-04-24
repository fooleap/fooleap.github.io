---
layout: post
title: Electron 中打开 QQ 临时会话 
date: 2019-04-24 21:11:09+0800
thumb: IMG_PATH/electron.svg
category: tech
tags: [Electron, QQ]
---

Electron [[1]][1]允许通过编写网页来构建桌面程序，使得开发桌面软件变得异常轻松，各类通过 Electron 开发的软件层出不穷。此文主要针对网页里的 QQ 临时会话按钮，使用 Electron 应该如何优雅地操作呢？

## QQ 临时会话

虽然我现在已经很少上 Q，但不得不说，QQ 临时会话是很方便的一个功能。它允许在网页里添加一条链接点击直接弹出 QQ 会话。

可直接在 QQ 推广[[2]][2]中登录并生成链接，格式如：

```{% raw %}
http://wpa.qq.com/msgrd?v=3&uin={{uin}}&site=qq&menu=yes
{% endraw %}```

若是在网页中引入，可直接加上新窗口打开但属性，如：

```html
<a href="http://wpa.qq.com/msgrd?v=3&uin=10000" target="_blank">QQ 交谈</a>
```

又或者可以直接使用 tencent 协议的链接来发起临时会话，链接如 `tencent://message/?uin=10000`，则 HTML 如下：

```html
<a href="tencent://message/?uin=10000" target="_blank">QQ 交谈</a>
```

## Electron 与 QQ 临时会话

在 Electron 中，如若直接采用网页中的方式，点击链接将会在新的窗口中打开，而且你无法控制它，这明显不是我们想要的。

Electron 有个 shell[[3]][3] 模块，可提供使用默认浏览器中打开链接的功能，如：

```javascript
const { shell } = require('electron')
shell.openExternal('tencent://message/?uin=10000')
```

这个体验比起第一种要好一些，但明显也不是我们想要的。如果能静默打开链接，达到直接弹出 QQ 会话，这个体验就比较好。这就需要用到 Electron 的 window.open 函数[[4]][4]，熟面熟面，其实可以说就是浏览器中的 window.open [[5]][5]。

倘若按照默认方式弹出新的 BrowserWindow，那么与第一种方式效果无异，可以自动将窗口关掉，也即：

```javascript
const chat = window.open('tencent://message/?uin=10000')
setTimeout(()=>{
    chat.close()
},2000)
```

我们需要隐藏掉这个新创建的 BrowserWindow，按照 window.open 文档最底部的说法，定制弹出的新窗口。可直接将 `show` 选项设置为 `false` 达到隐藏效果，如下：

```javascript
// main process
const win = new BrowserWindow()
win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'chat') {
    Object.assign(options, {
      modal: true,
      parent: win,
      show: false 
    })
    event.newGuest = new BrowserWindow(options)
  }
})
```

五秒后关闭这个隐藏的窗口。

```javascript
// renderer process
const chat = window.open('tencent://message/?uin=10000', 'chat')
setTimeout(()=>{
    chat.close()
},5000)
```

## 参考资料

[1]: http://electronjs.org "Electron &#124; 使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用。"
[2]: https://shang.qq.com/v3/widget.html "QQ 推广"
[3]: https://electronjs.org/docs/api/shell "shell &#124; Electron"
[4]: https://electronjs.org/docs/api/window-open "window.open 函数 &#124; Electron"
[5]: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open "window.open - Web API 接口参考 &#124; MDN"



**本文历史**

* 2019 年 04 月 24 日 完成初稿

[p1]: {{ site.IMG_PATH }}/use-a-non-monospace-font-in-gvim-01.png "使用 Zpix C.O.D.E 的 gVim"
