---
layout: post
title: 为博客添加分享到微信功能
description: "网页上所谓的分享到微信功能，充其量就是显示一个该网页或该网页手机版对应页面 URL 地址的二维码，让别人用微信去扫码，便可通过微信自身的功能进行分享。"
thumb: IMG_PATH/wechat.png
date: 2015-11-30 20:00:00 +0800
category: tech
tags: [微信, 二维码, JavaScript]
---

网页上所谓的分享到微信功能，充其量就是显示一个该网页或该网页手机版对应页面 URL 地址的二维码，让别人用微信去扫码，便可通过微信自身的功能进行分享。

例如腾讯新闻的分享到微信，其实那个小图标的 `title` 值是 `查看文本二维码`。

![腾讯新闻分享到微信]({{ site.IMG_PATH }}/share-to-wechat-01.png)
&#9650;腾讯新闻分享到微信

如果想要简单点，可以直接使用 JiaThis[[1]][1] 或者百度分享[[2]][2] 等社会化分享按钮所提供的服务，根据网站提供的流程进行自定义，获取代码并加到网站相关模板文件里即可。

## jQuery 插件 jquery.qrcode.js

如果不喜欢使用第三方服务，那么则可以使用鄙人之前在 [无处不在的二维码](/qrcode.html) 所提到的，可生成二维码的 jQuery 插件 jquery.qrcode.js [[3]][3]，压缩后还不到 4 K。

这个插件的使用，仅需在模板里引用相关文件，例如：

{% highlight html %}
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="jquery.qrcode.min.js"></script>
{% endhighlight %}

并创建一个用于包含生成的二维码图片的 DOM 元素。

{% highlight html %}
<div id="qrcode"></div>
{% endhighlight %}

最后再添加生成指定二维码的代码即可，例如生成当前页面 URL 地址二维码如下。

{% highlight html %}
<script type="text/javascript">
  $('#qrcode').qrcode(location.href);
</script>
{% endhighlight %}

默认大小是 256 px，有点大，当然可以自定义大小：

{% highlight html %}
<script type="text/javascript">
  $('#qrcode').qrcode({width: 100, height: 100, text: location.href});	
</script>
{% endhighlight %}

## JS 库 qrcode.js

如果网站不用 jQuery，还有一个 JS 库 qrcode.js[[4]][4] 可以选择。使用起来跟 jQuery 插件的差不多，本站目前是使用的就是这款。

引入文件：

{% highlight html %}
<script type="text/javascript" src="qrcode.min.js"></script>
{% endhighlight %}

创建 DOM 元素：

{% highlight html %}
<div id="qrcode"></div>
{% endhighlight %}

生成二维码图片：

{% highlight html %}
<script type="text/javascript">
  var qrcode = new QRCode('qrcode', {width: 100, height: 100, text: location.href});
</script>
{% endhighlight %}

至于一些自定义参数的设置，例如 `correctLevel` 等，以及二维码应该以什么形式存在，点击显示或是直接显示在页面上，这就见仁见智了，不多废话。

鄙人使用的 Jekyll 静态博客，大概也只能这么搞。若使用 WordPress 等，或许还有更多的方法可以选择。

上述方法是针对 PC 端浏览器的，如果是移动端的，则可能需要自己申请微信 JSAPI 权限，这估计也是个大坑，对于 QQ 浏览器或 UC 浏览器，则可以试试 JefferyWang 的 nativeShare.js [[5]][5]。

## 参考资料

[1]: http://www.jiathis.com/ "JiaThis"
[2]: http://share.baidu.com/ "百度分享"
[3]: http://jeromeetienne.github.io/jquery-qrcode/ "jquery.qrcode.js"
[4]: http://davidshimjs.github.io/qrcodejs/ "qrcode.js"
[5]: https://github.com/JefferyWang/nativeShare.js "JefferyWang/nativeShare.js"

**本文历史**

* 2015 年 11 月 30 日 完成初稿
