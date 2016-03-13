--- 
layout: post
title: 服务器对百度收录的影响
description: "我的博客采用 Jekyll 搭建，刚开始一直托管于 GitHub。有时 push 速度有点慢，网页访问也相对慢，但并不影响我对 GitHub 的印象。后来我发现我博客在百度的收录一直不大好，收录很少，有时候直接被清空。"
date: 2015-11-25 20:45:00 +0800
thumb: "IMG_PATH/baidu.png"
category: tech
tags: [收录, 百度, SEO, Jekyll, FTP, LFTP]
---

我的博客采用 Jekyll 搭建，刚开始一直托管于 GitHub。有时 push 速度有点慢，网页访问也相对慢，但并不影响我对 GitHub 的印象。后来我发现我博客在百度的收录一直不大好，收录很少，有时候直接被清空。

GitHub 使用的是 Fastly 提供的 CDN 服务，国内有时候会抽风，有些网络甚至访问不了，可能这就是百度收录不乐观的原因吧。GitCafe Pages 使用的是香港的 VPS，既能保证速度又不用备案，若将博客托管于 GitCafe Pages，应该不会有这样的情况。我也发现 DNSPOD 支持细分线路指定不同的 DNS 解析，于是将国内 IP 及国外 IP 分开，国内 IP 访问会解析到 GitCafe Pages 所提供的服务。一段时间后，百度收录情况就完全正常化了。

不过相对于 GitHub Pages，GitCafe 的服务相对要差一点，主要体现在，将数据 push 上去的时候：

|---|---|
|服务|做法
|---
|GitHub Pages|无缝生成
|GitCafe Pages|先清空目录，后生成

这样一来，每次更新内容，使用 GitCafe Pages 的网站都会有一段时间是 404 无法访问，这个时间长短取决于其 Jekyll 生成文件的时间。

而前几天，GitCafe 的 Pages 服务器出现问题，push 上去 404 后便再也不生成，我只能临时将国内 IP 访问也解析到 GitHub Pages 上，几天后没想到问题还没解决。国内 IP 解析到 GitHub Pages 后，百度的收录量正在逐渐下降，我应该想个办法让收录不降下来，无非就是转移到香港或内地的服务器上。

我自己有个香港 VPS，可是现在真的懒得自己搞 Git 服务器，也不知道那个 VPS 稳定不稳定，会不会哪天也出现问题。国内的 Coding 演示平台也可以部署 Jekyll 博客[[1]][1]，好像 24 小时内无人访问就会被自动 Down 掉，虽不大可能没人访问，但我还是不喜欢这样的。

此时，我想到利用刚领取不久的阿里云免费虚拟主机来做存储，岂不更好？它并不是 VPS，没有 Git，也没有 Jekyll，因此也只能通过 FTP put Jekyll 所生成的静态文件上去。传输文件时，总不能每次都打开 FileZilla 将文件传过去吧，还得写个脚本。

若使用 ftp，可以结合 find、awk 写个脚本批量上传文件夹[[2]][2]。显然有更好的办法，可以采用 LFTP，就没有那么麻烦了[[3]][3]。Windows 可以安装 Cygwin[[4]][4]，并下载 LFTP for Windows[[5]][5]。

写个脚本 `update.lftp`，扔到 Jekyll 创建的博客根目录下：

{% highlight bash %}
connect fooleap.org
user 帐号 (密码)
mirror -R --delete _site htdocs --exclude logreport
{% endhighlight %}

注：密码可选，不填密码则运行提示填写。

每次完成修改后，只需要：

    lftp -f update.lftp

这样便可完成文件的传输覆盖，`mirror` 具体可用参数可见 `man lftp`。

使用阿里云的免费虚拟主机做存储之后，收录量确实又回来了。

写到这感觉有点文不对题了，不过服务器对百度收录的影响，无非也就两点：

1. 服务器访问速度太慢，不稳定
2. 服务器上其他网站有问题被百度降权，导致整个服务器上的网站均受影响

虽然鄙人不喜欢度娘，但也不希望百度收录不正常。对了，知乎最近有个问题“有哪些被产品经理毁掉的产品？[[6]][6]”，答案里面没少提到百度的相关产品。

## 参考资料

[1]: https://ruby-china.org/topics/23329 "在 coding.net 上部署 Jekyll 博客 &raquo; Topics &raquo; Ruby China"
[2]: http://segmentfault.com/a/1190000000777713 "用二句Shell命令实现FTP批量上传文件夹 - SegmentFault"
[3]: https://lug.ustc.edu.cn/wiki/linux_digest/lftp#奇巧淫技-使用lftp同步个人主页 "奇巧淫技-使用lftp同步个人主页"
[4]: https://cygwin.com/ "Cygwin"
[5]: https://nwgat.ninja/lftp-for-windows/ "LFTP for Windows"
[6]: http://www.zhihu.com/question/36842186 "有哪些被产品经理毁掉的产品？ - 知乎"

**本文历史**

* 2015 年 10 月 28 日 完成初稿
* 2015 年 10 月 29 日 更正为“服务器对百度收录的影响”
* 2015 年 11 月 25 日 更新 LFTP for Windows 部分
