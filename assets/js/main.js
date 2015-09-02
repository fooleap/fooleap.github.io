//timeago https://goo.gl/jlkyIS
(function timeAgo(selector) {

    var templates = {
        prefix: "",
        suffix: "前",
        seconds: "不到 1 分钟",
        minute: "1 分钟",
        minutes: "%d 分钟",
        hour: "1 小时",
        hours: "%d 小时",
        day: "1 天",
        days: "%d 天",
        month: "1 个月",
        months: "%d 个月",
        year: "1 年",
        years: "%d 年"
    };
    var template = function (t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function (time) {
        if (!time) return;
        time = time.replace(/\.\d+/, ""); // remove milliseconds
        time = time.replace(/-/, "/").replace(/-/, "/");
        time = time.replace(/T/, " ").replace(/Z/, " UTC");
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
        seconds < 45 && template('seconds', seconds) || seconds < 90 && template('minute', 1) || minutes < 45 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 42 && template('day', 1) || days < 30 && template('days', days) || days < 45 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years)) + templates.suffix;
    };

    var elements = document.getElementsByClassName('timeago');
    for (var i in elements) {
        var $this = elements[i];
        if (typeof $this === 'object') {
            $this.innerHTML = timer($this.getAttribute('title') || $this.getAttribute('datetime'));
        }
    }
    // update time every minute
    setTimeout(timeAgo, 60000);

})();

//hasClass, addClass, removeClass http://goo.gl/hmvb52
function addClass(obj, cls){
  var obj_class = obj.className,
  blank = (obj_class != '') ? ' ' : '';
  added = obj_class + blank + cls;
  obj.className = added;
}
function removeClass(obj, cls){
  var obj_class = ' '+obj.className+' ';
  obj_class = obj_class.replace(/(\s+)/gi, ' '),
  removed = obj_class.replace(' '+cls+' ', ' ');
  removed = removed.replace(/(^\s+)|(\s+$)/g, '');
  obj.className = removed;
}
function hasClass(obj, cls){
  var obj_class = obj.className,
  obj_class_lst = obj_class.split(/\s+/);
  x = 0;
  for(x in obj_class_lst) {
    if(obj_class_lst[x] == cls) {
      return true;
    }
  }
  return false;
}

//菜单
var nav = document.getElementById('navigation');
var menu = document.getElementById('menu');
menu.addEventListener('click',function(){
  if(hasClass(nav, 'hide')) {
    removeClass(nav, 'hide');
    removeClass(menu, 'icon-menu');
    addClass(menu, 'icon-cancel');
    addClass(nav, 'show');
  } else {
    removeClass(nav, 'show');
    removeClass(menu, 'icon-cancel');
    addClass(menu, 'icon-menu');
    addClass(nav, 'hide');
  };
});

//Disqus评论数量
var urlArray = [];
var commentsCount = document.querySelectorAll('.disqus-comment-count');
if (commentsCount.length) {
  for (i=0; i < commentsCount.length; i++) {
    var url = commentsCount[i].dataset.disqusUrl;
    urlArray.push('thread=link:' + url);
  }
  function jsonpCallback(result) {  
    for (var i in result.response) {
      var count = result.response[i].posts;
      if ( count ) {
        document.querySelector('[data-disqus-url="' + result.response[i].link + '"]').innerHTML = count;
      }
    }  
  }
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://disqus.com/api/3.0/threads/set.jsonp' + '?callback=jsonpCallback' + '&api_key=' + disqusPublicKey + '&forum=' + disqusShortName + '&' + urlArray.join('&') ;
  document.getElementsByTagName('head')[0].appendChild(script);
}

//二维码
var wechat = document.getElementById('wechat');
var qrcode = document.getElementById('qrcode');
if (wechat) {
  var qrscript = document.createElement('script');
  qrscript.type = 'text/javascript';
  qrscript.src = 'http://' + location.hostname + '/assets/js/qr.min.js';
  document.getElementsByTagName('head')[0].appendChild(qrscript);
  wechat.addEventListener('click',function(){
    var qrurl = wechat.dataset.wechatUrl;
    if (qrurl.length < 33 || ( qrurl.length >= 63 && qrurl.length < 79 )){
      var qrlevel = 'L';
    } else if ((qrurl.length >= 33 && qrurl.length < 43 ) || qrurl.length >= 85 ){
      var qrlevel = 'Q';
    } else if ((qrurl.length >= 43 && qrurl.length < 63) || (qrurl.length >= 79 && qrurl.length < 85)){
      var qrlevel = 'M';
    }
    qr.canvas({ canvas: qrcode, level: qrlevel, size: 4, value: qrurl });
    if (hasClass(qrcode, 'show')) {
      removeClass(wechat, 'light');
      removeClass(qrcode, 'show');
    } else{
      addClass(qrcode, 'show');
      addClass(wechat, 'light');
    }
  });
}
