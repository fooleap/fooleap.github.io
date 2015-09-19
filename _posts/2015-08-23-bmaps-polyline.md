---
layout: post
title: 百度地图 API 绘制折线
description: "想要在百度地图上画一条自定义路线，路线说白了就是折线，使用百度地图 JS API 画折线可以使用 Polyline 类来实现。"
date: 2015-08-23 21:00:00 +0800
category: tech
thumb: 'http://7fv9cr.com1.z0.glb.clouddn.com/bmaps.png'
tags: ['百度地图 API', 折线, 路线, JavaScript, 潮汕]
style: true
js: true
scripts: ['http://api.map.baidu.com/api?v=2.0&ak=FCcc6261f101cd4ccefee22113a609de']
---

* toc
{:toc}

想要在百度地图上画一条自定义路线，路线说白了就是折线，使用百度地图 JS API 画折线可以使用 Polyline 类来实现。

## 获取密钥

首先在 [百度开放服务平台](http://developer.baidu.com/) 注册百度开发者帐号（可以使用百度帐号直接登录）。

然后在 [百度地图 LBS 开放平台](http://lbsyun.baidu.com/apiconsole/key) 创建应用。

根据所需要的设置并提交，便可以看到访问密钥 ak（AccessKey）。

## 创建地图

无论使用百度地图 API 做什么，首先都得显示地图，除去乱七八糟的东西，显示地图最主要的是中心点坐标以及缩放级别。

以上可以通过 Map 类的 centerAndZoom 方法来实现，关于 Map 类具体可参考：[Map 类](http://developer.baidu.com/map/reference/index.php?title=Class:%E6%A0%B8%E5%BF%83%E7%B1%BB/Map)。

下面以潮汕为例，显示一个地图，除却 JS 代码，还需要设置地图所在 `DIV` 的宽高。

{% highlight javascript %}
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
<div id="map"></div>
<script type="text/javascript">
var map = new BMap.Map("map");//创建地图实例
var point = new BMap.Point(116.43,23.4);//创建坐标点
map.centerAndZoom(point, 10);//设置中心坐标及默认缩放级别
</script>
{% endhighlight %}

<div id="map01" class="map"></div>

## 创建坐标点

其实这个在上面已经有过实例，点一般由经度和纬度确定。百度地图使用 Point 类实现，具体可看：[Point 类](http://developer.baidu.com/map/reference/index.php?title=Class:%E5%9F%BA%E7%A1%80%E7%B1%BB/Point)。

创建一个坐标点只需要指定一个经度及一个纬度即可，例如：

{% highlight javascript %}
var point = new BMap.Point(116.43,23.4);
{% endhighlight %}

## 绘制折线

开头说到，百度地图的折线可以由 Polyline 类来实现，Polyline 类的具体文档可以看：[Polyline 类](http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/Polyline)。

折线有若干个折点，所以不可避免的要设置这些坐标点。根据文档，创建折线对象需要设置点的数组。折线属于覆盖物，需要用到 Map 类的 addOverlay 方法将其覆盖到地图上。

下面以横穿潮汕大地的杭深线为例，获取坐标点可以使用 Google Earth 绘制路径，导出 KML 文件后使用百度坐标转换 API 进行批量转换。具体可参考这篇：[百度地图坐标转换](/bmaps-changeposition.html)。

![Google Earth 上的路径]({{ site.IMG_PATH }}/bmaps-polyline.png?imageView2/2/w/640)
▲Google Earth 上的路径

{% highlight javascript %}
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
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
var polyline = new BMap.Polyline(points);//创建折线
map.centerAndZoom(point, 10);//设置中心坐标及默认缩放级别
map.addOverlay(polyline);//将折线覆盖到地图上
</script>
{% endhighlight %}

<div id="map02" class="map"></div>

本文仅仅介绍使用百度地图 API 如何创建折线，若想制作更多更有趣的地图，还请参考百度地图 [JavaScript API 文档](http://developer.baidu.com/map/index.php?title=jspopular)。

**本文历史**

* 2015 年 08 月 23 日 完成初稿
<!--<style>
    .map{max-width:640px;width:100%;height:384px}
    </style>-->
  <!--<script>
    var bmap1 = document.getElementById('map01');
    var bmap2 = document.getElementById('map02');
    var mapWidth = bmap1.offsetWidth;
    bmap1.style.height = mapWidth*2/3 + 'px';
    bmap2.style.height = mapWidth*2/3 + 'px';
    if (mapWidth < 500){
      var zoom = 9;
    } else {
      var zoom = 10;
    }
    var map01 = new BMap.Map("map01");
    var map02 = new BMap.Map("map02");
    var point = new BMap.Point(116.43,23.4);
    var points = [ 
    new BMap.Point(117.270588,23.812967), 
    new BMap.Point(117.227815,23.814331), 
    new BMap.Point(117.171450,23.800042), 
    new BMap.Point(117.150759,23.793515), 
    new BMap.Point(117.132366,23.791615), 
    new BMap.Point(117.076916,23.764662), 
    new BMap.Point(117.025117,23.754470), 
    new BMap.Point(116.977697,23.738077), 
    new BMap.Point(116.900202,23.699401), 
    new BMap.Point(116.885028,23.689195), 
    new BMap.Point(116.874584,23.679663), 
    new BMap.Point(116.819681,23.632414), 
    new BMap.Point(116.808133,23.624896), 
    new BMap.Point(116.759631,23.604708), 
    new BMap.Point(116.737952,23.593357), 
    new BMap.Point(116.725047,23.587241), 
    new BMap.Point(116.569681,23.536185), 
    new BMap.Point(116.528263,23.443635), 
    new BMap.Point(116.518568,23.425542), 
    new BMap.Point(116.502531,23.414523), 
    new BMap.Point(116.387604,23.369746), 
    new BMap.Point(116.352543,23.347282), 
    new BMap.Point(116.281609,23.327249), 
    new BMap.Point(116.227475,23.293805), 
    new BMap.Point(116.181042,23.246917), 
    new BMap.Point(116.109265,23.135226), 
    new BMap.Point(115.984812,23.055625), 
    new BMap.Point(115.855352,23.005498), 
    new BMap.Point(115.706745,22.938802), 
    ];
    var polyline = new BMap.Polyline(points);
    map01.centerAndZoom(point, zoom);
    map02.centerAndZoom(point, zoom);
    map02.addOverlay(polyline);   
  </script>-->
