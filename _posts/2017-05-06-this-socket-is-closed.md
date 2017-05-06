---
layout: post
title: "解决 This socket is closed 问题"
description: "昨天，跟往常一样，修改 JS 后在 cmd 运行 `webpack -pw`，可惜没有运行成功，而是抛出了个错误。"
date: 2017-05-06 12:27:00+0800
thumb: IMG_PATH/nodejs.svg
category: tech
tags: ["Node.js","webpack"]
---

昨天，跟往常一样，修改 JS 后在 cmd 运行 `webpack -pw`，可惜没有运行成功，而是抛出了个错误。

具体的错误如下: 

```
G:\blog>webpack -pw
events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: This socket is closed
    at WriteStream.Socket._writeGeneric (net.js:679:19)
    at WriteStream.Socket._write (net.js:730:8)
    at doWrite (_stream_writable.js:331:12)
    at writeOrBuffer (_stream_writable.js:317:5)
    at WriteStream.Writable.write (_stream_writable.js:243:11)
    at WriteStream.Socket.write (net.js:657:40)
    at Console.log (console.js:43:16)
    at processOptions (C:\Users\Administrator\AppData\Roaming\npm\node_modules\webpack\bin\webpack.js:357:11)
    at Object.<anonymous> (C:\Users\Administrator\AppData\Roaming\npm\node_modules\webpack\bin\webpack.js:363:1)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:390:7)
    at startup (bootstrap_node.js:150:9)
    at bootstrap_node.js:505:3
```

看上去可能是 webpack 的问题，也可能是 Node.js 的问题。发现如果不带 `watch`，则不会出错。

不管三七二十一，Google 先。以前半部分为关键词，搜索到的结果各式各样，重装 Node.js 等等都有，折腾半天依然解决不了这个问题。我尝试以 `This socket is closed` 为关键词进行搜索，同病相怜的人真不少。最后终于在 npm 项目的一条 issue 里，找到了或许是答案的回复[[1]][1]。

What？可能跟 cmd 窗口宽度有关？仔细想想，前一天我确实改变了 cmd 窗口的大小，马上改改试试。可是无论我怎么改，都无用，还是一样的出错。

我又回想前一天，因装了 `jekyll-autoprefixer` 这个插件，运行 jekyll 出错。而将 cmd 编码设置为 utf8，也就是 `chcp 65001` 后搞定问题。或许跟这个有关，于是我小心翼翼地运行 `chcp 936`，再尝试运行，没出错，问题就这样解决了。

难道这又是 Windows 莫名其妙的编码问题？？

## 参考资料

[1]: https://github.com/npm/npm/issues/12887#issuecomment-222525339 "&quot;Error: This socket is closed&quot; when running any npm command · Issue #12887 · npm/npm"

**本文历史**

* 2017 年 05 月 06 日 完成初稿
