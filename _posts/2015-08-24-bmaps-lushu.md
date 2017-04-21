---
layout: post
title: 百度地图 API 制作路书	
description: "很久以前，Google Maps 还能使用，要分享一些去徒步、骑行的线路地图十分方便，里面插上一些图片啥的也是毫无压力，鼠标点点就可以将线路图搞得有声有色，例如在这篇博文中所嵌入的地图。"
date: 2015-08-24 15:30:00 +0800
category: tech
thumb: 'IMG_PATH/bmaps.png'
tags: ["百度地图 API", 路书, 潮汕]
---

* toc
{:toc}

## 地图分享

很久以前，Google Maps 还能使用，要分享一些去徒步、骑行的线路地图十分方便，里面插上一些图片啥的也是毫无压力，鼠标点点就可以将线路图搞得有声有色，例如在 [这篇博文](/walking-in-guilin-1.html) 中所嵌入的地图。

近几年，Google Maps 逐渐无法打开，偶尔抽风但尚能打开的 Google 地图[[1]][1] 已没有我的地图编辑分享功能。

![通过 Google Maps 分享的地图]({{ site.IMG_PATH }}/bmaps-lushu.png)
通过 Google Maps 分享的地图

现在要分享一些地图便变得不那么方便，鄙人并没有找到能够简单编辑线路，插上文字图片并在站外分享嵌入的地图服务代替品。

* **搜狗路书**[[2]][2] 观其网站风格，似乎还停留在上个十年，已不开放，估计已经放弃
* **行者路书**[[3]][3] 功能比较简单，看起来像阉割版的 Google Maps 我的地图
* **路书**[[4]][4] 感觉好文艺，旅行专用？还在内测中

形形色色各种所谓的路书，我也不知道干嘛用的，旅行、运动偏多（掩面，自己不也是）。可是我想要的只是分享线路地图，简简单单只要能将地图嵌入到网站中。看了下路书的概念，大概就是记录旅行的一种流水帐，就是为旅行而准备的，而在这里，我的需求是骑行或者徒步完记录过程，虽然目的不一样，但需求是相同的。

## 百度路书

找来找去真没找到更合适的代替品，看来得用一些地图 API 自定义展示地图才行，选择上没有怎么考虑，用户量比较多应该是百度地图，好吧就它，之前做企业站也用百度地图 API 展示过企业地址。

按理说想展示更多的东西就需要学习更多，就鄙人而言，地点标注、信息说明、路线，基本上就足够了，而骑行徒步等运动，还真可以使用路书来展示。

百度地图的路书功能可以是由百度提供的一个函数库来完成， 详细可以看百度地图 JavaScript 开源库[[5]][5]的路书部分，可以自己修改其 JS 文件，获得更多自定义的功能。就不折腾太多，鄙人感觉使用这个已经足够地图的展示。

## 制作路书

此前，在 [百度地图 API 绘制折线](/bmaps-polyline.html) 说过怎么绘制折线（路线），而百度路书的也和折线一样需要用到的点坐标数组。

下面还以原地图为例，制作一个路书，展示动车自北向南横穿潮汕。路书的相关设置可以参考 BMapLib.LuShu 类[[6]][6]，除却 [百度地图 API 绘制折线](/bmaps-polyline.html) 所提到的，此实例还用到另外的 Marker 类[[7]][7]、Icon 类[[8]][8] 及 Size 类[[9]][9]。

```html
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js"></script>
<div id="map"></div>
<script type="text/javascript">
var map = new BMap.Map("map");//创建地图实例
var point = new BMap.Point(116.43,23.43);//创建坐标点
var points = [ 
  new BMap.Point(117.270591,23.812975), 
  new BMap.Point(117.227819,23.814327), 
  new BMap.Point(117.171452,23.800036), 
  new BMap.Point(117.132368,23.791609), 
  new BMap.Point(117.076919,23.764658), 
  new BMap.Point(117.024827,23.754510), 
  new BMap.Point(116.981047,23.739533), 
  new BMap.Point(116.939091,23.717617), 
  new BMap.Point(116.900199,23.699399), 
  new BMap.Point(116.885031,23.689196), 
  new BMap.Point(116.874584,23.679668), 
  new BMap.Point(116.811841,23.626940), 
  new BMap.Point(116.759632,23.604713), 
  new BMap.Point(116.725061,23.587160), 
  new BMap.Point(116.651402,23.566650), 
  new BMap.Point(116.595323,23.545934), 
  new BMap.Point(116.565463,23.533553), 
  new BMap.Point(116.552337,23.519046), 
  new BMap.Point(116.544596,23.508704), 
  new BMap.Point(116.537630,23.464337), 
  new BMap.Point(116.528264,23.443634), 
  new BMap.Point(116.518571,23.425543), 
  new BMap.Point(116.502256,23.414608), 
  new BMap.Point(116.429954,23.388459), 
  new BMap.Point(116.388039,23.368854), 
  new BMap.Point(116.352537,23.347284), 
  new BMap.Point(116.281605,23.327247), 
  new BMap.Point(116.227800,23.293717), 
  new BMap.Point(116.214108,23.280499), 
  new BMap.Point(116.180527,23.247139), 
  new BMap.Point(116.107918,23.134458), 
  new BMap.Point(116.040802,23.102683), 
  new BMap.Point(116.005375,23.071510), 
  new BMap.Point(115.979189,23.052335), 
  new BMap.Point(115.874687,23.017842), 
  new BMap.Point(115.732058,22.949055), 
  new BMap.Point(115.650940,22.903134), 
  new BMap.Point(115.559445,22.859811), 
];//设置坐标数组
var markers = [
  points[7],//饶平站
  points[15],//潮汕站
  points[23],//潮阳站
  points[28],//普宁站
  points[32]//葵潭站
];
var icon1 = new BMap.Icon('{{ site.IMG_PATH }}/marker.png', new BMap.Size(19,25),{anchor: new BMap.Size(9, 25)});//地点
var icon2 = new BMap.Icon('{{ site.IMG_PATH }}/power-car.png', new BMap.Size(30, 30), {anchor: new BMap.Size(15, 15)});//动车
var polyline = new BMap.Polyline(points);//创建折线
var lushu = new BMapLib.LuShu(map, points, {
  landmarkPois:[
    {lng:markers[0].lng,lat:markers[0].lat,html:'饶平站到了',pauseTime:1},
    {lng:markers[1].lng,lat:markers[1].lat,html:'<img src="{{ site.IMG_PATH }}/chaoshan.jpg?imageView2/2/w/150" />潮汕站到了',pauseTime:2},
    {lng:markers[2].lng,lat:markers[2].lat,html:'潮阳站到了',pauseTime:1},
    {lng:markers[3].lng,lat:markers[3].lat,html:'普宁站到了',pauseTime:1},
    {lng:markers[4].lng,lat:markers[4].lat,html:'葵潭站到了',pauseTime:1}
  ],//显示的特殊点，似乎是必选参数，可以留空，据说要和距原线路10米内才会暂停，这里就用原线的点
  defaultContent: '动车继续前行',//覆盖物内容，这个填上面的特殊点文字才会显示
  speed: 20000,//路书速度
  icon: icon2,//覆盖物图标，默认是百度的红色地点标注
  autoView: false,//自动调整路线视野
  enableRotation: false,//覆盖物随路线走向
});
map.addOverlay(polyline);//覆盖折线到地图上
for (i=0;i<5;i++){
  map.addOverlay(new BMap.Marker(markers[i],{icon:icon1}));//覆盖动车站标注到地图上
}
map.centerAndZoom(point, 10);//设置中心坐标及默认缩放级别
map.addEventListener("click",startlushu);//给地图注册点击事件
function startlushu(){
  lushu.start();//启动路书函数
}
</script>
```

{% include media.html type="iframe" src="IMG_PATH/bmaps-lushu.html" %}

点击地图可启动路书。

## 参考资料

[1]: http://ditu.google.cn "Google 地图"
[2]: http://map.sogou.com/lushu/ "搜狗路书"
[3]: http://www.imxingzhe.com/lushu/ "行者路书"
[4]: https://lushu.com/ "路书"
[5]: http://developer.baidu.com/map/index.php?title=open/library "百度地图 JavaScript 开源库"
[6]: http://api.map.baidu.com/library/LuShu/1.2/docs/symbols/BMapLib.LuShu.html "BMapLib.LuShu 类"
[7]: http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/Marker "Marker 类"
[8]: http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/Icon "Icon 类"
[9]: http://developer.baidu.com/map/reference/index.php?title=Class:%E5%9F%BA%E7%A1%80%E7%B1%BB/Size "Size 类"

**本文历史**

* 2015 年 08 月 24 日 完成初稿
