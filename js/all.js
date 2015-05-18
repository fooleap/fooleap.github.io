jQuery(document).ready(function($){       
  //链接
  $("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").attr('target','_blank');
  
  //菜单
  _nav = $('.navigation');
  $('html').click(function() {
    if( _nav.hasClass('show') ){
      _nav.removeClass('show').addClass('hide'); 
    };
  });
  _nav.click(function(event){
    event.stopPropagation();
    if (event.target.id == 'top'){
      $(this).removeClass('show').addClass('hide');
    };
  });
  $('.avatar').click(function(event){
    if(_nav.hasClass('hide')){
      _nav.removeClass('hide').addClass('show');
    } else {
      _nav.removeClass('show').addClass('hide');
    };
  });
   
  //图片
  var maxwidth=640; 
  var post_img=$('.post-content img');
  var _w = parseInt($(window).width());
  function imgload(){
  if (post_img){
    $.each(post_img,function(){
      var real_img = new Image();
      real_img.src = $(this).attr('src');
      var realwidth = real_img.width;
      $(this).parent().addClass('image');
      $(this).wrap("<figure></figure>");
      if (realwidth >= maxwidth||_w<800){ 
        $(this).css('cursor','pointer').click(function(){window.open(real_img.src.split(/(\?|\_)/)[0],'_blank');});
      }else{
        $(this).css('width','auto');
      };
    });
    //EXIF
    post_img.hover(function(){
      var hover_img= $(this);
      var img_exif =  hover_img.attr('src').split(/(\?|\_)/)[0]+"\?exif";
      $.ajax({
            type: "GET",
            url: img_exif,
            dataType: "json",
            success: function (exif) {
            if(exif["DateTimeOriginal"] != undefined){
                datetime = exif.DateTimeOriginal.val.split(/\:|\s/);
                date = datetime[0] + "-" + datetime[1] + "-" + datetime[2];
                model = (exif["Model"] != undefined) ? (exif.Model.val) : "无";
                fnu = (exif["FNumber"] != undefined) ? (exif.FNumber.val.split(/\//)[1]) : "无";
                extime = (exif["ExposureTime"] != undefined) ? (exif.ExposureTime.val.split(/\s/)[0] + "秒") : "无";
                iso = (exif["ISOSpeedRatings"] != undefined) ? (exif.ISOSpeedRatings.val.split(/,\s/)[0]) : "无";
                setTimeout(function(){hover_img.after("<figcaption>"+"日期:" + date + " 器材:" + model + " 光圈:" + fnu + " 快门:" + extime + " ISO:" + iso + "</figcaption>")}, 800);
                delete datetime,date,model,fnu,extime,iso;
            }},
            error: function (msg) {
            }
      });
    },function(){
      $('figcaption').remove();
    });  
   };
   }
   window.onload = imgload;
  
  //二维码
  var canonical=document.querySelector("link[rel='canonical']").href;
  $('#qrcode').qrcode({
    size: 100,
    text: canonical 
  });	
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('#qrcode').css('display','none');
  }

  //评论
  $('.comment-toggle').click(function(){
    $(this).fadeOut(1500);
    $('.comment').attr('id','disqus_thread');
    var disqus_shortname = 'fooleap'; 
    $.ajax({
      type: "GET",
      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
  });
});
