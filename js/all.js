jQuery(document).ready(function($){       
   //链接
   $("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").addClass("external").attr("target","_blank");
   
    //菜单
    _nav = $('.navigation');
    $('html').click(function() {
        if( _nav.hasClass('show') )
            _nav.removeClass('show').addClass('hide'); 
    });
    _nav.click(function(event){
        event.stopPropagation();
        if (event.target.id == 'top')
            $(this).removeClass('show').addClass('hide');
    });
    $('.avatar').click(function(event){
        if( _nav.hasClass('hide') )
            _nav.removeClass('hide').addClass('show');
        else 
            _nav.removeClass('show').addClass('hide');
    });
    
    //图片
    var img_cont=($('.post-content').find('img')).length; 
    if (img_cont != 0) { 
        var maxwidth=640; 
	var post_img=$('.post-content img');
	var _w = parseInt($(window).width());
	if (post_img){
       	  $.each(post_img,function(){
	  var realwidth=$(this).width();
	  var imgsrc=$(this).attr('src');
          if (realwidth >= maxwidth||_w<800) { 
	    $(this).css({"cursor":"pointer","width":"100%","height":"auto"}).click(function(){window.open(imgsrc.split(/(\?|\_)/)[0],"_blank");});
	    }
	   });
	}} 
   
   //二维码
   var canonical=document.querySelector("link[rel='canonical']").href;
   $('#qrcode').qrcode({
      size: 100,
      text: canonical 
   });	
   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     $('#qrcode').css({"display":"none"});
   }

   //评论
   $(".comment-toggle").click(function() {
       $(this).css("display","none"); 
       $(".comment").attr("id","disqus_thread");
       $(".comment").load("js/loadcomments.js");
   });
});
