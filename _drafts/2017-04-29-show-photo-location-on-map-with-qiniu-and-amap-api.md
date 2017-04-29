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

之前提到使用[七牛 API 显示相片的 EXIF 信息](/show-exif-data-of-photo.html)，作为保存在 EXIF 信息里的 GPS 信息，七牛 API 一样有数据。也就是说在网页上利用七牛 API，也可以跟苹果手机一样，把相片显示到地图上。说到地图，那还得要一个地图的 API，最近比较喜欢高德地图，所以这里还是用高德的。

## 分析数据

![渡亭堤顶的花][p1]{:data-map="true"}

```json
{
    "GPSAltitude": {
        "val": "11.773",
        "type": 5
    },
    "GPSAltitudeRef": {
        "val": "Sea level",
        "type": 1
    },
    "GPSDateStamp": {
        "val": "2017:04:02",
        "type": 2
    },
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
    },
    "GPSSpeed": {
        "val": "0",
        "type": 5
    },
    "GPSSpeedRef": {
        "val": "K",
        "type": 2
    },
    "GPSTimeStamp": {
        "val": "08:45:24.00",
        "type": 5
    },
    "GPSTrack": {
        "val": " 0",
        "type": 5
    },
    "GPSTrackRef": {
        "val": "T",
        "type": 2
    }
}
```

## 显示地名

## 显示地图

### 显示静态地图

    http://restapi.amap.com/v3/staticmap?zoom=12&size=400*400&markers=-1,http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg?imageView2/1/w/50/h/50/format/png.png,0:116.78138121594507,23.483787707373565&key=您的key

![静态地图 API][p2]

### 显示可控制地图

[[1]][1]

http://restapi.amap.com/v3/geocode/regeo?key=890ae1502f6ab57aaa7d73d32f2c8cc1&location=116.78138121594507,23.483787707373565

[p1]: {{ site.IMG_PATH }}/show-photo-location-on-map-with-qiniu-and-amap-api.jpg_640 "莲阳河畔，渡亭堤顶的花"
[p2]: http://restapi.amap.com/v3/staticmap?zoom=12&size=640*427&markers=-1,http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg?imageView2/1/w/50/h/50/format/png.png,0:116.78138121594507,23.483787707373565&key=890ae1502f6ab57aaa7d73d32f2c8cc1 "高德静态地图 API 显示相片位置"

[1]: http://lbs.amap.com/api/webservice/guide/api/georegeo/#regeo "逆地理编码 &#124; 高德地图API"
[2]: http://lbs.amap.com/api/webservice/guide/api/staticmaps "静态地图 &#124; 高德地图API"

