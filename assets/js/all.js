$(document).ready(function($){ 
  //链接
  $("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").attr('target','_blank');
  
  //菜单
  nav = $('.navigation');

  $('.wrapper').on( "touchstart", function(){
    if( nav.hasClass('show') ){
      nav.removeClass('show').addClass('hide'); 
    };
  });
  
  $('.menu').on( "click", function(){
    if(nav.hasClass('hide')){
      nav.removeClass('hide').addClass('show');
    } else {
      nav.removeClass('show').addClass('hide');
    };
  });

  nav.mouseover(function(){
    nav.removeClass('hide').addClass('show');
  });
  nav.mouseout(function(){
    nav.removeClass('show').addClass('hide');
  });
  
  //图片
  var post_img=$('.post-content img');
  var _w = parseInt($(window).width());
  document.onreadystatechange = function () {
  if (post_img){
    $.each(post_img,function(){
      var real_img = document.createElement("img");
      real_img.src = $(this).attr('src');
      var realwidth = real_img.width;
      $(this).wrap("<figure/>");
      $('figure').parent().addClass('image');
      if (realwidth >= 640){ 
        $(this).css({'cursor':'pointer','width':'100%'}).click(function(){window.open(real_img.src.split(/(\?|\_)/)[0],'_blank');});
      };
    });
    //EXIF
    post_img.hover(function(){
      var hover_img= $(this);
      var img_exif = hover_img.attr('src').split(/(\?|\_)/)[0]+"\?exif";
      if(img_exif.indexOf('jpg') >= 0){
      $.ajax({
        type: "GET",
        url: img_exif,
        dataType: "json",
        async : false,
        success: function (exif) {
          if(exif["DateTimeOriginal"] != undefined){
            datetime = exif.DateTimeOriginal.val.split(/\:|\s/);
            date = datetime[0] + "-" + datetime[1] + "-" + datetime[2];
            model = (exif["Model"] != undefined) ? (exif.Model.val) : "无";
            fnu = (exif["FNumber"] != undefined) ? (exif.FNumber.val.split(/\//)[1]) : "无";
            extime = (exif["ExposureTime"] != undefined) ? (exif.ExposureTime.val) : "无";
            iso = (exif["ISOSpeedRatings"] != undefined) ? (exif.ISOSpeedRatings.val.split(/,\s/)[0]) : "无";
            flength = (exif["FocalLength"] != undefined) ? (exif.FocalLength.val) : "无";
        }},
        error: function (msg) {}
      }).done(function() {
        hover_img.after("<figcaption class='exif'>"+"日期：" + date + " 器材: " + model + " 光圈: " + fnu + " 快门: " + extime + " 感光度: " + iso + " 焦距: " + flength + "</figcaption>");
      });
      }
    },function(){
      $('figcaption').remove()
      delete date;
    });
   };
   }
  
  //二维码
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false ) {
   $('#wechat').click(function(){
   if( $('#qrcode canvas').length > 0 ){
     $('#qrcode').remove();
     $(this).removeAttr ("class").attr("title","分享到微信");
   } else {
     var qrcode = "assets/js/jquery.qrcode.min.js";
     $.getScript( qrcode, function() {
       $('#wechat').before('<div id="qrcode"></div>').addClass('light').attr("title","点击隐藏二维码");
       $('#qrcode').qrcode({
         width: 70,
         height: 70,
         background: '#fff',
         foreground: '#000',
         correctLevel: 1,
         text: $('#wechat').attr('data-wechat-url')
        });	
     }, false);
   }
  });
  $('html').click(function() {
    if( $('#qrcode').length > 0 ){
     $('#qrcode').remove();
     $('#wechat').removeAttr ("class").attr("title","分享到微信");
    };
  });
  $('#weibo').click( function(){window.open($(this).attr('data-weibo-url'));})
  $('#qzone').click( function(){window.open($(this).attr('data-qzone-url'));})
  }
  
  //随机同类文章
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++){
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
    };
  }
  function generateRandomPosts(jsonfile){
    $.getJSON( jsonfile, function(data) {
      var postsCount = data.length;
      var posts = data;
      var randomIndexUsed = [];
      var counter = 0;
      var numberOfPosts = 5;
      $("#random-posts").append('<ul>\n</ul>\n');
      var RandomPosts = $("#random-posts ul");
      while (counter < numberOfPosts) {
        var randomIndex = Math.floor(Math.random() * postsCount);
        if (randomIndexUsed.indexOf(randomIndex) == "-1") {
        var postHREF = posts[randomIndex].href;
        var postTitle = posts[randomIndex].title;
        if (counter == (numberOfPosts - 1)) {
          RandomPosts.append('<li><a href="' + postHREF + '" title="' + postTitle + '">' + postTitle + '</a></li>\n');
        } else {
          RandomPosts.append('<li><a href="' + postHREF + '" title="' + postTitle + '">' + postTitle + '</a></li>\n');
        }
        randomIndexUsed.push(randomIndex);
        counter++;
        }
      } 
    });
  }
  if ($('#info').hasClass('tech')){
    var postsJson = 'assets/js/tech.json';
    generateRandomPosts(postsJson);
  } else if ($('#info').hasClass('life')){
    var postsJson = 'assets/js/life.json';
    generateRandomPosts(postsJson);
  };
  
  //查看源码
  $('.view-code').click(function(){
    if ($('.main-content').hasClass('hide')){
      $('.main-content, .posts').removeClass('hide');
      $('.source').remove();
      $(this).attr('title','查看内容源码').html('<i class="icon-file-code"></i>源码');
    } else {
      var source = $(this).attr('data-md');
      $('.main-content, .posts').addClass('hide')
      $('.main-content').after('<textarea class="source" readonly>');
      $('.source').text( '读取中...' );
      $.ajax({
        url : source,
        dataType: "text",
        success : function (data) {
          $('.source').text(data);
        }
      });
      $(this).attr('title','返回文章内容').html('<i class="icon-doc-text"></i>内容');
    }
  });

  //评论
  $('.show-comments').on('click', function() {
    var disqus_shortname = "fooleap";
    $('.comment').attr('id','disqus_thread');
    $.ajax({
      type: "GET",
      url: "https://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
    $(this).fadeOut(500);
  });

  if( /^#disqus|^#comment/.test(location.hash) ){
    $(".show-comments").trigger("click").animate({scrollTop: $("#disqus_thread").offset().top}, 1000);
  };

  //返回顶部
  $('#gototop').css('display', 'none');
  $(window).scroll(function(){
    if($(window).scrollTop() > $(window).height() ){
      $('#gototop').css({'display':'', 'cursor':'pointer'});
    } else {
      $('#gototop').fadeOut('slow');
    }
  });
  $('#gototop').click(function(){
    $('html, body').animate({scrollTop:0},'slow');
  });
});
