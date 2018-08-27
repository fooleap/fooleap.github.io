---
layout: post
title: "7-Zip 压缩排除特定目录"
date: 2017-06-23 14:00:00+0800
thumb: IMG_PATH/7zip.svg
category: tech
tags: ["7-Zip", "node_modules"]
---

在 Windows，我一直使用 7-Zip 压缩文件，压缩格式则常常选择比较通用的 zip。那么 7-Zip 怎么在压缩时排除特定的文件夹，使其不包括在内呢？最近需要用到，在此记录一下。

最近使用 npm 比较多，安装相关依赖的模块很方便，但在项目目录下会有个 `node_modules` 文件夹，里面随随便便就会有超多的文件。有些时候需要压缩打包项目文件夹时，就不希望把它也包括在内了，且若不排除它，压缩时可能还会出错。既不想在项目目录下压缩，总不能压缩时都把它给删了。

也许看看压缩工具，能否在压缩时排除掉，是比较方便的解决方法。在 7-Zip GUI 工具下，并没有找到相关的设置。查看帮助文件，找到了命令行版本有个相关的 switch '-x' (Exclude filenames)[[1]][1]。

语法看着不大明白，但对照例子，照葫芦画瓢总该可以。压缩文件时，排除特定目录的解决方法如下：

例如当前目录下有 foo 这个目录，其结构是这样的

```bash
$ tree
.
`-- foo
    |-- bar
    |   `-- hello.txt
    |   `-- world.txt
    `-- hello.txt

2 directories, 3 files
```

排除 bar 目录，则

    7z a foo.7z foo -x!foo\bar

排除 foo/hello.txt 文件，则

    7z a foo.7z foo -x!foo\hello.txt

排除所有 hello.txt 文件，则

    7z a foo.7z foo -xr!hello.txt

排除所有 txt 文件，则

    7z a foo.7z foo -xr!*.txt

排除所有目录文件，则

    7z a foo.7z foo -xr!*

所用到的另外一个参数是递归 -r[[2]][2]。

以上前提是把 7-Zip 的安装目录扔到系统环境变量。

## 参考资料

[1]: https://sevenzip.osdn.jp/chm/cmdline/switches/exclude.htm "-x (Exclude filenames) switch"
[2]: https://sevenzip.osdn.jp/chm/cmdline/switches/recurse.htm "-r (Recurse subdirectories) switch"

**本文历史**

* 2017 年 06 月 23 日 完成初稿
* 2018 年 08 月 24 日 完善例子
