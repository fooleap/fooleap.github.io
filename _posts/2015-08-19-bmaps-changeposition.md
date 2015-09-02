---
layout: post
title: 百度地图坐标转换
description: "关于地图坐标系统，百度的文档里面一句话就概括得很清楚，这里引用过来。"
date: 2015-08-19 17:00:00 +0800
category: tech
tags: [百度地图, 坐标转换, WGS-84, GCJ-02, BD-09]
---

* toc
{:toc}

## 地图坐标系统

关于地图坐标系统，百度的 [文档](http://developer.baidu.com/map/question.htm#qa002){:title="百度坐标体系"} 里面一句话就概括得很清楚，这里引用过来。

>国际经纬度坐标标准为 WGS-84，国内必须至少使用国测局制定的 GCJ-02，对地理位置进行首次加密。百度坐标在此基础上，进行了 BD-09 二次加密措施，更加保护了个人隐私。

国内大部分电子地图所采用的坐标系统为火星坐标（GCJ-02），而百度做了自己的坐标系统（BD-09）。

在英文维基百科的 [百度地图词条](https://en.wikipedia.org/wiki/Baidu_Maps#Coordinate_system) 上，有张图就能很形象地说明这几个坐标偏移的幅度（[实例](http://output.jsbin.com/panomu/2)）。

![维基百科的图]({{ site.IMG_PATH }}/bmaps-changeposition.png)
▲维基百科的图

百度坐标（BD-09）、火星坐标（GCJ-02）、GPS 坐标（WGS-84）之间都存在一定的偏移，如果不做一些纠偏，一些地图软件或应用就会出问题，尤其是移动端 APP（获取 GPS 定位信息直接显示在地图上的）。关于这方面，印象比较深刻的是，使用一些国外的跑步 APP，运动轨迹会出现一定程度偏移，这是因为没有做偏移纠正（Nike+ Running 已纠正）。

##百度坐标拾取

罗嗦这么多，简单地说，若要使用百度地图 API，坐标就要用百度坐标。那么百度坐标如何获取？百度坐标的拾取可以用他家的 [坐标拾取系统](http://api.map.baidu.com/lbsapi/getpoint/)。虽然使用起来挺方便，但一次只能拾取一个坐标，无法拾取多个坐标。

个人使用地图 API 一般是制作一些路书，而在制作路线图时，鄙人习惯于使用 Google Earth 或 Google Maps 先画出路径，能够很方便地获取坐标。

导出 KML 之后便能获取看到路径所有点的坐标数据，Google Earth 的 KML 坐标数据段如下

{% highlight xml %}
			<coordinates>
				120.5757203332099,30.01647785364818,0 120.5737544460776,30.01686395900305,0 120.5738030367051,30.01661413285396,0 120.5741320514054,30.01664161571365,0 120.5740519362456,30.01612737042148,0 
			</coordinates>
{% endhighlight %}

Google Maps 则是

{% highlight xml %}
					<coordinates>110.28720000000001,25.28115,0.0 110.28684,25.27927,0.0 110.28506,25.27963,0.0 110.28331,25.27974,0.0 110.28192000000001,25.27734,0.0 110.28246,25.27706,0.0</coordinates>
{% endhighlight %}

Google Earth 采用 WSG-84 坐标系统，而 Google Maps 中国部分采用的是 GCJ-02 坐标系统，获取到数据之后需要将其转换成百度坐标。

## 百度坐标转换

在百度地图 API DEMO 中，可以看到 [批量坐标转换的实例](http://developer.baidu.com/map/jsdemo.htm#a5_3)，使用起来颇为麻烦，而且该限制一次只能转换 20 个，不过在网上可以找到 [修改过的 JS](http://blog.csdn.net/cao478208248/article/details/38317951)，不限制点的数量。

后来发现百度已经发布了 [新版本的坐标转换 API](http://developer.baidu.com/map/changeposition.htm)，虽然百度没给出实例，但使用起来颇为方便，可以用它来批量转换上面 Google Earth 或 Google Maps 导出的 KML 的坐标数据。

鄙人用 jQuery 做了一个页面，用于 Google 路径坐标数据转换成百度坐标：[/wgs84-or-gcj02-to-bd09](/wgs84-or-gcj02-to-bd09){:target="_blank" title="GPS 坐标或火星坐标批量转换为百度坐标"}。

具体怎么使用可看下面这个 GIF 动画：

![百度坐标转换器的使用]({{ site.IMG_PATH }}/bmaps-changeposition.gif)
▲百度坐标转换器的使用

## 其他转换方法

除此之外，网络上也流传这各种坐标之间的转换算法，具体可以参考这篇文章：[中国地图坐标偏移算法整理](http://dijkst.github.io/blog/2013/08/09/zhong-guo-di-tu-zuo-biao-pian-yi-suan-fa-zheng-li/)。

可以看到还有一些第三方的坐标转换接口，例如：[地图纠偏](http://ditujiupian.com/)。

由于暂时没有这个需求，关于其转换算法啥的这里就不深究。

**本文历史**

* 2015 年 08 月 19 日 完成初稿
