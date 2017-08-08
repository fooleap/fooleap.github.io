---
layout: page
title: 百度坐标转换器
description: "GPS 坐标（WGS-84）或火星坐标（GCJ-02）批量转换为百度坐标（BD-09）"
tags: [百度坐标, 'GPS 坐标', 火星坐标, WGS-84, GCJ-02, BD-09, 'Google Earth', 'Google Maps']
permalink: /wgs84-or-gcj02-to-bd09/
---

<h2 id="from-title">GPS 坐标集（WGS-84）</h2>
<textarea id="coords" name="coords"></textarea>
<div id="form" class="other">
  <p><input type="radio" name="from" id="earth" checked>GPS 坐标</p>
  <p><input type="radio" name="from" id="maps">火星坐标</p>
  <p><input type="checkbox" id="newline" checked>换行</p>
  <p><input type="checkbox" id="bmappoint">创建百度点坐标</p>
  <p><input type="radio" class="var" name="var" id="var" disabled>坐标点赋值</p>
  <p><input type="radio" class="var" name="var" id="array" disabled>坐标数组赋值</p>
  <button id="submit">提交</button>
</div>
<div id="ps" class="other">
  <p>
    采用 <a href="http://developer.baidu.com/map/changeposition.htm">百度坐标转换 API</a><br>
    最多可转换 100 个坐标点<br>
    结果保留 6 位小数<br>
    制作 <a href="/bmaps-changeposition.html" target="_blank">说明</a> <a href="{{ site.IMG_PATH }}/bmaps-changeposition.gif">使用方法</a><br>
    使用场景 <a href="/bmaps-polyline.html" target="_blank">参考</a><br>
    TODO：<br>
    突破数量限制<br>
    支持文件上传转换<br>
  </p>
</div>
<div class="clear"></div>
<div class="bdmap">
<h2>百度坐标集（BD-09）</h2>
<pre id="result"><code></code></pre>
</div>
<style>
    a:after{content:none!important;}
    body{
      overflow-y:scroll;
    }
    #coords{
      border: 1px solid #ddd;
      color: #ddd;
      font-size: 12px;
      width: 478px;
      height: 320px;
      outline: none;
      display:inline-block;
      float:left;
      margin-top: 0;
    }
    input {
      width: 13px;
      height: 13px;
      padding: 0;
      margin-right: 5px;
      vertical-align: middle;
    }
    input[disabled]{
      opacity: .3;
      box-shadow: none;
      background: #ddd;
    }
    .var{
      margin-left: 18px;
    }
    .other{
     float:left;
     width:160px;
     text-align: center;
     margin: 0;
    }
    .other p{
      font-size: 13px;
      text-align: left;
      line-height: 20px;
      padding: 0 5px;
    }
    #form #submit{
      padding: 2px 10px;
      margin: 10px 0;
      width: 70%;
      background: #eee;
      border: 1px solid #ddd;
      border-radius:3px;
      cursor:pointer;
      outline:none;
      zoom:1;
    }
    #form #submit:hover{
      background: #ddd;
    }
    .clear{
      clear: both;
    }
    #result{
      max-width: 640px;
      height: 386px;
      font-size: 12px;
    }
    .bdmap{
      display:none;
    }
    @media screen and (max-width: 640px) {
      #coords{width:98%;margin:0 auto;}
      .other{width:50%;float:left}
      #result{width:100%;border-radius:none;padding:0}
    }
    </style>

<script src="//cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
<script src="{{ site.IMG_PATH }}/wgs84-or-gcj02-to-bd09.js"></script>
