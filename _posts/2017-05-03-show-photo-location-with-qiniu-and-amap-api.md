---
layout: post
title: "结合七牛和高德地图 API 显示照片位置"
description: "在苹果手机上，我们只要打开定位服务，就能在相簿中看到地图，地图上显示着在各地拍摄的相片。这些相片的地理位置，是通过手机 GPS 模块记录的，我们能看到图片文件的 EXIF 数据，保留了这些位置信息。"
date: 2017-05-03 15:00:00+0800
thumb: IMG_PATH/amap.png
category: tech
tags: ["七牛", "高德地图 API", "GPS"]
---

* toc
{:toc}

在苹果手机上，我们只要打开定位服务，就能在相簿中看到地图，地图上显示着在各地拍摄的相片。这些相片的地理位置，是通过手机 GPS 模块记录的，我们能看到图片文件的 EXIF 数据，保留了这些位置信息。

之前提到使用[七牛 API 显示相片的 EXIF 信息](/show-exif-data-of-photo.html)，作为保存在 EXIF 信息里的 GPS 信息，七牛图片 EXIF API 一样有数据，这也为实现显示图片地理位置信息提供便利。

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

![渡亭堤顶的花][p1]

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

那么这个坐标为 23°29’10.91”N, 116°46’36.49”E，也就是北纬 24 度 29 分 10.91 秒，东经 116 度 46 分 36.49 秒。

在各种互联网地图上，坐标是以度为单位的，东经北纬为正值，西经南纬为负值。这里需要将度分秒的经纬度转换以度为单位的[[1]][1]，因度分秒之间为 60 进制，故转换公式为：

    度分秒 = 度 + 分 / 60 + 秒 / (60 * 60)

计算后得出上面的坐标约为 `116.776803, 23.486364`。

坐标转换此前已经说过不少了，因在网页上使用，直接采用 coordtransform 模块[[2]][2] 即可，以上坐标转换为 GCJ02 是 `116.781381, 23.483788`。

可以使用高德的坐标拾取系统[[3]][3]，按坐标搜索一下，验证结果是否正确。

## 获取地址信息

有了坐标就有了地理位置，有了地理位置就知道是什么地方。高德地图逆地理编码 API[[4]][4] 正在招手：“给我一个坐标，我将还你一个详细地址。”

根据文档，最基本的只需 `location` 参数传个坐标即可返回地址信息。此 API 还可批量获取，可以根据自己需求传入可选的参数。

以上面获取的坐标为例：

    http://restapi.amap.com/v3/geocode/regeo?location=116.781381,23.48378&key=<用户的key>

请求后返回的 JSON 如下，具体返回的参数的详细说明参考文档。

```json
{
    "status": "1",
    "info": "OK",
    "infocode": "10000",
    "regeocode": {
        "formatted_address": "广东省汕头市澄海区莲下镇渡亭村",
        "addressComponent": {
            "country": "中国",
            "province": "广东省",
            "city": "汕头市",
            "citycode": "0754",
            "district": "澄海区",
            "adcode": "440515",
            "township": "莲下镇",
            "towncode": "440515102000",
            "neighborhood": {
                "name": [],
                "type": []
            },
            "building": {
                "name": [],
                "type": []
            },
            "streetNumber": {
                "street": "文明路",
                "number": "159号",
                "location": "116.78592,23.48872",
                "direction": "东北",
                "distance": "718.365"
            },
            "businessAreas": [
                []
            ]
        }
    }
}
```

试了几个，准确度一般般，到乡（镇、街道）这一级基本没问题。我们也不需要太准确的信息，毕竟定位信息有时候还是挺隐私的。

在本博客里，我使用 JS 将相片的地址信息写到 `img` 的 `title` 属性上，可以将鼠标移动到图片上试试。


## 显示相片地图

将图片显示在地图上，这似乎才是初衷，在这里，我将它分成两部分，一部分是静态地图，一部分是动态地图。

### 静态地图

将图片显示到静态地图上面，需要用到的高德地图 API 是静态地图 API[[5]][5]。

根据高德的文档，自定义标注（marker）图片只能支持 PNG 格式，我们先使用七牛图片 API[[6]][6] 将原图调下大小并指定输出格式。

    http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg?imageView2/1/w/100/h/100/format/png

上面的链接是输出等比缩放并居中裁剪的 100x100 PNG 格式图片，然而应用到高德接口还是出错了。我尝试在最后再加上 `.png`，结果成功，这意味着高德是以后缀名判断文件格式的，也是醉了。

    http://restapi.amap.com/v3/staticmap?zoom=12&size=640*427&scale=2&markers=-1,http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg?imageView2/1/w/100/h/100/format/png.png,0:116.781381,23.48378&key=<用户的key>

以上拼凑出的链接显示如下，可以说是最简单的。

![静态地图 API][p2]

高德静态地图 API 一样支持批量，具体可查看文档。

### 动态地图

想要在网页中实现跟苹果相册地图差不多样式且可控的地图，这就得用到高德地图 JS API，主要是用到点标记[[7]][7]，这里就不多废话了，直接上图。

{% include media.html type="iframe" src="//cdn.rawgit.com/fooleap/e8435c2f1f6764a7672ffbf0fd6e4698/raw/b359442370d543a8e4bc4fa72ad24af9b388bbaf/amap.html?location=116.781381,23.48378&image=http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg" %}

具体实例跟上面所提到的，我全放在 Gist，可查看[[8]][8]，也可使用 RawGit 预览[[9]][9]。

## 参考资料

[1]: https://zh.wikipedia.org/wiki/经纬度#.E7.B6.93.E7.B7.AF.E5.BA.A6.E8.A1.A8.E7.A4.BA.E5.8F.8A.E8.BD.89.E6.8F.9B "经纬度表示及转换"
[2]: https://github.com/wandergis/coordtransform "coordtransform 坐标转换"
[3]: http://lbs.amap.com/console/show/picker "高德地图坐标拾取"
[4]: http://lbs.amap.com/api/webservice/guide/api/georegeo/#regeo "逆地理编码 &#124; 高德地图API"
[5]: http://lbs.amap.com/api/webservice/guide/api/staticmaps "静态地图 &#124; 高德地图API"
[6]: https://developer.qiniu.com/dora/api/1279/basic-processing-images-imageview2 "图片基本处理 - 七牛开发者中心"
[7]: http://lbs.amap.com/api/javascript-api/reference/overlay#Marker "结合七牛和高德地图 API 显示照片位置 &#124; Fooleap's Blog"
[8]: https://gist.github.com/fooleap/e8435c2f1f6764a7672ffbf0fd6e4698 "结合七牛和高德地图 API 显示照片位置"
[9]: http://cdn.rawgit.com/fooleap/e8435c2f1f6764a7672ffbf0fd6e4698/raw/9e9e4e381afb99e62b7029c3495596bd5d7c54ec/show-photo-location-with-qiniu-and-amap-api.html "结合七牛和高德地图 API 显示照片位置（预览）"

**本文历史**

* 2017 年 05 月 03 日 完成初稿

[p1]: {{ site.IMG_PATH }}/show-photo-location-on-map-with-qiniu-and-amap-api.jpg_640 "莲阳河畔，渡亭堤顶的花"
[p2]: http://restapi.amap.com/v3/staticmap?zoom=12&size=640*427&scale=2&markers=-1,http://source.fooleap.org/show-photo-location-on-map-with-qiniu-and-amap-api.jpg?imageView2/1/w/100/h/100/format/png.png,0:116.781381,23.48378&key=890ae1502f6ab57aaa7d73d32f2c8cc1 "高德静态地图 API 显示相片位置"
