$(document).ready(function(){ 
  //链接
  $("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").attr('target','_blank');
  
  //目录
  window.onload = function () {
    var tocFixed = ($(window).width() - $('.wrapper').width()) / 2 - $('#toc').width() - 25;
    $('#toc').attr('data-title',$('h1').text());
    if ( tocFixed > 15){
      $('#toc').css({'left': tocFixed}).fadeIn('slow');
      var sections = {},
          _height  = $(window).height(),
          i        = 0;
      $('.main-content h2,h3').each(function(){
        var id = $(this).attr('id');
        sections[id] = $(this).offset().top;
      });
      $(document).scroll(function(){
        var pos = $(this).scrollTop() + 180;
        for(i in sections){
          if(sections[i] <= pos && sections[i] < pos + _height){
            $('a').removeClass('active');
            $('[href="#'+i+'"]').addClass('active');
          }
        }
      });
    }
  }
  
  //图片
  var postImg=$('.post-content img');
  document.onreadystatechange = function () {
  if (postImg){
    $.each(postImg,function(){
      var realImg = document.createElement("img");
      realImg.src = $(this).attr('src');
      var realWidth = realImg.width;
      if (realWidth >= 640){ 
        $(this).wrap("<figure/>").css({'cursor':'pointer','width':'100%'}).click(function(){window.open(realImg.src.split(/(\?|\_)/)[0],'_blank');});
        $('figure').parent().addClass('image');
      };
    });
    //EXIF
    postImg.hover(function(){
      var hoverImg= $(this);
      var imgExif = hoverImg.attr('src').split(/(\?|\_)/)[0]+"\?exif";
      if(imgExif.indexOf('jpg') >= 0){
      $.ajax({
        type: "GET",
        url: imgExif,
        dataType: "json",
        async : false,
        success: function (exif) {
          if(exif.DateTimeOriginal){
            datetime = exif.DateTimeOriginal.val.split(/\:|\s/);
            date = datetime[0] + "-" + datetime[1] + "-" + datetime[2];
            model = (exif.Model) ? (exif.Model.val) : "无";
            fnu = (exif.FNumber) ? (exif.FNumber.val.split(/\//)[1]) : "无";
            extime = (exif.ExposureTime) ? (exif.ExposureTime.val) : "无";
            iso = (exif.ISOSpeedRatings) ? (exif.ISOSpeedRatings.val.split(/,\s/)[0]) : "无";
            flength = (exif.FocalLength) ? (exif.FocalLength.val) : "无";
        }},
        error: function (msg) {}
      }).done(function() {
        if(typeof date != "undefined"){
          hoverImg.after("<figcaption class='exif'>"+"日期: " + date + " 器材: " + model + " 光圈: " + fnu + " 快门: " + extime + " 感光度: " + iso + " 焦距: " + flength + "</figcaption>");
          delete date;
        }
      });
      }
    },function(){
      $('figcaption').remove()
    });
   };
   }

  //页内链接
  $("[href^='#up']").parent('li').css('font-size','13px');
  $("[href^='#']").click(function(){
    $("[href^='#up']").parent('li').css("background-color", "");
    var href = $(this).attr("href");
    var pos = $(href).offset().top - 20;
    $("html,body").animate({scrollTop: pos}, 100);	
    $(href).parent('li').css('background-color','rgb(235, 235, 235)');
  })
  
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
  function randomPosts (count, post) {
    var postsCount = count;
    var posts = post;
    var randomIndexUsed = [];
    var counter = 0;
    var numberOfPosts = 5;
    var RandomPosts = $("#random-posts ul");
    while (counter < numberOfPosts) {
      var randomIndex = Math.floor(Math.random() * postsCount);
      if (randomIndexUsed.indexOf(randomIndex) == "-1") {
        var postHref = posts[randomIndex].href;
        var postTitle = posts[randomIndex].title;
        RandomPosts.append('<li><a href="' + postHref + '" title="' + postTitle + '">' + postTitle + '</a></li>\n');
        randomIndexUsed.push(randomIndex);
        counter++;
      }
    } 
  }
  var postsJson = 'http://' + location.hostname + '/assets/js/posts.json';
  $.getJSON( postsJson, function(data) {
    if ($('#info').hasClass('tech')){
      var count = data.tech.length;
      var post = data.tech;
      randomPosts(count, post);
    } else if ($('#info').hasClass('life')){
      var count = data.life.length;
      var post = data.life;
      randomPosts(count, post);
    } else{}
  });
  
  //查看源码
  $('.view-code a').click(function(){
    if ($('.source').length >0 ){
      $('.source').remove();
      $('#toc').fadeIn();
      $('.main-content, .posts').show();
      $(this).attr('title','查看内容源码').html('<i class="icon-file-code"></i>源码');
    } else {
      var source = $(this).attr('data-md');
      $('#toc').fadeOut();
      $('.main-content, .posts').hide();
      $('.main-content').after('<textarea class="source" readonly>');
      $("html,body").animate({scrollTop: 0}, 500);	
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
  function showComments() {
    $.ajax({
      type: "GET",
      url: "https://" + disqusShortName + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
    $(".show-comments").fadeOut(500);
  };
  $(".show-comments").click(function(){
      showComments();
  });
  if( /^#disqus|^#comment/.test(location.hash) ){
      showComments();
  };

  //返回顶部
  $('#gototop').css('display', 'none');
  $(window).scroll(function(){
    if($(window).scrollTop() > $(window).height() ){
      $('#gototop').fadeIn('slow');
    } else {
      $('#gototop').fadeOut('slow');
    }
  });
  $('#gototop').click(function(){
    $('html, body').animate({scrollTop:0},'slow');
  });

});
