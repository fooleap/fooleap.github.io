---
layout: post
title: 更改 RubyGems 镜像源问题
date: 2016-03-29 11:30:00 +0800
thumb: IMG_PATH/ruby.svg
category: tech
tags: [RubyGems]
---

由于众所周知的原因，RubyGems 官方源在国内一直访问不佳，我们常常会选择替换成国内服务器的，比如 `https://ruby.taobao.org/` 或 `https://gems.ruby-china.org/`。

前几天重装完系统之后对源进行增删操作，没想到却碰到如下问题：


    C:\RubyDevKit> gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
    Error fetching https://ruby.taobao.org/:
        SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://rubygems-china.oss-cn-hangzhou.aliyuncs.com/specs.4.8.gz)

而后在此 Gist `https://gist.github.com/luislavena/f064211759ee0f806c88` 找到解决方法。

可直接将此文件 `https://curl.haxx.se/ca/cacert.pem` 扒下来，放到以下目录即可。

    C:\Ruby22-x64\lib\ruby\2.2.0\rubygems\ssl_certs\

具体为啥会出现这个问题，可看原文，在此不深究，解决就好。

**本文历史**

* 2016 年 03 月 29 日 完成初稿
