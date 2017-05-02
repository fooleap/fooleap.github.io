---
layout: post
title: "结合七牛和高德地图 API 显示照片位置"
description: ""
date: 2017-04-28 09:00:00+0800
thumb: IMG_PATH/amap.png
category: tech
tags: ["七牛", "高德地图 API", "GPS"]
---

* toc
{:toc}

在苹果相簿中可以看到地图，地图上显示着在各地拍摄的相片，而这些相片的地理位置，是通过手机的 GPS 模块记录的。iOS 是调用哪里的位置信息不得而知，但我们能看到相片文件的 EXIF 信息，也保留了这些位置信息。

之前提到使用[七牛 API 显示相片的 EXIF 信息](/show-exif-data-of-photo.html)，作为保存在 EXIF 信息里的 GPS 信息，七牛的图片 API 一样有 GPS 信息数据，这也为实现显示图片地理位置信息提供便利。

## 实现流程

我们可以在网页上利用七牛 API，把相片地址信息显示出来，亦可以跟苹果手机一样，直接将图片显示到地图上，实现流程大致如下：

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 请求数据
op2=>operation: 转换坐标
op3=>operation: 显示地址

st(right)->op1(right)->op2(right)->op3(right)->e
```

* **请求数据：**利用七牛 API `GET` 请求获取图片的 GPS 信息
* **转换坐标：**因相片的坐标数据是以 WGS84 坐标系统为准的，还是得转换坐标
* **显示地址：**可以通过一个地图 API 实现，这里还是采用高德地图 API

## 获取坐标

我们还是以一张图片为例，来分析下如何实现。

![渡亭堤顶的花][p1]{:data-map="true"}

上图是上月 2 号在汕头市澄海区莲下镇渡亭村莲阳河畔拍的花，其图片地址如下：

    http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg

那么，七牛图片 EXIF 信息的接口如下：
    
    http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg?exif

直接用浏览器打开，可以很方便地找到所有 GPS 开头的属性。其中，海拔等数据可以忽略掉，位置信息最为重要的是经纬坐标，即以下四个值：

```json
{
    "GPSLatitude": {
        "val": "23, 29, 10.91",
        "type": 5
    },
    "GPSLatitudeRef": {
        "val": "N",
        "type": 2
    },
    "GPSLongitude": {
        "val": "116, 46, 36.49",
        "type": 5
    },
    "GPSLongitudeRef": {
        "val": "E",
        "type": 2
    }
}
```

看到这几个值，也就是说这个坐标为 23°29'10.91"N, 116°46'36.49"E，也就是北纬 24 度 29 分 10.91 秒，东经 116 度 46 分 36.49 秒。

在各种互联网地图上，坐标是以度为单位的，东经北纬为正值，西经南纬为负值。这里需要将度分秒的经纬度转换以度为单位的[[1]][1]，因度分秒之间为 60 进制，故转换公式为：

    度分秒 = 度 + 分 / 60 + 秒 / (60 * 60)

也就是说上面的坐标约为 `116.776803, 23.486364`。

坐标转换此前已经说过不少了，因在网页上使用，直接采用 coordtransform 模块[[2]][2] 即可，以上坐标转换为 GCJ02 是 `116.781381, 23.483788`。

可以使用高德的坐标拾取系统[[3]][3]，按坐标搜索一下，验证结果是否正确。

## 获取地址信息

有了坐标就有了地理位置，有了地理位置就知道那是什么地方。高德地图逆地理编码 API[[4]][4] 正在招手：“给我一个坐标，我将还你一个详细地址。”

    http://restapi.amap.com/v3/geocode/regeo?location=116.781381,23.48378&key=<用户的key>


## 显示地图

### 显示静态地图

    http://restapi.amap.com/v3/staticmap?zoom=12&size=400*400&markers=-1,http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg?imageView2/1/w/50/h/50/format/png.png,0:116.78138121594507,23.483787707373565&key=您的key

![静态地图 API][p2]

### 显示可控制地图

http://restapi.amap.com/v3/geocode/regeo?key=890ae1502f6ab57aaa7d73d32f2c8cc1&location=116.78138121594507,23.483787707373565


## 参考资料
[1]: https://zh.wikipedia.org/wiki/经纬度#.E7.B6.93.E7.B7.AF.E5.BA.A6.E8.A1.A8.E7.A4.BA.E5.8F.8A.E8.BD.89.E6.8F.9B "经纬度表示及转换"
[2]: https://github.com/wandergis/coordtransform "coordtransform 坐标转换"
[3]: http://lbs.amap.com/console/show/picker "高德地图坐标拾取"
[4]: http://lbs.amap.com/api/webservice/guide/api/georegeo/#regeo "逆地理编码 &#124; 高德地图API"
[5]: http://lbs.amap.com/api/webservice/guide/api/staticmaps "静态地图 &#124; 高德地图API"

**本文历史**

* 2017 年 05 月 02 日 完成初稿

[p1]: {{ site.IMG_PATH }}/show-photo-location-on-map-with-qiniu-and-amap-api.jpg_640 "莲阳河畔，渡亭堤顶的花"
[p2]: http://restapi.amap.com/v3/staticmap?zoom=12&size=640*427&markers=-1,http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg?imageView2/1/w/50/h/50/format/png.png,0:116.78138121594507,23.483787707373565&key=890ae1502f6ab57aaa7d73d32f2c8cc1 "高德静态地图 API 显示相片位置"
