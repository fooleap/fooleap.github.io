---
layout: post
title: "高德地图 API 叠加谷歌地图图层"
description: "Google Earth 的卫星图一直比国内地图所用的卫星图要新一些，然而 Google 早已不在墙内，中文版的谷歌地图虽能访问，但路网数据各方面并没有国内地图的完善。"
date: 2016-08-07 10:00:00+0800
category: tech
tags: ["潮汕", "高德地图", "谷歌地图"]
thumb: IMG_PATH/amap.png
---

Google Earth 的卫星图一直比国内地图所用的卫星图要新一些，然而 Google 早已不在墙内，中文版的谷歌地图虽能访问，但路网数据各方面并没有国内地图的完善。我就想使用高德地图 API ，加载谷歌的卫星地图图层，并加载高德的路网。

这个需求用高德地图 API 很好实现，高德也有相关示例，只需叠加谷歌的卫星图层再叠加高德地图的路网图层便可[[1]][1]。

再看看高德的文档[[2]][2]，知道路网图层的类，还是以潮汕为例：

{% highlight javascript %}
var googleLayer = new AMap.TileLayer({
  getTileUrl: 'http://mt{1,2,3,0}.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galile'
});//定义谷歌卫星切片图层
var roadNetLayer = new AMap.TileLayer.RoadNet(); //定义一个路网图层
var map = new AMap.Map('map', {
    center: [116.5,23.45], //设置中心点
    zoom: 9, //设置缩放级别
    layers:[googleLayer,roadNetLayer] //设置图层
});
{% endhighlight %}

<div class="iframe-container">
    <iframe class="iframe" src="{{ site.IMG_PATH }}/add-google-satellite-layer-in-amap.html"></iframe>
</div>

在这里需要说明的是，Google 的切片图层中，`lyrs` 参数可以是

    h = 路网
    m = 标准地图
    p = 地形图
    r = 某种改变的地图
    s = 卫星图（无路网）
    t = 地形图（无路网）
    y = 混合地图（带路网的卫星图）

谷歌地图中国部分和高德地图一样使用火星坐标，所以不需要进行纠偏。

在这只是简单的示例，需要更复杂的实现可以查看官方文档，设置相应的属性及方法。

## 参考资料

[1]: http://lbs.amap.com/api/javascript-api/guide/layer/ "开发指南 > 图层 - 高德地图API"
[2]: http://lbs.amap.com/api/javascript-api/reference/layer/ "参考手册 > 图层 - 高德地图API"

**本文历史**

* 2016 年 08 月 07 日 完成初稿
