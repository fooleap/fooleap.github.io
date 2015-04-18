jQuery(document).ready(function($){

    // initiate highlight text in highlight.pack.js
    
    // remove pageload class that rpevents css transitions before page load
    $('body').removeClass('preload');

    // Set images to full-width with captions
    $('.article p img').each(function(){
		
        var _parent = $(this).parents('p');
        _parent.addClass('image-container');

        // Get title text
        var caption = $(this).attr('title');

        if (caption) 
            _parent.append( caption ); 

	});


    // Menu
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
    
    // reposition scriptogram dashboard link
    var styles = {
        right : "auto",
        left: "20px",
        top: "20px"    
    };
    $('body > a[href$="dashboard/"]').css(styles);
});

$(window).load(function(){ 
    var img_cont=($('.post').find('img')).length; 
    if (img_cont != 0) { 
        var maxwidth=640; 
        for (var i=0;i<=img_cont-1;i++) { 
            var post_img=$('.post img').eq(i);
	    var _w = parseInt($(window).width());
            var realwidth=post_img.width();
	    if (realwidth >= maxwidth||_w<800) { 
	    var img_src=post_img.prop('src');
	    post_img.addClass('max_width_img').removeAttr("width").removeAttr("height").css({"cursor":"pointer","width":"100%","height":"auto"});
	    //click(function(){window.open(img_src,'_blank')});
            }
	    else {
	       post_img.css({"margin":"0 auto"});
	       }
        } 
    } 
   var canonical=document.querySelector("link[rel='canonical']").href;
   $('#qrcode').qrcode({
   	size: 100,
   	text: canonical 
   });	
   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     $('#qrcode').css({"display":"none"});
   }
});
