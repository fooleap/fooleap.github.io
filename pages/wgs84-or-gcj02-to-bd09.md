---
layout: page
title: 百度坐标转换器
description: "GPS 坐标（WGS-84）或火星坐标（GCJ-02）批量转换为百度坐标（BD-09）"
tags: [百度坐标, 'GPS 坐标', 火星坐标, WGS-84, GCJ-02, BD-09, 'Google Earth', 'Google Maps']
permalink: /wgs84-or-gcj02-to-bd09/
scripts: true
jquery: true
js: true
style: true
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
<!--<style>
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
    </style>-->

<!--<script>
  $('#coords').height($('#coords').width()*2/3);
  var def_coords = '格式：经度,纬度;经度,纬度;...（亦可使用 Google Earth/Maps 路径导出的 KML 坐标集数据）';
  $('#coords').html(def_coords);
  function textcolor (){
    switch ($('#coords').val()){
      case def_coords:
        $('#coords').css('color','#ccc');
        break;
      default:
        $('#coords').css('color','#333');
      }
  }
  window.onload = new function(){textcolor();};
  $('#coords').on('focus', function() {
    if( $(this).val() == def_coords ){$(this).empty()}
    textcolor()
  });
  $('#coords').on('blur', function() {
    if( $(this).val() == '' ){ $(this).html(def_coords) }
    textcolor()
  });
  $('#earth').trigger('click');
  var from = '1';
  function changer (word, digit){
    $('#from-title').html(word)
    from = digit;
  }
  $('#earth').on('change', function(){
    changer('GPS 坐标集（WGS-84）', '1');
  });
  $('#maps').on('change', function(){
    changer('火星坐标集（GCJ-02）', '3');
  });
  $('#bmappoint').on('change', function(){
    if ($('#bmappoint').is(':checked')){
      $('#var,#array').removeAttr('disabled');
    } else {
      $('#var,#array').attr('disabled','true');
      $("input[name='var']").each(function(){
        this.checked=false;
      });
    };
  });
  $('#submit').click(function(){
    var txt = $('#coords').val().replace(/，/g,',').replace(/；|,0\.0|,0/g,';').replace(/[^0-9,;\.]/g,'');
    txt = ( txt.charAt(txt.length-1) ==";") ? txt.substring(0,txt.length-1) : txt;
    var zburl = 'http://api.map.baidu.com/geoconv/v1/?from=' + from + '&to=5&output=json&ak=FCcc6261f101cd4ccefee22113a609de&coords=' + txt;
    points = new Array();
    $.ajax({
      type : "get", 
      async: false,  
      dataType : "jsonp",
      jsonp: "callback",
      url: zburl,
      success: function (data) {
        switch (data.status) {
          case 4:
            alert('数据含有非天朝坐标！');  
            break;
          case 24:
            alert('输入的数据格式有误！');
            break;
          case 25:
            alert('输入坐标点超过 100 个！');
            break;
          default:
            $('.bdmap').fadeIn();
        }
        $('#result').empty();
        for (var i=0;i<data.result.length;i++) {
          var coords = data.result[i].x.toFixed(6) + ',' + data.result[i].y.toFixed(6);
          if ($('#bmappoint').is(':checked')){
            if ($('#var').is(':checked')){
              var num = (i<9) ? '0' + (1+i).toString() : (1+i).toString();
              $('#result').append('var point'+num+' = ' + 'new BMap.Point('+ coords +'); ');
              points.push(" point" + num )
            } else{
              $('#result').append('new BMap.Point('+ coords +'), ');
            }
          } else {
            $('#result').append( coords +';');
          };
          if ($('#newline').is(':checked')){
            $('#result').append('<br>');
          };
        };
        if ($('#bmappoint').is(':checked') && $('#array').is(':checked')){
          if ($('#newline').is(':checked')){
             $('#result').prepend('<br>');
          };
          $('#result').html('var points = [ '+$('#result').html()+']');
        }
        if ($('#bmappoint').is(':checked') && $('#var').is(':checked')){
          $('#result').append('var points = ['+ points +' ];');
        }
      }
    });
  });
  </script>-->
