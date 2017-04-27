---
layout: post
title: "转换 Nike+ 的坐标数据"
description: "前文已经提到，在取得 Nike+ API 提供的坐标数据之后，需要将坐标数据进行转换。Nike+ 数据采用的是 WGS84 坐标系统，若想用高德地图 API 来做显示，那么便需要将坐标转为 GCJ02 坐标系统对应的。"
date: 2017-04-27 13:30:00+0800
thumb: IMG_PATH/nikeplus.png
category: tech
tags: ["Nike+", "PHP"]
---

* toc
{:toc}

前文已经提到，在取得 Nike+ API 提供的坐标数据之后，需要将坐标数据进行转换。Nike+ 数据采用的是 WGS84 坐标系统，若想用高德地图 API 来做显示，那么便需要将坐标转为 GCJ02 坐标系统对应的。

## 坐标系统

目前，互联网三大坐标系统及各大互联网地图使用情况。

| 坐标系统         | 使用                                           |
|------------------|------------------------------------------------|
| 地球坐标 (WGS84) | Google Earth、Google Maps 国外、其他国外地图等 |
| 火星坐标 (GCJ02) | Google Maps 国内、高德地图、腾讯地图等         |
| 百度坐标 (BD09)  | 百度地图                                       |

## 坐标转换

毕竟需要处理大量的点，使用地图相关的 API 转换效率明显不如直接操算法。我转换时尝试了网上流传的算法，用起来还蛮准确的。

经搜索，发现 WGS84 转 GCJ02 算法似乎源自于 `EvilTransform.cs`[[1]][1]。我原来使用的是 wandergis 的 coordtransform[[2]][2]，用起来挺顺手的。后来亦发现 googollee 做了更多语言版本的库[[3]][3]。

## 实例应用

反正只需一次转换，干脆把转换这个过程留在后端。为此，我将 coordtransform 写成 PHP 版[[4]][4]。

话不多说，下面的实例是[利用 Nike+ API 获取的跑步路线数据](/use-nikeplus-api-to-get-coord.html)直接转换为[高德地图 API 显示跑步路线](/use-amap-api-to-show-running-line.html)可用的坐标数组。

```php
<?php
require_once('coordtransform.php');

$options = array(
    CURLOPT_URL => 'https://api.nike.com/sport/v3/me/activity/e39a37be-d4e8-4ef7-82cc-0b255c0f2834?metrics=longitude,latitude',
    CURLOPT_HEADER => false,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array('Authorization: Bearer ******')
);
$curl = curl_init(); 
curl_setopt_array($curl, $options);
$data = json_decode(curl_exec($curl)); // Nike API 返回 JSON 格式
curl_close($curl); 

$lng = array_search('longitude', array_column($data -> metrics, 'type'));
$lat = array_search('latitude', array_column($data -> metrics, 'type'));

$coordtransform = new CoordTransform();
foreach( $data -> metrics[$lng] -> values as $key => $item){
    $coord[$key] = $coordtransform->wgs84togcj02( $item -> value, $data -> metrics[$lat] -> values[$key] -> value );
};
$coord = json_encode($coord);
```

## 参考资料

[1]: https://on4wp7.codeplex.com/SourceControl/latest#EvilTransform.cs "EvilTransform.cs"
[2]: https://github.com/wandergis/coordtransform "coordtransform 坐标转换"
[3]: https://github.com/googollee/eviltransform "Transport coordinate between earth(WGS-84) and mars in china(GCJ-02)."
[4]: https://github.com/fooleap/coordtransform_php "coordtransform_php"

**本文历史**

* 2017 年 04 月 27 日 完成初稿
