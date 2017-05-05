---
layout: post
title: "解决 This socket is closed 问题"
description: ""
date: 2017-05-05 08:00:00+0800
thumb: IMG_PATH/nodejs.svg
category: tech
tags: ["Node.js","webpack"]
---

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
