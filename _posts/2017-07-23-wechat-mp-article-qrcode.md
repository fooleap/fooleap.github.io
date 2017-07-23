---
layout: post
title: 公众号文章二维码
date: 2017-07-23 14:46:00+0800
thumb: IMG_PATH/wechat.svg
tags: [微信, 公众号, 二维码]
category: tech
---

在很久之前，我便注册了微信公众平台，也许是因不习惯，也因自我感觉博客够用，我一直没有开始运营它。直至最近，我才想到怎么使用比较好，那就是将其改成跑步文章专用公众号。

近日，发表了第一篇文章，或许该公众号所有的文章，在本博上都能找到对应，而本博有的，该公众号不一定有。

那么，我该在博客里怎么显示公众号文章的链接比较好呢？公众号文章，当然是在手机打开比较好，在手机打开优先扫码比较好，那就直接显示在微信分享的二维码吧！

我的想法是这样的，若微信有相关文章，则显示微信文章链接的二维码；若没有，则显示为当前页面链接的二维码。

在此前，我选择使用[七牛 API 生成的二维码](/url-qrcode-by-qiniu-api.html)图片作为微信分享的二维码图片。现在看起来要改成以前使用 JS 生成二维码的方式，我还是选择 qrcodejs[[1]][1]。

具体实现是这样的，在有公众号文章的 post 头部设置公众号文章链接，如：

```yaml
wechat: http://mp.weixin.qq.com/s/yMlAhGL9i79NEBAXWNpmqQ 
```

那么模板里 Liquid 的相关判断可以如下： 

```liquid
{% raw %}{% if page.wechat %}
    {{ page.wechat }}
{% else %}
    {{ site.home | append: page.url }}
{% endif %}{% endraw %}
```

最后，JS 这么处理
```js
var qrcode = new QRCode('qrcode', {
    text: qrcodeUrl, // 要显示成二维码的链接
    width: 80,
    height: 80,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.L,
    useSVG: true
});
```

扯了那么多，然而并没什么卵用，根本就没人会去扫那个二维码。

目前，我有两篇文章加了公众号链接：

* [湾头最好的跑道](/the-best-track-in-wantou-now.html)
* [结合七牛和高德地图 API 显示照片位置](/show-photo-location-with-qiniu-and-amap-api.html)

## 参考资料

[1]: https://github.com/davidshimjs/qrcodejs "davidshimjs/qrcodejs"

**本文历史**

* 2017 年 07 月 23 日 完成初稿
