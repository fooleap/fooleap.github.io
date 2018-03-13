---
layout: post
title: 利用七牛 API 显示照片的 Exif
description: "常访问鄙人博客的朋友，将鼠标覆盖到博客中的某一张图片时，会看到上方会显示该照片的拍摄日期、器材、曝光数据等，看起来好像有点意（zhuāng）思（bī），我就是相片拍得那么烂也好意思晒数据，因为总感觉缺点什么。"
date: 2015-12-04 17:00:00 +0800
thumb: IMG_PATH/qiniu.png
category: tech
tags: [七牛, Exif, JavaScript]
---

常访问鄙人博客的朋友，将鼠标覆盖到博客中的某一张图片时，会看到上方会显示该照片的拍摄日期、器材、曝光数据等，看起来好像有点意（zhuāng）思（bī），我就是相片拍得那么烂也好意思晒数据，因为总感觉缺点什么。

那些数据都源于该照片的 Exif，Exif 是专门为数码照片所设定的，可以记录数码照片的属性信息及拍摄数据。Exif 可以嵌入在 JPEG 等文件中，用数码相机或者手机拍摄的照片文件，一般附加有 Exif 数据。

如果是本地的照片文件，很多图片浏览器都有查看图片 Exif 数据的功能，例如 [IrfanView](/irfanview.html)。如果是在线的图片呢？Chrome 使用 EXIF Viewer 扩展可以在鼠标划过的时候显示 Exif 信息，Firefox 的 Exif Viewer 扩展则是通过右键菜单可查看。不过在线的图片有些是用户后期处理没保留 Exif，有些则被网站处理过，相当多的图片其实已经不包含 Exif 数据，鄙人觉得这些扩展并不是很实用。

有些照片存储分享平台或摄影社区，如 Flickr、图虫等，在展示相片的同时，会在旁边附上处理过的 Exif 数据信息，以方便网友参考，带去启发，拍出好片。

那么，在个人网站或者博客上面，应该如何显示这些信息比较好？

exif-js[[1]][1] 是一个提供读取相片 Exif 数据功能的 JS 库，兼容现代浏览器。GitHub 上有例子，这个就不展开讲，因为还有更加方便的方法。

鄙人多次提及的七牛，其 API 可以很轻松地获取到图片的 Exif 信息[[2]][2]，所以使用七牛做图床，读取到相关的信息很方便。

直接在图片 URL 后加 `exif` 指示符即可获取到相关 JSON 字符串，例如：

![金鸿路上的风景]({{ site.IMG_PATH }}/show-exif-data-of-photo.jpg_640)
金鸿路上的风景

以上相片的 Exif 数据如下：

    https://source.fooleap.org/show-exif-data-of-photo.jpg?exif

鄙人所取的那几个数据，对应格式化后如下：

{% highlight json %}
{
  "DateTimeOriginal": {
    "val": "2012:08:01 07:48:12",
    "type": 2
  },
  "ExposureTime": {
    "val": "1/400 sec.",
    "type": 5
  },
  "FNumber": {
    "val": "f/8.0",
    "type": 5
  },
  "FocalLength": {
    "val": "4.3 mm",
    "type": 5
  },
  "ISOSpeedRatings": {
    "val": "200",
    "type": 3
  },
  "Model": {
    "val": "Canon IXUS 220HS",
    "type": 2
  }
}
{% endhighlight %}

将以上数据取出来显示在网页里，可以用 JavaScript 实现，若 HTML 如下：

{% highlight html %}
<img src="https://source.fooleap.org/show-exif-data-of-photo.jpg_640" id="photo" />
{% endhighlight %}

那么 JavaScript 可以这么写：

{% highlight javascript %}
var xhrExif = new XMLHttpRequest();
xhrExif.open('GET', 'https://source.fooleap.org/show-exif-data-of-photo.jpg?exif', false);
xhrExif.send(null);
var exif = JSON.parse(xhrExif.responseText);
if (xhrExif.readyState == 4 && xhrExif.status == 200) {
  datetime = exif.DateTimeOriginal.val.split(/\:|\s/);
  date = datetime[0] + '-' + datetime[1] + '-' + datetime[2];
  model = (exif.Model) ? (exif.Model.val) : '无';
  fnum = (exif.FNumber) ? (exif.FNumber.val.split(/\//)[1]) : '无';
  extime = (exif.ExposureTime) ? (exif.ExposureTime.val) : '无';
  iso = (exif.ISOSpeedRatings) ? (exif.ISOSpeedRatings.val.split(/,\s/)[0]) : '无';
  flength = (exif.FocalLength) ? (exif.FocalLength.val) : '无';
  document.getElementById('photo').insertAdjacentHTML('afterend', '<div id="exif">日期: ' + date + ' 器材: ' + model + ' 光圈: ' + fnum + ' 快门: ' + extime + ' 感光度: ' + iso + ' 焦距: ' + flength + '</div>');
}
{% endhighlight %}

具体的实例见 http://runjs.cn/detail/b4q6pvet

所用到的主要知识点可以看看阮一峰的 Ajax 教程[[3]][3]，使用 jQuery 或许会更加方便一点。而具体用到博客上，需要考虑的可能更多，这里就不多说了，有兴趣可以查看源码，欣赏鄙人写的那蹩脚的 JS。

## 参考资料

[1]: https://github.com/exif-js/exif-js "exif-js/exif-js·GitHub"
[2]: http://developer.qiniu.com/docs/v6/api/reference/fop/image/exif.html "EXIF信息（exif） | 七牛云存储"
[3]: http://javascript.ruanyifeng.com/bom/ajax.html "Ajax -- JavaScript 标准参考教程（alpha）"

**扩展阅读**

* [结合七牛和高德地图 API 显示照片位置](/show-photo-location-with-qiniu-and-amap-api.html)

**本文历史**

* 2015 年 12 月 04 日 完成初稿
