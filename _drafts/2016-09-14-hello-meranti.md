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

已有一个多月没有写过博客，再不写，下个台风“鲇鱼”都快来报道了。

这个中秋，是自 2010 年以来，第一个在家过的中秋节。中秋节前大概四五天，今年首屈一指的大台风“莫兰蒂”预测线路直指闽南、潮汕。各种预报机构都说这是一个顶级大台风，若完全避开台湾，那这将是这边 1969 年 “728”以来最强的台风。“728”那是父母的孩提时代，这个台风海水倒灌，一些低的地方水有三四米高。次之则可比 2006 年的“珍珠”，那是我的噩梦，登陆当晚一点也睡不着。先登陆台湾的情况概率比较低，也就是说，这个台风大陆登陆时会特别强。

巧的是，这个台风刚好碰上中秋节当天登陆，在潮汕，上次中秋节遇台风可能都可以追溯到五十多年前，
就算登陆闽南，潮汕的风雨估计也不会太小，

<div id="map"></div>


## 参考资料

* 2016 年 09 月 16 日 完成初稿

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
    center: [127.75415,26.73871],
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
}
</script>-->
