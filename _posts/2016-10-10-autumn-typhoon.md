---
layout: post
title: "秋台犹如女人心"
description: "金秋十月，北方有些地方已经进入冬天，江南的满地落叶甚是迷人，在南方，秋天似乎并不是很远，诡异的秋台一个接着一个。"
date: 2016-10-10 00:08:00+0800
category: life
tags: ["台风", "秋天"]
js: true
style: true
scripts: ["http://webapi.amap.com/maps?v=1.3&key=29076a35fd5abd25add2eb561488a73f"]
---

金秋十月，北方有些地方已经进入冬天，江南的满地落叶甚是迷人，在南方，秋天似乎并不是很远，诡异的秋台一个接着一个。

目前在南海东北部海面徘徊的“艾利”，就是一个典型的秋台，这种台风受各方面因素所影响，往往路径难以预测，原本径直趋向海南、粤西，却在东沙群岛附近来个 180 度大转弯。这一转，给粤东，尤其是潮汕，带来了充沛的雨水，雨虽然没有盛夏那么猛，但昨天下了一整天，澄海这两天下了将近一百毫米。

到处都是湿漉漉，连跑步都找不到地方，有些地方拆违后还没铺砖，都不用怎么下就都是水也是很讨厌。

![湾头镇道]({{ site.IMG_PATH}}/antumn-typhoon-01.jpg_640)
下着雨的湾头镇道

9 号，各国预测路径都是趋向回旋，然而它还在徘徊。实时的简易路径如下，绿色线条即为台风中心走过的路径。不得不感慨，秋台就像女人的心，难以琢磨。

<div id="map"></div>

虽然离秋天还有段时间，但这两天下雨加上冷空气影响降个几度，也是有点凉飕飕，晚上有点冷。

**本文历史**

* 2016 年 10 月 10 日 完成初稿

<!--<style>
#map {
    width: 100%;
    height: 0;
    padding-bottom: 67%
}
#map .amap-copyright, .amap-logo {
    z-index: 0;
    color: #fff;
}
#map a:after {
    display: none
}
#map .marker-circle{
    width: 9px;
    height: 9px;
    border: 3px solid #fff;
    border-radius: 99em;
    box-shadow: 1px 1px 0 rgba(0,0,0,.4);
}
#map .marker-circle.green{
    background-color: #60AB43;
}
#map .marker-circle.red{
    background-color: #f80000;
}
#map .marker-circle.black{
    background-color: #000000;
}
#map .running-distance{
   background-color: #000;
   font-size: 10px;
   font-family: 'AlternateBoldFont', 'MHei PRC Bold';
   color: #fff;
   width: 45px;
   height: 24px;
   line-height: 24px;
   text-align: right;
   border-top-left-radius: 12px;
   border-bottom-left-radius: 12px;
   position: relative;
   white-space: nowrap;
}
#map .running-distance:after{
   content: "";
   right: -24px;
   top: 0;
   position: absolute;
   height: 0;
   width: 0;
   border: 12px solid transparent;
   border-left-color: #000;
}
#map .running-distance .running-number{
   color: #83DD00;
}
</style> -->
<!--<script>
var lineArr = [];
var script = document.createElement("script");
script.setAttribute("src", "http://typhoon.zjwater.gov.cn/Api/TyphoonInfo/201619?callback=jsonpCallback");
document.getElementsByTagName("body")[0].appendChild(script);
function jsonpCallback(result) {
    var points  = result[0].points;
    for (var i = 0; i < points.length; i++){
        var point = [];
        point[0] = points[i].lng;
        point[1] = points[i].lat;
        lineArr[i] = point;
    }
    drawMap(lineArr);
}
var googleLayer = new AMap.TileLayer({
    getTileUrl: 'http://mt{1,2,3,0}.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galile',
    zIndex: 0
});
var roadNetLayer = new AMap.TileLayer.RoadNet({zIndex:1});
var map = new AMap.Map('map', {
    resizeEnable: true,
    center: [118,22],
    layers:[googleLayer,roadNetLayer],
    zoom: 7
});
function drawMap(lineArr){
    var polyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        strokeColor: "#52EE06",
        strokeOpacity: 1,
        strokeWeight: 3,
        strokeStyle: "solid"
    });
    polyline.setMap(map);
}
</script>-->
