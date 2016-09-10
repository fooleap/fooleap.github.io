---
layout: page
title: 路径坐标转换器
description: "用于 KML 路径数据、Nike+ API 路径数据转换成高德或百度地图 JS API 用坐标数组"
tags: [百度坐标, 'GPS 坐标', 火星坐标, WGS-84, GCJ-02, BD-09, 'Google Earth', 'Google Maps']
permalink: /path-coord-converter/
scripts: ["/assets/js/coordtransform.js","/assets/js/jszip.min.js"]
style: true
js: true
---

<div id="coordtransform" class="cf">
    <div class="file-submit">
        <input type="radio" name="coordtrans" id="togcj02" value="to GCJ02" checked>
        <label for="togcj02">to GCJ02</label>
        <input type="radio" name="coordtrans" id="tobd09" value="to BD09">
        <label for="tobd09">to BD09</label>
        <button id="submit">提交</button>
    </div>
    <input type="file" id="file-input" />
    <label for="file-input" class="file-upload">选择文件</label>
    <label id="filename"></label>
</div>
<textarea id="output" placeholder="可拖拽文件到文本框"></textarea>
<div id="map"></div>

**TODO**

* 自选数据源的采用坐标

**历史记录**

* 2016 年 05 月 25 日 完成 KML 文件格式输入转换
* 2016 年 05 月 29 日 <del>增加对 Nike+ API v1 格式支持</del>
* 2016 年 06 月 11 日 增加对 Nike+ API v3 格式支持
* 2016 年 08 月 28 日 增加对 KMZ 文件格式支持
* 2016 年 09 月 04 日 增加文件拖拽上传
* 2016 年 09 月 08 日 增加对 GPX 格式的支持
* 2016 年 09 月 10 日 增加结果显示高德静态地图

<!--<style>
input {
  vertical-align: middle;
  cursor: pointer;
}
input[type="file"] {
    display: none;
}
#output{
    display: block;
    width: 100%;
	height: 375px;
    margin: 0;
	font-size: 12px;
	font-family: sans-serif;
}
#coordtransform {
    line-height: 20px;
    margin: 5px 0;
}
#coordtransform label{
    line-height: 25px;
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
  padding: 2px 8px;
  line-height: 15px;
  font-size: 12px;
  cursor: pointer;
}
#map{
    transition: height 1s;
    height: 427px;
    overflow: hidden;
}
#map:empty{
    height: 0;
}
.file-submit {
    float: right
}
</style>-->
<!--<script>
var gps, gpsArrays, contents;
var output = document.getElementById('output');

function coord(type){
    var jsonContents = JSON.parse(contents).metrics;
    for(var i = 0; i < jsonContents.length;i++){
        if(jsonContents[i].type == type){
            return i;
        }
    }
}

function readKML(data){
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, 'text/xml');
    var coordinates = xmlDoc.querySelectorAll('LineString coordinates');
    var gpspoints;
    for (var i = 0; i < coordinates.length; i++) {
        gpsArrays[i] = [];
        gps[i] = coordinates[i].innerHTML.replace(/^\s+|\s+$|\.0\ |<coordinates>|<\/coordinates>/g, '').split(',0 ');
        for (var e in gps[i]) {
            gpsArrays[i][e] = {
                'lng': parseFloat(gps[i][e].split(',')[0]),
                'lat': parseFloat(gps[i][e].split(',')[1])
            }
        }
    }
    output.innerHTML = data;
    return gpsArrays;
}

function readGPX(data){
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, 'text/xml');
    var coordinates = xmlDoc.getElementsByTagName('trkpt');
    gpsArrays[0] = [];
    for (var i = 0; i < coordinates.length; i++ ){
        gpsArrays[0][i] = { 
            'lng':parseFloat(coordinates[i].getAttribute('lon')),
            'lat':parseFloat(coordinates[i].getAttribute('lat'))
        };
    }
    output.innerHTML = data;
    return gpsArrays;
}

function readNike(data){
    gpsArrays[0] = [];
    // api v3
    jsonContents = JSON.parse(contents).metrics;
    var lng = coord('longitude');
    var lat = coord('latitude');
    for(var i = 0; i < jsonContents[lng].values.length; i++) {
        gpsArrays[0][i] = {
            'lng': parseFloat(jsonContents[lng].values[i].value),
            'lat': parseFloat(jsonContents[lat].values[i].value)
        }
        /** api v1
         *for(var i = 0; i < JSON.parse(contents).waypoints.length; i++) {
         *gpsArrays[0].push({
         *    'lng': parseFloat(JSON.parse(contents).waypoints[i].longitude),
         *    'lat': parseFloat(JSON.parse(contents).waypoints[i].latitude)
         *})
         */
    }
    output.innerHTML = data;
    return gpsArrays;
}

function readFile(file) {
    if (file) {
        var reader = new FileReader();
        reader.onloadstart = function() {
            output.innerHTML =  '读取中...';
        };
        reader.onload = function(e) {
		    contents = e.target.result;
            gps = [];
            gpsArrays = [];
            if (file.name.indexOf('gpx') > -1){
                gpsArrays = readGPX(contents);
            } else if (file.type == 'application/vnd.google-earth.kml+xml' ) {
                gpsArrays = readKML(contents);
            } else if(file.type == 'application/vnd.google-earth.kmz'){
                JSZip.loadAsync(file).then(function(zip) {
                    return zip.file('doc.kml').async("string");
                }).then(function (text) {
                    contents = text;
                    gpsArrays = readKML(contents);
                })
            } else if (contents.indexOf('com.nike') > -1) {
                gpsArrays = readNike(contents);
            } else {
                alert("请选择正确格式文件！");
                output.innerHTML = '';
				return;
            }
			document.getElementById('filename').innerHTML = file.name;
            document.getElementById('map').innerHTML = '';
        }
        reader.readAsText(file);
        //reader.readAsBinaryString(file);
    } else {
        alert("请选择文件！");
    }
}

function showMap(path){
    var pathData = "";
    for(var i = 0; i< path.length; i++ ) {
        if( i > 0 ){
            pathData += '|';
        }
        pathData += '2,0x52EE06,1,,:'+ path[i].join(';');
    }
    if( path.length <= 4 && pathData.length < 30000 ) {
        var map = new Image(640, 427);
        console.log(pathData)
        map.src = 'http://restapi.amap.com/v3/staticmap?size=640*427&paths='+ pathData +'&key=ee95e52bf08006f63fd29bcfbcf21df0';
        map.onload = function(){
            document.getElementById('map').appendChild(map);
        }
    } else {
        document.getElementById('map').innerHTML = '';
    }
}

function transform() {
    var gcj02Arrays = [];
    var bd09Arrays = [];
    var outputData = '';
    var result = [];
    var path = [];
    for (var i = 0; i< gpsArrays.length; i++ ) {
        gcj02Arrays[i] = [];
        path[i] = [];
        if ( contents.indexOf('garmin') > -1 || contents.indexOf('xmlns:gx') > -1 || contents.indexOf('com.nike') > -1){
            result[i] = [];
            for (var e = 0; e < gpsArrays[i].length; e ++) {
                result[i].push(coordtransform.wgs84togcj02(gpsArrays[i][e].lng, gpsArrays[i][e].lat));
                result[i][e] = result[i][e].toString().split(',');
                gcj02Arrays[i].push({
                    'lng': result[i][e][0],
                    'lat': result[i][e][1]
                });
                path[i][e] = parseFloat(result[i][e][0]).toFixed(5)+',' + parseFloat(result[i][e][1]).toFixed(5);
            }
        } else {
            gcj02Arrays[i] = gpsArrays[i];
            for (var e = 0; e < gpsArrays[i].length; e ++) {
                path[i][e] = parseFloat(gpsArrays[i][e].lng).toFixed(5)+',' + parseFloat(gpsArrays[i][e].lat).toFixed(5);
            }
        }
    }
    showMap(path);
    if (document.getElementById('togcj02').checked == true) {
        for (var i = 0; i < gcj02Arrays.length; i++) {
            var lineNo = gcj02Arrays.length == 1 ? '': i.toString();
            outputData += 'var lineArr' + lineNo + ' = [\n';
            for (var e in gcj02Arrays[i]) {
                outputData += '  [' + parseFloat(gcj02Arrays[i][e].lng).toFixed(14) + ', ' + parseFloat(gcj02Arrays[i][e].lat).toFixed(14) + '],\n';
            }
            outputData = outputData.substring(0, outputData.length -2 ) + '\n];\n';
        }
    }
    if (document.getElementById('tobd09').checked == true) {
        for (var i in gcj02Arrays) {
            bd09Arrays[i] = [];
            result[i] = [];
            for (var e in gcj02Arrays[i]) {
                result[i].push(coordtransform.gcj02tobd09(gcj02Arrays[i][e].lng, gcj02Arrays[i][e].lat));
                result[i][e] = result[i][e].toString().split(',');
                bd09Arrays[i].push({
                    'lng': result[i][e][0],
                    'lat': result[i][e][1]
                });
            }
        }
        for (var i = 0; i < bd09Arrays.length; i++) {
            var lineNo = bd09Arrays.length == 1 ? '': i.toString();
            outputData += 'var points' + lineNo + ' = [\n';
            for (var e in bd09Arrays[i]) {
                outputData += '  new BMap.Point(' + parseFloat(bd09Arrays[i][e].lng).toFixed(14) + ', ' + parseFloat(bd09Arrays[i][e].lat).toFixed(14) + '),\n';
            }
            outputData = outputData.substring(0, outputData.length - 2) + '\n];\n';
        }
    }
    output.innerHTML = outputData;
}

function prevent(e){
    e.stopPropagation();
    e.preventDefault();
}

function dropFile(e){
    e.stopPropagation();
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    readFile(file);
}

function chooseFile(e){
    var file = e.target.files[0];
    readFile(file);
}

document.getElementById('file-input').addEventListener('change', chooseFile, false);
document.getElementById('submit').addEventListener('click', transform, false);
output.addEventListener('drop', dropFile, false);
output.addEventListener('dropend', prevent, false);
output.addEventListener('dropover', prevent, false);
</script>-->
