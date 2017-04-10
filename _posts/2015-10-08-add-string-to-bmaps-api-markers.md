---
layout: post
title: 给地图标注加上字符
description: "在地图中，显示多个地点的时候，想要更好的区分，往往会使用不同样式的地点图标，或改变图标的形状，或改变图标的颜色，或在图标上加上字符。论其成本，恐怕在原有地点图标上加上字符是最低的，添加字符相对来说也更利于区分。"
date: 2015-10-08 18:00:00 +0800
category: tech
thumb: IMG_PATH/bmaps.png
tags: ["百度地图 API", 标注, JavaScript]
---

* toc
{:toc}

在地图中，显示多个地点的时候，想要更好的区分，往往会使用不同样式的地点图标，或改变图标的形状，或改变图标的颜色，或在图标上加上字符。论其成本，恐怕在原有地点图标上加上字符是最低的，添加字符相对来说也更利于区分。

百度地图 API 是采用 Icon 类来修改覆盖物，使用上 Marker 来完成标注的覆盖[[1]][1][[2]][2]，可以用以下几种方式来实现加载带有数字或字母的 Marker。

## 单张图片

这是最没办法的办法，一个一个来，先放代码，后放示例。

{% highlight html %}
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
<div id="map"></div>
<script type="text/javascript">
  var map = new BMap.Map('map');
  map.centerAndZoom(new BMap.Point(116.4, 23.4), 10);
  var size1 = new BMap.Size(23, 25);
  var size2 = new BMap.Size(11.5, 25);
  var points = [],
      icons = [],
      markers = [];
  var icons = [
    new BMap.Icon('http://7fv9cr.com1.z0.glb.clouddn.com/marker_a.png', size1, {anchor: size2 }),
    new BMap.Icon('http://7fv9cr.com1.z0.glb.clouddn.com/marker_b.png', size1, {anchor: size2 }),
    new BMap.Icon('http://7fv9cr.com1.z0.glb.clouddn.com/marker_c.png', size1, {anchor: size2 })
  ];
  for (var i = 0; i < 3; i++){
    points[i] = new BMap.Point(parseFloat('116.' + (i*3+1).toString()), 23.4);
    markers[i] = new BMap.Marker(points[i], {icon: icons[i]});
    map.addOverlay(markers[i]);
  }
</script>
{% endhighlight %}

<div class="iframe-container">
    <iframe class="iframe" src="{{ site.IMG_PATH }}/add-string-to-bmaps-api-markers.html?id=1"></iframe>
</div>

## 通过 Image Sprites

既然是图片，那么可以使用类似于 CSS Image Sprites[[3]][3] 的方法来加载，通过 Icon 类 的 imageOffset 属性可以实现，具体如下：

{% highlight html %}
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
<div id="map"></div>
<script type="text/javascript">
  var map = new BMap.Map('map');
  var size1 = new BMap.Size(23, 25);
  var size2 = new BMap.Size(11.5, 25);
  map.centerAndZoom(new BMap.Point(116.4, 23.4), 10);
  var points = [],
      icons = [],
      markers = [];
  for (var i = 0; i < 3; i++){
    points[i] = new BMap.Point(parseFloat('116.' + (i*3+1).toString()), 23.4);
    icons[i] = new BMap.Icon('http://7fv9cr.com1.z0.glb.clouddn.com/markers.png', size1, {anchor: size2, imageOffset: new BMap.Size(0, -(i+3)*25)});
    markers[i] = new BMap.Marker(points[i], {icon: icons[i]});
    map.addOverlay(markers[i]);
  }
</script>
{% endhighlight %}

<div class="iframe-container">
    <iframe class="iframe" src="{{ site.IMG_PATH }}/add-string-to-bmaps-api-markers.html?id=2"></iframe>
</div>

## 通过 HTML5 Canvas

另外，也可通过 HTML5 的 Canvas 在图片里添加文字达到标注上加文字的效果，具体可参考台湾同胞的文章——利用 Canvas 製作 Google Maps API Marker Icon[[4]][4]。

{% highlight html %}
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
<div id="map"></div>
<script type="text/javascript">
  var map = new BMap.Map('map');
  var size1 = new BMap.Size(23, 25);
  var size2 = new BMap.Size(11.5, 25);
  var letter,
      points = [],
      icons = [],
      markers = [];
  map.centerAndZoom(new BMap.Point(116.4, 23.4), 10);
  var image = new Image();
  image.crossOrigin = '*';
  image.onload = function (){
    var width = this.width;
    var height = this.height;
    for(var i = 0; i < 3; i++) {
      letter = i + 71;
      var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
      var ctx = canvas.getContext('2d');
          ctx.drawImage(this, 0, 0, width, height);
          ctx.textAlign = 'center';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(String.fromCharCode(letter), 9.5, height / 2);
      points[i] = new BMap.Point(parseFloat('116.' + (i*3+1).toString()), 23.4);
      icons[i] = new BMap.Icon(canvas.toDataURL(), size1, {anchor: size2});
      markers[i] = new BMap.Marker(points[i], {icon: icons[i]});
      map.addOverlay(markers[i]);
    }
  }
  image.src = 'http://7fv9cr.com1.z0.glb.clouddn.com/marker.png';
</script>
{% endhighlight %}

<div class="iframe-container">
    <iframe class="iframe" src="{{ site.IMG_PATH }}/add-string-to-bmaps-api-markers.html?id=3"></iframe>
</div>

## 通过七牛 API

鄙人既然使用七牛做图床，那么可以采用七牛图片处理的相关 API[[5]][5] 处理图片文件。

### 图片水印

使用七牛 API 的文字水印[[6]][6]，可以存储单个标注的图片即可轻松变换出无数的图片，例如：

{% highlight html %}
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
<div id="map"></div>
<script type="text/javascript">
  var map = new BMap.Map('map');
  var size1 = new BMap.Size(23, 25);
  var size2 = new BMap.Size(11.5, 25);
  map.centerAndZoom(new BMap.Point(116.4, 23.4), 10);
  var letter;
      points = [],
      icons = [],
      markers = [];
  for (var i = 0; i < 3; i++){
    letter = i + 74;
    points[i] = new BMap.Point(parseFloat('116.' + (i*3+1).toString()), 23.4);
    icons[i] = new BMap.Icon('http://7fv9cr.com1.z0.glb.clouddn.com/marker.png?watermark/2/fill/d2hpdGU=/dx/8/dy/8/text/' + btoa(String.fromCharCode(letter)), size1, {anchor: size2});
    markers[i] = new BMap.Marker(points[i], {icon: icons[i]});
    map.addOverlay(markers[i]);
  }
</script>
{% endhighlight %}

<div class="iframe-container">
    <iframe class="iframe" src="{{ site.IMG_PATH }}/add-string-to-bmaps-api-markers.html?id=4"></iframe>
</div>

### 裁剪图片

既然七牛也支持裁切图片[[7]][7]，那么也可以跟 CSS Image Sprites 般的处理，只不过是在图片本身做处理，而不是在展示图片时处理，如下：

{% highlight html %}
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
<div id="map"></div>
<script type="text/javascript">
  var map = new BMap.Map('map');
  var size1 = new BMap.Size(23, 25);
  var size2 = new BMap.Size(11.5, 25);
  map.centerAndZoom(new BMap.Point(116.4, 23.4), 10);
  var points = [],
      icons = [],
      markers = [];
  for (var i = 0; i < 3; i++){
    points[i] = new BMap.Point(parseFloat('116.' + (i*3+1).toString()), 23.4);
    icons[i] = new BMap.Icon('http://7fv9cr.com1.z0.glb.clouddn.com/markers.png?imageMogr2/crop/!23x25a0a' + i * 25, size1, {anchor: size2});
    markers[i] = new BMap.Marker(points[i], {icon: icons[i]});
    map.addOverlay(markers[i]);
  }
</script>
{% endhighlight %}

<div class="iframe-container">
    <iframe class="iframe" src="{{ site.IMG_PATH }}/add-string-to-bmaps-api-markers.html?id=5"></iframe>
</div>

## 几种方式的对比

一个地图里面需要显示 N 个有不同文字修饰的地标，那么：

|方式|图片数|IE8 支持|
|---
|单张|N|是|
|imageOffset|1(大)|是|
|Canvas|1(小)|否|
|七牛水印|N|否|
|七牛裁剪|N|是|

* 最省资源的恐怕是 HTML5 Canvas 的方式加载，只是对 IE8 的支持不是很好。
* 较省事的是七牛 API 的处理，不过水印文字需要用到 Base64 编码，鄙人采用 `btoa()`[[8]][8] 对文字进行编码，并不兼容 IE8。
* 想要兼容 IE8 并省资源，那还是得尽量采用百度地图自身的方法来实现，不过或许哪天，IE 的兼容也可以抛一边了。

## 覆盖物素材

哦对了，若采用百度地图 API，我想采用他家的素材比较和谐，百度地图覆盖物的素材下面有一小部分。

>  http://api.map.baidu.com/img/markers.png 
>
>  http://api.map.baidu.com/images/dest_markers.png
>
>  http://api.map.baidu.com/images/markers.png
>
>  http://api.map.baidu.com/images/markers_new.png
>
>  http://api.map.baidu.com/images/marker_red.png
>
>  http://api.map.baidu.com/images/marker_red_sprite.png
>
>  http://api.map.baidu.com/images/spotmkrs.png
>
>  http://api.map.baidu.com/images/stop_icon.png
>
>  http://api.map.baidu.com/images/trans_icons.png
>
> 以上域名换成 `api0.map.bdimg.com` 亦可
>
> http://app.baidu.com/map/images/us_mk_icon.png
>
> http://webmap0.map.bdstatic.com/wolfman/static/common/images/markers_new2_31a3944.png

## 参考资料

[1]: http://developer.baidu.com/map/reference/index.php?title=Class:覆盖物类/Icon "Class:覆盖物类/Icon - 百度地图API"
[2]: http://developer.baidu.com/map/reference/index.php?title=Class:覆盖物类/Marker "Class:覆盖物类/Marker - 百度地图API"
[3]: http://www.w3schools.com/css/css_image_sprites.asp "CSS Image Sprites"
[4]: http://blog.xuite.net/vexed/tech/59848483 "利用 Canvas 製作 Google Maps API Marker Icon @ Vexed's Blog"
[5]: http://developer.qiniu.com/docs/v6/api/reference/fop/image/ "图片 | 七牛云存储"
[6]: http://developer.qiniu.com/docs/v6/api/reference/fop/image/watermark.html#text-watermark "水印处理（watermark） | 七牛云存储"
[7]: http://developer.qiniu.com/docs/v6/api/reference/fop/image/imagemogr2.html#imagemogr2-crop-size-spec "高级处理（imageMogr2） | 七牛云存储"
[8]: https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding "Base64的编码与解码 - Web API 接口 | MDN"

**本文历史**

* 2015 年 10 月 08 日 完成初稿
