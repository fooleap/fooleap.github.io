//timeago https://goo.gl/jlkyIS
(function timeAgo(selector) {

    var templates = {
        prefix: "",
        suffix: "前",
        seconds: "几秒",
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

    var elements = document.querySelectorAll('.timeago');
    for (var i in elements) {
        var $this = elements[i];
        if (typeof $this === 'object') {
            $this.innerHTML = timer($this.getAttribute('title') || $this.getAttribute('datetime'));
        }
    }
    // update time every minute
    setTimeout(timeAgo, 60000);

})();

//菜单
var nav = document.getElementById('navigation');
var menu = document.getElementById('menu');
var wrapper = document.querySelector('.wrapper');
function blogMenu(){
  if(nav.classList.contains('hide')) {
    nav.classList.remove('hide');
    menu.classList.remove('icon-menu');
    nav.classList.add('show');
    menu.classList.add('icon-cancel');
  } else {
    nav.classList.remove('show');
    menu.classList.remove('icon-cancel');
    nav.classList.add('hide');
    menu.classList.add('icon-menu');
  };
};
function hideMenu(){
  if(nav.classList.contains('show')) {
    nav.classList.remove('show');
    menu.classList.remove('icon-cancel');
    nav.classList.add('hide');
    menu.classList.add('icon-menu');
  }
};
if (nav.addEventListener) {
  nav.addEventListener("click", blogMenu, false);
} else {
  nav.attachEvent("onclick", blogMenu);
}
if (wrapper.addEventListener) {
  wrapper.addEventListener("click", hideMenu, false);
} else {
  wrapper.attachEvent("onclick", hideMenu)
}

//站外链接
if (document.addEventListener) {
  var extLinks = document.querySelectorAll('a[href*="http://"]:not([href*="' + location.hostname + '"]), a[href*="https://"]:not([href*="' + location.hostname + '"])');
  for (var i = 0 ; i < extLinks.length; i ++ ) {
    var num = extLinks[i].textContent.substring(1, extLinks[i].textContent.length-1);
    if(parseInt(num)){
      var note = 'note-' + num;
      var ref = 'ref-' + num;
      var noteTitle = extLinks[i].getAttribute('title');
      var noteHref = extLinks[i].getAttribute('href');
      extLinks[i].setAttribute('href', '#' + note);
      extLinks[i].setAttribute('id', ref);
      extLinks[i].setAttribute('class', 'ref');
      extLinks[i].outerHTML = '<sup>' + extLinks[i].outerHTML + '</sup>';
      document.getElementById('refs').insertAdjacentHTML('beforeend', '<li class="note"><a href="#'+ ref + '">&and;</a> <a href="'+ noteHref + '" title="' + noteTitle + '" id="' + note +'" class="exf-text" target="_blank">' + noteTitle + '</a></li>');
    } else {
      extLinks[i].setAttribute('target', '_blank');
    };
  }
}

// 选择相关链接，使用正则匹配
var noteLinks = document.querySelectorAll('a[href^="#note"], a[href^="#ref"]');
function linkFocus (){
  // 清除背景颜色
  for (var i = 0; i < noteLinks.length; i ++ ){
    noteLinks[i].parentElement.style.backgroundColor = '';
  }
  // 高亮目标背景
  var href = this.getAttribute('href').split('#')[1];
  document.getElementById(href).parentElement.style.backgroundColor = 'rgb(235, 235, 235)';
}
for (var i = 0 ; i < noteLinks.length; i ++ ){
  if (noteLinks[i].addEventListener) {
    noteLinks[i].addEventListener('click', linkFocus, false);
  } else {
    noteLinks[i].attachEvent('click', linkFocus);
  }
}

//Disqus评论数量
var urlArray = [];
var commentsCount = document.querySelectorAll('.disqus-comment-count');
if (commentsCount.length) {
  for (i=0; i < commentsCount.length; i++) {
    var url = commentsCount[i].getAttribute('data-disqus-url');
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
  (function () {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://disqus.com/api/3.0/threads/set.jsonp' + '?callback=jsonpCallback' + '&api_key=' + disqusPublicKey + '&forum=' + disqusShortName + '&' + urlArray.join('&') ;
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
  }());
}
var windowWidth = window.innerWidth;
if ( windowWidth < 414 ){
  var postTitles = document.getElementsByClassName("post-title");
  var postWidth = windowWidth - 88;
  for (var i = 0; i < postTitles.length; i++) {
    postTitles[i].style.width=(postWidth + "px");
  }
}

//二维码
var wechat = document.getElementById('wechat');
var qrcode = document.getElementById('qrcode');
if (wechat) {
  var qrscript = document.createElement('script');
  qrscript.type = 'text/javascript';
  qrscript.src = 'http://' + location.hostname + '/assets/js/qr.min.js';
  document.getElementsByTagName('head')[0].appendChild(qrscript);
  function qrCanvas () {
    var qrurl = wechat.dataset.wechatUrl;
    if (qrurl.length < 33 || ( qrurl.length >= 63 && qrurl.length < 79 )){
      var qrlevel = 'L';
    } else if ((qrurl.length >= 33 && qrurl.length < 43 ) || qrurl.length >= 85 ){
      var qrlevel = 'Q';
    } else if ((qrurl.length >= 43 && qrurl.length < 63) || (qrurl.length >= 79 && qrurl.length < 85)){
      var qrlevel = 'M';
    }
    qr.canvas({ canvas: qrcode, level: qrlevel, size: 4, value: qrurl });
    if (qrcode.classList.contains('show')) {
      qrcode.classList.remove('show');
      wechat.classList.remove('light');
    } else{
      qrcode.classList.add('show');
      wechat.classList.add('light');
    }
  };
  if (wechat.addEventListener) {
    wechat.addEventListener("click", qrCanvas, false);
  } else {
    wechat.attachEvent("onclick", qrCanvas );
  }
}
