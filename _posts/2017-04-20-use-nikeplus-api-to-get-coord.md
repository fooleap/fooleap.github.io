---
layout: post
title: "利用 Nike+ API 获取跑步路线数据"
description: "常光临小博的博友不难发现，去年晒的几次跑步均有带上跑步路线地图，那么都是怎么实现的呢？这事暂且分两步来说，一是获取数据，二是显示地图。这篇主要讲获取数据部分。"
date: 2017-04-20 19:20:00+0800
thumb: IMG_PATH/nikeplus.png
category: tech
tags: ["Nike+", "Nike+ API", "PHP", "cURL"]
---

* toc
{:toc}

常光临小博的博友不难发现，去年晒的几次跑步均有带上跑步路线地图，那么都是怎么实现的呢？这事暂且分两步来说，一是获取数据，二是显示地图。这篇主要讲获取数据部分。

讲正事之前，我先废话几句。跑步好处多多，对身体的好处不说，跑步爱好者就是喜欢各种装逼，有些人去参加马拉松就是为了去拍照的。我极少自拍，但几乎每次跑步途中都会拍几张图，跑步后贴到社交平台时间线，后面整理也有一些会贴到博客里面来。

## 折腾过程

作为地理爱好者的我，对跑步路线地图十分喜欢，于是就有了把跑步路线贴到博文中的想法。如何显示跑步路径这个问题令我头疼许久，要显示地图，就得获取到组成跑步折线相应的坐标数据，下面是我逐步实践的一个过程。

刚开始，我觉得只要自己根据跑步路线，地图上描点再用地图 API 画出来，大致差不多就行，于是就用 Google Earth 描点，并导出 KML 文件进行处理。

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: Google Earth 画线 
op2=>operation: 转换坐标
op3=>operation: 地图 API 画线

st(right)->op1(right)->op2(right)->op3(right)->e
```

**虽操作还算简单，但略显繁琐，且折线并非跑步的实际路线，显得有点 LOW，装逼还得认真点。**

随后，我将目光转向 Nike+，因为 Nike+ 官网本身就有令人羡慕的跑步路线地图，肯定就有相应的坐标数据。不求能实现得跟他一模一样，哪怕窃取一小部分也可。

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: Nike+ API 获取数据
op2=>operation: 转换坐标
op3=>operation: 地图 API 画线

st(right)->op1(right)->op2(right)->op3(right)->e
```

操作起来不算复杂，只需要去官网复制一个 ID 即可获取到相应的数据。这样做有个问题，每次转换坐标后得到的坐标数组太大了，经研究发现 Nike+ 大概每 10 米描一个点，跑个半马点的数量就是 2100 个。

**把坐标数据放进一个静态页面里，真不是理智的方法，亏我好几次贴地图都是使用这种方法。**

每次贴地图都需要操作好几个步骤，写篇博文略显麻烦，我觉得应该处理成传一个参数（活动 ID）即可返回跑步地图，后来我就将几个手动步骤写成脚本，直接显示地图。

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: Nike+ API 获取数据
op2=>operation: 直接转换坐标
op3=>operation: 并使用地图 API 画线

st(right)->op1(right)->op2(right)->op3(right)->e
```

**目前脚本用起来还算比较方便舒心，就是一旦 Nike+ API 有了变化，脚本就不能用，到时候再想办法解决。**

## 实现流程

从前文不难看出，想要实现画跑步路线地图，大致流程如下：

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 获取数据
op2=>operation: 转换坐标
op3=>operation: 显示地图

st(right)->op1(right)->op2(right)->op3(right)->e
```

以上步骤缺一不可，获取数据是前提，转换坐标是必需，显示地图则是重点。

1. Nike+ 官网本身就有跑步轨迹的显示，使用官网所用的 API 获取是准确的方法
2. 转换坐标是我国多出的一步，Nike+ 所采用的是 WGS84 坐标系统，应将坐标点转换为地图 API 所采用的，路线才能在地图上正确显示，坐标转换在[《百度地图坐标转换》](/bmaps-changeposition.html)已经有所提及
3. 地图具体能折腾成什么样，还是取决于地图 JS API 以及前端技能的熟练程度

## Nike+ API

去年早些时候，去 Nike+ 开发者门户网站[[1]][1]学习，但发现自己并无法获取到相关的 API Keys。不过在网站里有个 TEST CONSOLE，登录后可获得一个临时授权。使用 GPS Data[[2]][2] 这个 API 便可以轻松获取相关的坐标数据。

后来，Nike+ 网站改版，官网的 API 也升级为 V3 版，在此之后的 `activityId`，前面所说的 API V1 没法再用，获取不到 GPS 数据，也找不着 API V3 的相关文档。那我也只能硬着头皮在官网按 `F12` 去研究，寻找获取坐标数据的 API。

最终，发现 Nike+ 获取单次活动的 API 是这样的：

    https://api.nike.com/sport/v3/me/activity/{activityId}

其中 `activityId` 是单次活动的 ID，在 Nike+ 官网查看源码、或点开某次活动后在地址栏，都可以找到。

这个接口返回的数据挺详细，详细到感觉文件有点大，其中有 `metric` 所有类型名的数组 `metric_types`。需要详细数据时，可通过 `metrics` 这个参数来指定，默认指定 `all` 则代表获取所有数据。具体的实例如下（只取经纬坐标的详细数据）：

    https://api.nike.com/sport/v3/me/activity/e39a37be-d4e8-4ef7-82cc-0b255c0f2834?metrics=longitude,latitude

以上链接复制至浏览器打开，妥妥的提示未授权，返回去看官网那个请求头，发现字段 `Authorization`。

使用 PHP cURL 加上这个授权码去请求，成功返回想要的数据。

```php
<?php 
$options = array(
    CURLOPT_URL => 'https://api.nike.com/sport/v3/me/activity/e39a37be-d4e8-4ef7-82cc-0b255c0f2834?metrics=longitude,latitude',
    CURLOPT_HEADER => false,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array('Authorization: Bearer ******')
);
$curl = curl_init(); 
curl_setopt_array($curl, $options);
$data = curl_exec($curl); 
curl_close($curl); 
?>
```

本以为这个授权码会很快过期，可没想到几个月还一直能用，干脆就不考虑如何获取授权码的问题。后来亦发现官网在 LocalStorage 也存了不同的授权码，只不过其生命只有一个小时。

## 参考资料

[1]: https://developer.nike.com/ "Nike+ Developer Portal"
[2]: https://developer.nike.com/documentation/api-docs/activity-services/gps-data.html "GPS Data"

**本文历史**

* 2017 年 04 月 20 日 完成初稿
