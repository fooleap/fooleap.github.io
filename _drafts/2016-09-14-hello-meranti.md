---
layout: post
title: "你好，莫兰蒂"
description: ""
date: 2016-09-14 00:00:00+0800
category: life
tags: ["潮汕", "中秋", "台风"]
js: true
style: true
scripts: ["http://webapi.amap.com/maps?v=1.3&key=29076a35fd5abd25add2eb561488a73f"]
---

<div id="map"></div>

## 参考资料

[1]: https://www.zhihu.com/question/35168262/answer/61518279 "能跑完10公里的人多不多?10个成人里面有1个吗? - fooleap 的回答 - 知乎"

* 2016 年 08 月 05 日 完成初稿

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
script.setAttribute("src", "http://typhoon.zjwater.gov.cn/Api/TyphoonInfo/201614?callback=jsonpCallback");
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
        center: [126.304, 23.436],
        layers:[googleLayer,roadNetLayer],
        zoom: 5
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
    console.log(map.getCenter());
}
</script>-->
