---
layout: page
title: 路径坐标转换器
description: "用于 KML 路径数据、Nike+ API 路径数据转换成高德或百度地图 JS API 用坐标数组"
tags: [百度坐标, 'GPS 坐标', 火星坐标, WGS-84, GCJ-02, BD-09, 'Google Earth', 'Google Maps']
permalink: /path-coord-converter/
---

<div id="coordtransform" class="cf">
    <div class="file-input">
    <input type="file" id="file-input" />
    <label for="file-input" class="file-upload">选择文件</label>
    <label id="filename"></label>
    </div>
    <div class="file-format cf">
        <div class="file-format-label">
        输入坐标系：
        </div>
        <div class="file-format-item">
          <input type="radio" name="input-format" id="input-wgs84" checked />
          <label for="input-wgs84">地球坐标 (WGS84)</label>
        </div>
        <div class="file-format-item">
          <input type="radio" name="input-format" id="input-gcj02"/>
          <label for="input-gcj02">火星坐标 (GCJ-02)</label>
        </div>
    </div>
    <div class="file-output cf">
        <div class="file-output-label">
        输出坐标系：
        </div>
        <div class="file-output-item">
          <input type="radio" name="coordtrans" id="togcj02" value="to GCJ02" checked>
          <label for="togcj02">火星坐标 (GCJ-02)</label>
        </div>
        <div class="file-output-item">
          <input type="radio" name="coordtrans" id="tobd09" value="to BD09">
          <label for="tobd09">百度坐标 (BD-09)</label>
        </div>
    </div>
    <button id="submit">提交</button>
</div>
<textarea id="output" placeholder="可拖拽文件到文本框"></textarea>
<div id="map"></div>

**TODO**

- [x] 2016 年 05 月 25 日 完成 KML 文件格式输入转换
- [x] 2016 年 05 月 29 日 <del>增加对 Nike+ API v1 格式支持</del>
- [x] 2016 年 06 月 11 日 增加对 Nike+ API v3 格式支持
- [x] 2016 年 08 月 28 日 增加对 KMZ 文件格式支持
- [x] 2016 年 09 月 04 日 增加文件拖拽上传
- [x] 2016 年 09 月 08 日 增加对 GPX 格式的支持
- [x] 2016 年 09 月 10 日 增加结果显示高德静态地图
- [x] 2016 年 09 月 12 日 自选输入数据采用坐标
- [] 支持导出 GPX 文件

<style>
#coordtransform input {
  display: none;
}
*{
  box-sizing: border-box;
}
.file-input{
  line-height: 30px;
}
.file-format,
.file-output,
.file-format-item,
.file-output-item{
  float: left;
}
.file-format label,
.file-output label{
  text-align: center;
  width: 150px;
  font-size: 12px;
  margin-right:  10px;
  border-radius: 2px;
  display: inline-block;
  border: 1px solid #c4daea;
}
.file-format-item:last-child label{
  margin-left: -1px;
}
.file-format input:checked + label,
.file-output input:checked + label{
  border-color:  #999;
  z-index: 2;
  position: relative;
}
#output{
    display: block;
    width: 100%;
	height: 180px;
    margin: 0;
	font-size: 12px;
    padding: 5px;
	font-family: RobotoDraft, 微软雅黑, sans-serif;
    border-radius: 2px;
}
#coordtransform {
    line-height: 30px;
    margin: 5px 0;
}
#coordtransform label{
    line-height: 30px;
    display: inline-block;
    cursor: pointer;
}
#coordtransform #filename{
    padding: 0;
	font-size: 12px;
}
#coordtransform .file-upload,
#coordtransform  button{
  font-family: 微软雅黑,san-serif;
  display: inline- block;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  line-height: 30px;
  height: 30px;
  padding: 0;
  margin: 5px 0;
  width: 120px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 2px;
  text-align: center;
}
#map{
    transition: height 1s;
    height: 427px;
    overflow: hidden;
}
#map:empty{
    height: 0;
}
</style>
<script src="//cdn.bootcss.com/jszip/3.1.3/jszip.min.js"></script>
<script src="{{ site.IMG_PATH }}/path-coord-converter.js"></script>
