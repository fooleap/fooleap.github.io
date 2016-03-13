---
layout: post
title: 七牛的自定义域名
description: "使用七牛也有一段时间了，毫无疑问七牛是我用过的最好用的图床，此前已经说过七牛的一些优点。前些天把域名备案搞定，这下可以使用七牛云的自定义域名功能。"
date: 2015-11-26 16:00:00 +0800
thumb: IMG_PATH/qiniu.png
category: tech
tags: [七牛, 域名, Jekyll]
---

使用七牛也有一段时间了，毫无疑问七牛是我用过的最好用的图床，此前已经说过 [七牛的一些优点](/image-hosting.html)。前些天 [把域名备案搞定](/registration-record.html)，这下可以使用七牛云的自定义域名功能。

下面简单讲一下七牛的域名绑定，比较实在的好处是：告别丑陋的临时域名，更好地装逼。无论是类似于 `fooleap.qiniudn.com` 的七牛二级域名，或是 `7fv9cr.com1.z0.glb.clouddn.com` 的七牛临时域名，怎么看也都不如自己一个自己博客主域一样的二级域名来得爽。

七牛的自定义域名设置很方便也很简单，必要的前提条件有两个：

* 账户至少要有 10 元余额：可通过 `财务` - `充值`
* 已完成备案的域名：鄙人已备案

完成上面的步骤之后，在所需要绑定的空间 `空间设置` - `域名设置` - `自定义域名` 点击 `配置` 按钮，并根据实际需求填写提交。鄙人填写如下图

![提交申请]({{ site.IMG_PATH }}/domain-setting-with-qiniu-01.png)
&#9650;提交申请

点击提交之后便是等待处理阶段，提示 24 小时内配置完成。

![等待处理]({{ site.IMG_PATH }}/domain-setting-with-qiniu-02.png)
&#9650;等待处理

审核通过之后，便可根据提示设置域名解析。

![提示配置 CNAME]({{ site.IMG_PATH }}/domain-setting-with-qiniu-03.png)
&#9650;提示配置 CNAME

![设置域名解析]({{ site.IMG_PATH }}/domain-setting-with-qiniu-04.png)
&#9650;设置域名解析

验证成功便完成自定义域名的设置。

![配置完成]({{ site.IMG_PATH }}/domain-setting-with-qiniu-05.png)
&#9650;配置完成

鄙人使用 Jekyll，设置了一个 `site.IMG_PATH` 的变量为图床网址，仅需修改 `_config.yml` 相应的配置即可全站替换资源 URL。

这里顺带提一下，若 YAML 头信息（Front Matter）中也想引用类似 `site.IMG_PATH` 的变量时，鄙人是这么处理的。

本博首页的文章列表中，标题前面都会有一张很小的缩略图，有点小看起来并不是很舒服，不过能让一部分观众一看便大概了解相关文章的内容。有配图的直接引用配图并通过七牛 API 处理即可，没配图可以设置一张默认的缩略图，而配图为截图的文章，那么小的一张图片肯定很丑，所以鄙人为它们专门贴一张图片作为缩略图，可设置一个自定义页面变量 `page.thumb`。

在需要自定义缩略图的文章文件头信息中，插入 `thumb` 变量即可。那么问题来了，头信息并不能使用类似 `site.IMG_PATH` 这样的变量，总不会每次都复制完整的 URL 进去，这样下次更换图床或图床域名时，就很费事了。

这个可以确定一个字符串，作用和 `site.IMG_PATH` 一样，鄙人确定的字符串是“IMG_PATH”，主要为了和自定义变量的命名保持一致，例如本文：

{% highlight yaml %}
---
……
thumb: IMG_PATH/qiniu.png
……
---
{% endhighlight %}

在需要引用的地方，使用 Liquid 的文本替换，将其替换成 `site.IMG_PATH` 变量即可，例如本站的：

{% highlight html %}
{% raw %}
<img class="thumbnail" src="{{ post.thumb | replace:'IMG_PATH', site.IMG_PATH }}?imageView2/1/w/48/h/48" />
{% endraw %}
{% endhighlight %}

本站的完整代码可前往 GitHub 查看。

**本文历史**

* 2015 年 11 月 26 日 完成初稿
