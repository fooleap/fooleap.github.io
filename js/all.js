jQuery(document).ready(function($){       
  //链接
  $("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").attr('target','_blank');
  
  //菜单
  nav = $('.navigation');

  $('.wrapper').on( "touchstart", function(){
    if( nav.hasClass('show') ){
      nav.removeClass('show').addClass('hide'); 
    };
  });
  
  $('.menu').on( "touchstart", function(){
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
  var maxwidth=640; 
  var post_img=$('.post-content img');
  var _w = parseInt($(window).width());
  function imgload(){
  if (post_img){
    $.each(post_img,function(){
      var real_img = new Image();
      real_img.src = $(this).attr('src');
      var realwidth = real_img.width;
      if (realwidth >= maxwidth){ 
        if($('html').hasClass('lte8')){
          $(this).wrap("<div class='figure'/>");
        }else{
          $(this).wrap("<figure/>");
          $('figure').parent().addClass('image');
        };
        $(this).css({'cursor':'pointer','width':'100%'}).click(function(){window.open(real_img.src.split(/(\?|\_)/)[0],'_blank');});
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
    },function(){
      $('figcaption').remove()
      delete date;
    });  
   };
   }
   window.onload = imgload;
  
  //二维码
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false ) {
   $('#wechat').click(function(){
   if( $('#qrcode canvas').length > 0 ){
     $('#qrcode').remove();
     $(this).removeAttr ("class").attr("title","分享到微信");
   } else {
     var qrcode = "js/jquery.qrcode.min.js";
     $.getScript( qrcode, function() {
       $('#wechat').before('<div id="qrcode"></div>').addClass('light').attr("title","点击隐藏二维码");
       var canonical=document.querySelector("link[rel='canonical']").href;
       $('#qrcode').qrcode({
         width: 70,
         height: 70,
         background: '#fff',
         foreground: '#000',
         correctLevel: 1,
         text: canonical 
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
      $("#random-posts").append('<strong>猜你喜欢</strong>');
      $("#random-posts").append('<ul>');
      var divRandomPosts = $("#random-posts ul");
      while (counter < numberOfPosts) {
        var randomIndex = Math.floor(Math.random() * postsCount);
        if (randomIndexUsed.indexOf(randomIndex) == "-1") {
        var postHREF = posts[randomIndex].href;
        var postTitle = posts[randomIndex].title;
        if (counter == (numberOfPosts - 1)) {
          divRandomPosts.append('<li><a href="' + postHREF + '" title="' + postTitle + '">' + postTitle + '</a></li>');
        } else {
          divRandomPosts.append('<li><a href="' + postHREF + '" title="' + postTitle + '">' + postTitle + '</a></li>');
        }
        randomIndexUsed.push(randomIndex);
        counter++;
        }
      } 
    });
  }
  if ($('#info').hasClass('tech')){
    var postsJson = 'js/tech.json';
    generateRandomPosts(postsJson);
  } else if ($('#info').hasClass('life')){
    var postsJson = 'js/life.json';
    generateRandomPosts(postsJson);
  };
  
  //查看源码
  $('.view-code').click(function(){
    if ($('.main-content').hasClass('hide')){
      $('.main-content, .posts').removeClass('hide');
      $('.source').remove();
      $(this).attr('title','查看内容源码').html('<i class="icon-code"></i> 源码');
    } else {
      var source = $(this).attr('data');
      $('.main-content, .posts').addClass('hide')
      $('.main-content').after('<textarea class="source" readonly>');
      $('.source').html( '读取中...' ).load(source);
      $(this).attr('title','返回文章内容').html('<i class="icon-doc"></i> 内容');
    }
  });

  //评论
  var disqus_publicKey = "xDtZqWt790WMwHgxhIYxG3V9RzvPXzFYZ7izdWDQUiGQ1O3UaNg0ONto85Le7rYN";
  var disqus_shortname = "fooleap";
  var disqus_url = 'link:' + $('.show-comments').attr('data-disqus-url');
  $.ajax({
    type: 'GET',
    url: 'https://disqus.com/api/3.0/threads/set.jsonp',
    data: { api_key: disqus_publicKey, forum: disqus_shortname, thread: disqus_url },
    cache: false,
    dataType: 'jsonp',
    success: function(result) {
      if (result.response.length === 1) {
        btnText = result.response[0].posts;
        $('.show-comments').append('（' + btnText + '）');
      } else {
        $('.show-comments').html('<i class="icon-comment-empty"></i> 抢沙发');
      }
    }
  });
  $('.show-comments').on('click', function() {
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
