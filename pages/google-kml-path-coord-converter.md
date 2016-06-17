---
layout: page
title: KML 路径坐标转换器
description: "可将 Google Earth/Maps 导出的 KML 转换成高德或百度地图 JS API 用坐标集。"
tags: [百度坐标, 'GPS 坐标', 火星坐标, WGS-84, GCJ-02, BD-09, 'Google Earth', 'Google Maps']
permalink: /google-kml-path-coord-converter/
scripts: ["/assets/js/coordtransform.js"]
style: true
js: true
---

<div id="coordtransform">
<label class="file-upload">
    <input type="file" id="kml-input" />
    选择文件
</label>
<label id="filename"></label>
<label><input type="radio" name="coordtrans" id="togcj02" value="to GCJ02" checked><span class="radio-input"></span>to GCJ02</label>
<label><input type="radio" name="coordtrans" id="tobd09" value="to BD09"><span class="radio-input"></span>to BD09</label>
<label><button id="submit">提交</button></label>
</div>
<textarea id="output"></textarea>

<!--<style>
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
    padding-left: 20px;
    line-height: 25px;
    display: inline-block;
}
#coordtransform #filename{
    padding: 0;
	font-size: 12px;
}
#coordtransform .file-upload,#coordtransform  button{
  display: inline-block;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  padding: 2px 8px;
  line-height: 15px;
  font-size: 12px;
  cursor: pointer;
}
#coordtransform input[type=radio]{
    display: none;
}
#coordtransform .radio-input {
    position: relative;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 2px 0 -14px;
    vertical-align: middle;
    border: 1px solid #dcdcdc;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background-color: #fff;
}
#coordtransform input[type=radio]:checked + .radio-input:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    margin: 2px;
    content: '';
    border: 0;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    background-color: #999;
}
</style>-->
<!--<script>
var gps, gpsArrays, contents;
function readKML(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
		    contents = e.target.result;
            gps = [];
            gpsArrays = [];
            if (file.type == 'application/vnd.google-earth.kml+xml') {
                var contentsArray = contents.split('</tessellate>');
                for (var i = 1; i <= contentsArray.length - 1; i++) {
                    gpspoints = contentsArray[i].split('<coordinates>')[1].split('</coordinates>')[0].replace(/^\s+|\s+$|\.0/g, '');
                    gps.push(gpspoints.substring(0, gpspoints.length - 2).split(',0 '));
                }
                for (var i = 0; i < gps.length; i++) {
                    gpsArrays[i] = [];
                    for (var e in gps[i]) {
                        gpsArrays[i][e] = {
                            'lng': parseFloat(gps[i][e].split(',')[0]),
                            'lat': parseFloat(gps[i][e].split(',')[1])
                        }
                    }
                }
            } else if (contents.indexOf('nike') > -1) {
                    gpsArrays[0] = [];
                    // api v3
                    jsonContents = JSON.parse(contents).metrics;
                    for(var i = 0; i < jsonContents[jsonContents.length-1].values.length; i++) {
                    gpsArrays[0][i] = {
                        'lng': parseFloat(jsonContents[jsonContents.length-2].values[i].value),
                        'lat': parseFloat(jsonContents[jsonContents.length-1].values[i].value)
                    }
                    /** api v1
                     *for(var i = 0; i < JSON.parse(contents).waypoints.length; i++) {
                     *gpsArrays[0].push({
                     *    'lng': parseFloat(JSON.parse(contents).waypoints[i].longitude),
                     *    'lat': parseFloat(JSON.parse(contents).waypoints[i].latitude)
                     *})
                     */
                }
            } else {
                alert("请选择正确格式文件！");
				return;
            }
			document.getElementById('filename').innerHTML = file.name;
			document.getElementById('output').innerHTML = contents;
        }
        reader.readAsText(file);
    } else {
        alert("读取失败");
    }
}
function transform() {
    var gcj02Arrays = [];
    var bd09Arrays = [];
    var output = '';
    var result = [];
    for (var i in gpsArrays) {
        gcj02Arrays[i] = [];
        if (contents.indexOf('xmlns:gx') > -1 || contents.indexOf('nike') > -1){
            result[i] = [];
            for (var e in gpsArrays[i]) {
                result[i].push(coordtransform.wgs84togcj02(gpsArrays[i][e].lng, gpsArrays[i][e].lat));
                result[i][e] = result[i][e].toString().split(',');
                gcj02Arrays[i].push({
                    'lng': result[i][e][0],
                    'lat': result[i][e][1]
                });
            }
        } else {
            gcj02Arrays[i] = gpsArrays[i];
        }
    }
    if (document.getElementById('togcj02').checked == true) {
        for (var i = 0; i < gcj02Arrays.length; i++) {
            var lineNo = gcj02Arrays.length == 1 ? '': i.toString();
            output += 'var lineArr' + lineNo + ' = [\n';
            for (var e in gcj02Arrays[i]) {
                output += '  [' + parseFloat(gcj02Arrays[i][e].lng).toFixed(14) + ', ' + parseFloat(gcj02Arrays[i][e].lat).toFixed(14) + '],\n';
            }
            output = output.substring(0, output.length -2 ) + '\n];\n';
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
            output += 'var points' + lineNo + ' = [\n';
            for (var e in bd09Arrays[i]) {
                output += '  new BMap.Point(' + parseFloat(bd09Arrays[i][e].lng).toFixed(14) + ', ' + parseFloat(bd09Arrays[i][e].lat).toFixed(14) + '),\n';
            }
            output = output.substring(0, output.length - 2) + '\n];\n';
        }
    }
    document.getElementById('output').innerHTML = output;
}
document.getElementById('kml-input').addEventListener('change', readKML, false);
document.getElementById('submit').addEventListener('click', transform, false);
</script>-->
