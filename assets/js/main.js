// timeago https://goo.gl/jlkyIS
(function timeAgo(selector) {
  var templates = {
    prefix: '',
    suffix: '前',
    seconds: '几秒',
    minute: '1 分钟',
    minutes: '%d 分钟',
    hour: '1 小时',
    hours: '%d 小时',
    day: '1 天',
    days: '%d 天',
    month: '1 个月',
    months: '%d 个月',
    year: '1 年',
    years: '%d 年'
  };
  var template = function (t, n) {
    return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
  };

  var timer = function (time) {
    if (!time) return;
    time = time.replace(/\.\d+/, '');
    time = time.replace(/-/, '/').replace(/-/, '/');
    time = time.replace(/T/, ' ').replace(/Z/, ' UTC');
    time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
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
  setTimeout(timeAgo, 60000);
})();

// 判断是否支持 Flash http://goo.gl/cg206i
function isFlashSupported () {
  if(window.ActiveXObject) {
    try {
      if(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
      return true;
    } catch(e) { }
  }
  return navigator.plugins['Shockwave Flash'] ? true : false;
}

// 菜单
var nav = document.getElementById('navigation');
var navList = document.querySelector('.navigation-list');
var menu = document.getElementById('menu');
var container = document.querySelector('.container');
function blogMenu(){
  if(navList.classList.contains('hide')) {
    navList.classList.remove('hide');
    menu.classList.remove('icon-menu');
    navList.classList.add('show');
    menu.classList.add('icon-cancel');
  } else {
    navList.classList.remove('show');
    menu.classList.remove('icon-cancel');
    navList.classList.add('hide');
    menu.classList.add('icon-menu');
  }
}
function hideMenu(){
  if(navList.classList.contains('show')) {
    navList.classList.remove('show');
    menu.classList.remove('icon-cancel');
    navList.classList.add('hide');
    menu.classList.add('icon-menu');
  }
}
if (document.addEventListener) {
  nav.addEventListener('click', blogMenu, false);
} else {
  nav.attachEvent('onclick', blogMenu);
}
if (document.addEventListener) {
  container.addEventListener('click', hideMenu, false);
} else {
  container.attachEvent('onclick', hideMenu)
}

var links = document.querySelectorAll('a');
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;

// Vim 键绑定
var inCombo = false;
var lineHeight = 20;
var keys = [];
var row = 0;
function keysDown(event) {
  keys[event.keyCode] = true;
  if (keys[16] && keys[71]) {
    window.scrollTo(0, document.body.scrollHeight );
  }
  if (keys[67]) {
    if (!document.getElementById('dsq-1')) {
      commentBtn.click();
    }
  }
  if (keys[71]) {
    if (!inCombo) {
      inCombo = true;
      setTimeout('inCombo = false;', 500);
    } else {
      window.scrollTo(0, 0);
    }
  }
  if (keys[74]) {
    if (row) {
      window.scrollBy(0, lineHeight * row );
      row = 0;
    } else {
      window.scrollBy(0, lineHeight);
    }
  }
  if (keys[75]) {
    if (row) {
      window.scrollBy(0, -lineHeight * row );
      row = 0;
    } else {
      window.scrollBy(0, -lineHeight);
    }
  }
  if (event.keyCode >= 48 && event.keyCode <= 57) {
    for (var i = 48; i <= 57; i ++) {
      keys[i] = i - 48;
    }
    row = parseInt(row.toString() + keys[event.keyCode].toString());
  }
}
function keysUp(event) {
  keys[event.keyCode] = false;
}

// 返回顶部按钮
var backToTop = document.getElementById('backtotop');
function toggleToTop(){
  var pos = document.documentElement.scrollTop || document.body.scrollTop;
  if( pos > clientHeight ){
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}
function scrollToTop(){
  window.scrollTo(0, 0)
}
if (document.addEventListener) {
  document.addEventListener('scroll', toggleToTop, false);
  backToTop.addEventListener('click', scrollToTop, false);
} else {
  window.onscroll = toggleToTop;
  backToTop.attachEvent('onclick', scrollToTop);
}

// 目录
var toc = document.getElementById('toc');
var subTitles = document.querySelectorAll('.main-content h2,h3');
var sectionIds = [];
var sections = [];
if (toc) {
  var tocFixed = clientWidth/2 - 370 - toc.offsetWidth;
  if ( tocFixed < 15){
    toc.classList.add('hide');
  } else {
    toc.style.left = tocFixed + 'px';
  }
}
function tocShow () {
  if (toc){
    for (var i = 0; i < subTitles.length; i ++){
      sectionIds.push(subTitles[i].getAttribute('id'));
      sections.push(subTitles[i].offsetTop);
    }
    if (document.addEventListener) {
      document.addEventListener('scroll', tocScroll, false);
    } else {
      window.onscroll = tocScroll;
    }
  }
}
function tocScroll(){
  var pos = document.documentElement.scrollTop || document.body.scrollTop;
  var lob = document.body.offsetHeight - subTitles[subTitles.length - 1].offsetTop;
  for(var i = 0; i < sections.length; i ++){
    if( i === subTitles.length - 1 && clientHeight > lob){
      pos = pos + (clientHeight - lob);
    }
    if(sections[i] < pos && sections[i] < pos + clientHeight){
      if(document.querySelector('.active')){
        document.querySelector('.active').classList.remove('active');
      }
      document.querySelector('[href="#' + sectionIds[i] + '"').classList.add('active');
    }
  }
}

// 参考资料、站外链接
if (document.querySelectorAll('h2')[document.querySelectorAll('h2').length-1].innerHTML === '参考资料'){
  document.querySelectorAll('h2')[document.querySelectorAll('h2').length-1].insertAdjacentHTML('afterend', '<ol id="refs"></ol>');
}
for (var i = 0; i < links.length; i ++) {
  if (links[i].hostname != location.hostname && /^javascript/.test(links[i].href) === false ){
    var numText = links[i].innerHTML;
    var num = numText.substring(1, numText.length-1);
    if(!isNaN(num) && num){
      var note = 'note-' + num;
      var ref = 'ref-' + num;
      var noteTitle = links[i].getAttribute('title');
      var noteHref = links[i].getAttribute('href');
      links[i].setAttribute('href', '#' + note);
      links[i].setAttribute('id', ref);
      links[i].setAttribute('class', 'ref');
      links[i].outerHTML = '<sup>' + links[i].outerHTML + '</sup>';
      document.getElementById('refs').insertAdjacentHTML('beforeend', '<li class="note"><a href="#'+ ref + '">&and;</a> <a href="'+ noteHref + '" title="' + noteTitle + '" id="' + note +'" class="exf-text" target="_blank">' + noteTitle + '</a></li>');
    } else {
      links[i].setAttribute('target', '_blank');
    }
  }
}
var noteLinks = document.querySelectorAll('a[href^="#note"], a[href^="#ref"]');
function linkFocus (){
  for (var i = 0; i < noteLinks.length; i ++ ){
    noteLinks[i].parentElement.style.backgroundColor = '';
  }
  var href = this.href.split('#')[1];
  document.getElementById(href).parentElement.style.backgroundColor = 'rgb(235, 235, 235)';
}
for (var i = 0 ; i < noteLinks.length; i ++  ){
  if (document.addEventListener) {
    noteLinks[i].addEventListener('click', linkFocus, false);
  } else {
    noteLinks[i].onclick = linkFocus;
  }
}

// Disqus 评论
// 评论计数
var urlArray = [];
var commentsCount = document.querySelectorAll('.disqus-comment-count');
var likeCount = document.querySelector('.disqus-like-count');
var commentBtn = document.querySelector('.show-comments');
if (commentsCount.length && location.hostname === 'blog.fooleap.org'){
  disqusShortName = "fooleap";
  disqusPublicKey = "xDtZqWt790WMwHgxhIYxG3V9RzvPXzFYZ7izdWDQUiGQ1O3UaNg0ONto85Le7rYN";
}
function jsonpCallback(result) {  
  for (var i in result.response) {
    var count = result.response[i].posts;
    var likeCounts = result.response[i].likes;
    if ( likeCount ) {
      document.querySelector('.disqus-like-count').innerHTML = likeCounts;
    }
    if ( count ) {
      document.querySelector('[data-disqus-url="' + result.response[i].link + '"]').innerHTML = count;
    }
    if (commentBtn) {
      if( count > 0 ) {
      document.querySelector('.icon-chat').insertAdjacentHTML('afterend', '查看')
      } else {
      document.querySelector('.icon-chat').insertAdjacentHTML('afterend', '留下');
      }
    }  
  }
}
function disqusCount() {
  for (i=0; i < commentsCount.length; i++) {
    var url = commentsCount[i].getAttribute('data-disqus-url');
    urlArray.push('thread=link:' + url);
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = 'https://disqus.com/api/3.0/threads/set.jsonp' + '?callback=jsonpCallback' + '&api_key=' + disqusPublicKey + '&forum=' + disqusShortName + '&' + urlArray.join('&') ;
  (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}
var windowWidth = window.innerWidth;
if ( windowWidth < 414 ){
  var postTitles = document.getElementsByClassName('post-title');
  var postWidth = windowWidth - 88;
  for (var i = 0; i < postTitles.length; i++) {
    postTitles[i].style.width=(postWidth + 'px');
  }
}
// 显示评论按钮
function showComments() {
  (function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'https://' + disqusShortName + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
  commentBtn.parentNode.removeChild(commentBtn);
}
if(commentBtn){
  if (document.addEventListener) {
    commentBtn.addEventListener('click', showComments, false);
  } else {
    commentBtn.attachEvent('onclick', showComments);
  }
}

// 二维码 https://goo.gl/s9XrIl
var wechat = document.getElementById('wechat');
var qrcode = document.getElementById('qrcode');
if (wechat) {
  var qrscript = document.createElement('script');
  qrscript.type = 'text/javascript';
  qrscript.src = 'http://' + location.host + '/assets/js/qr.min.js';
  document.getElementsByTagName('head')[0].appendChild(qrscript);
  function qrCanvas () {
    var qrlevel = 'L';
    var qrsize = 4;
    var qrurl = wechat.dataset.wechatUrl;
    if ( qrurl.length >= 33 && qrurl.length < 43 ){
      qrlevel = 'Q';
    } else if ((qrurl.length >= 43 && qrurl.length < 63) || (qrurl.length >= 79 && qrurl.length < 84)){
      qrlevel = 'M';
    } else if( qrurl.length >= 84 ){
      qrsize = 3;
    }
    qr.canvas({ canvas: qrcode, level: qrlevel, size: qrsize, value: qrurl });
    if (qrcode.classList.contains('show')) {
      qrcode.classList.remove('show');
      wechat.classList.remove('light');
    } else {
      qrcode.classList.add('show');
      wechat.classList.add('light');
    }
  }
  if (document.addEventListener) {
    wechat.addEventListener('click', qrCanvas, false);
  } else {
    wechat.attachEvent('onclick', qrCanvas );
  }
}

// 相关文章
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
  var RandomPosts = document.querySelector('#random-posts ul');
  while (counter < numberOfPosts) {
    var randomIndex = Math.floor(Math.random() * postsCount);
    if (randomIndexUsed.indexOf(randomIndex) == '-1') {
      var postHref = posts[randomIndex].href;
      var postTitle = posts[randomIndex].title;
      RandomPosts.insertAdjacentHTML('beforeend', '<li><a href="' + postHref + '" title="' + postTitle + '">' + postTitle + '</a></li>\n');
      randomIndexUsed.push(randomIndex);
      counter++;
    }
  } 
}
var info = document.getElementById('info');
function random (data) {
  if (info.classList.contains('tech')){
    var count = data.tech.length;
    var post = data.tech;
    randomPosts (count, post);
  } else if (info.classList.contains('life')){
    var count = data.life.length;
    var post = data.life;
    randomPosts (count, post);
  } 
}
if(info){
  if(info.classList.contains('tech') || info.classList.contains('life')){
    var postsJson = 'http://' + location.host + '/assets/js/posts.json';
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', postsJson, true);
    xhrPosts.send();
    xhrPosts.onreadystatechange = function() {
      if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
        var posts = JSON.parse(xhrPosts.responseText);
        random(posts);
      }
    }
  }
}

// 查看源码
var postContent = document.querySelector('.post-content');
var mainContent = document.querySelector('.main-content');
var sourceView = document.querySelector('.view-code a');
function showSource(){
  var source = document.getElementById('source');
  if (source) {
    mainContent.classList.remove('hide');
    if(toc){
      toc.classList.remove('hide');
    }
    source.parentNode.removeChild(source);
    sourceView.innerHTML = '<i class="icon-file-code"></i>源码';
    sourceView.setAttribute('title', '查看内容源码');
    window.scrollTo(0, sourceView.offsetTop);
  } else {
    mainContent.classList.add('hide');
    if(toc){
      toc.classList.add('hide');
    }
    postContent.insertAdjacentHTML('afterbegin', '<textarea id="source" readonly>读取中……</textarea>');
    var source = document.getElementById('source');
    var mdSource = sourceView.getAttribute('data-md');
    var xhrSource = new XMLHttpRequest();
    xhrSource.open("GET", mdSource, true);
    xhrSource.send();
    xhrSource.onreadystatechange = function() {
      if (xhrSource.readyState == 4 && xhrSource.status == 200) {
        source.innerHTML = xhrSource.responseText;
      }
    }
    sourceView.innerHTML = '<i class="icon-doc-text"></i>内容';
    sourceView.setAttribute('title','返回文章内容');
  }
}
if(sourceView){
  if (document.addEventListener) {
    sourceView.addEventListener('click', showSource, false);
  } else {
    sourceView.attachEvent('onclick', showSource);
  }
}

// 图片
var postImages = document.querySelectorAll('.main-content img');
var realImages = [];
(function imageSize() {
  for (var i = 0; i < postImages.length; i ++) {
    var imageSrc;
    var realImage = new Image();
    realImage.src = postImages[i].src;
    realImages.push(realImage);
    if(realImage.src.indexOf('jpg') >= 0){
      imageSrc = realImage.src.split(/(\?|\_)/)[0] + '?imageView2/0/interlace/1';
    } else {
      imageSrc = realImage.src.split(/(\?|\_)/)[0];
    }
    postImages[i].parentElement.classList.add('image');
    postImages[i].setAttribute('data-jslghtbx-caption', postImages[i].getAttribute('alt'));
    postImages[i].setAttribute('data-jslghtbx', imageSrc);
    postImages[i].setAttribute('data-jslghtbx-group', 'lightbox');
    postImages[i].outerHTML = '<figure>' + postImages[i].outerHTML + '</figure>';
  }
})();
function exifShow(){
  var exifInfo = this.querySelector('.exif');
  var thisImage = this.querySelector('img');
  var exifUrl = this.querySelector('img').src.split(/(\?|\_)/)[0] + '\?exif';
  if(exifUrl.indexOf('jpg') >= 0 && clientWidth >= 555 && !exifInfo){
    var xhrExif = new XMLHttpRequest();
    xhrExif.open('GET', exifUrl, false);
    xhrExif.send(null);
    var exif = JSON.parse(xhrExif.responseText);
    if (xhrExif.readyState == 4 && xhrExif.status == 200) {
      if (exif.DateTimeOriginal) {
        datetime = exif.DateTimeOriginal.val.split(/\:|\s/);
        date = datetime[0] + '-' + datetime[1] + '-' + datetime[2];
        model = (exif.Model) ? (exif.Model.val) : '无';
        fnum = (exif.FNumber) ? (exif.FNumber.val.split(/\//)[1]) : '无';
        extime = (exif.ExposureTime) ? (exif.ExposureTime.val) : '无';
        iso = (exif.ISOSpeedRatings) ? (exif.ISOSpeedRatings.val.split(/,\s/)[0]) : '无';
        flength = (exif.FocalLength) ? (exif.FocalLength.val) : '无';
        thisImage.insertAdjacentHTML('afterend', '<figcaption class="exif show">日期: ' + date + ' 器材: ' + model + ' 光圈: ' + fnum + ' 快门: ' + extime + ' 感光度: ' + iso + ' 焦距: ' + flength + '</figcaption>');
      }
    }
  }
  if(exifInfo){
    exifInfo.classList.add('show');
  }
}
function exifHide(){
  var exifInfo = this.querySelector('.exif')
  if(exifInfo){
    exifInfo.classList.remove('show');
  }
}
function exifLoad(){
  var figure = document.querySelectorAll('figure');
  for (var i = 0; i < figure.length; i ++) {
    figure[i].addEventListener('mouseover', exifShow, false);
    figure[i].addEventListener('mouseout', exifHide, false);
  }
}
// lightbox http://goo.gl/aA9Y5K
(function lightbox(){
  if(document.querySelectorAll('.image') && clientWidth > 640){
    var lbscript = document.createElement('script');
    lbscript.type = 'text/javascript';
    lbscript.src = 'http://' + location.host + '/assets/js/lightbox.min.js';
    document.getElementsByTagName('BODY')[0].appendChild(lbscript);
  }
})();

// 标签云 http://goo.gl/OAvhn3
var tagCanvas = document.getElementById('tag-canvas');
if (tagCanvas) {
    if(clientWidth < 640){
      tagCanvas.setAttribute('width', clientWidth);
      tagCanvas.setAttribute('height', clientWidth*2/3);
    }
    var tagscript = document.createElement('script');
    tagscript.type = 'text/javascript';
    tagscript.src = 'http://' + location.host + '/assets/js/tagcanvas.min.js';
    document.getElementsByTagName('head')[0].appendChild(tagscript);
  }
function tagCloud() {
  TagCanvas.Start('tag-canvas', 'tags', {
    textHeight: 25, 
    textColour: null,
    textFont: 'RobotoDraft, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", "SimSun", sans-serif',
    outlineColour: 'rgba(225, 225, 225, .3)',
    outlineMethod: 'block',
    bgRadius: 5,
    reverse: true,
    depth: 0.8,
    Zoom: 1.5,
    weight: true,
    weightSizeMin: 10,
    weightSizeMax: 40,
    wheelZoom: false
  });
  var tagLinks = document.querySelectorAll('a[class^="tag"]');
  var hidePosts = document.querySelectorAll('.post-list');
  function tagShow (){
    for (var i = 0; i < hidePosts.length; i ++ ){
      hidePosts[i].style.display = 'none';
    }
    var href = decodeURIComponent(this.href.split('#')[1]);
    document.querySelector('h1').innerHTML = '“' + href + '”的相关文章';
    document.getElementById(href).removeAttribute('style');
    setTimeout(function(){window.scrollTo(0, 0);},1);
  }
  for (var i = 0 ; i < tagLinks.length; i ++  ){
    if (document.addEventListener) {
    tagLinks[i].addEventListener('click', tagShow, false);
    } else {
    tagLinks[i].onclick = tagShow;
    }
  }
  if(location.hash){
    document.querySelector('[href="' + decodeURIComponent(location.hash) +'"]').click();
    setTimeout(function(){window.scrollTo(0, 0);},1);
  }
    
}

setTimeout(function(){
  if ( location.hostname === 'blog.fooleap.org' ){
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement('script');
      hm.src = '//hm.baidu.com/hm.js?fa7ec982118ebd236663169678264582';
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-16717905-7', 'auto');
    ga('send', 'pageview');
  }
}, 1000);

window.onload = function(){
  tocShow();
  if (window.addEventListener){
    exifLoad();
    window.addEventListener('keydown', keysDown, false);
    window.addEventListener('keyup', keysUp, false);
  } else if (document.attachEvent){
    document.attachEvent('onkeydown', keysDown);
    document.attachEvent('onkeyup', keysUp);
  } else {
    document.addEventListener('keydown', keysDown, false);
    document.addEventListener('keyup', keysUp, false);
  }
  if(document.querySelectorAll('.image') && clientWidth > 640){
    var lightbox = new Lightbox();
    var lightBoxOptions = {
      boxId: false,
      dimensions: true,
      captions: true,
      prevImg: false,
      nextImg: false,
      hideCloseBtn: true,
      closeOnClick: true,
      loadingAnimation: 100,
      animElCount: 4,
      preload: true,
      carousel: true,
      animation: 400,
      nextOnClick: true,
      responsive: true,
      maxImgSize: .9,
    }
    lightbox.load(lightBoxOptions);
  }
  if (tagCanvas) {
    tagCloud();
  }
  if (/^#disqus|^#comment/.test(location.hash)){
    showComments();
  }else if (commentsCount.length && location.hostname === 'blog.fooleap.org'){
    disqusCount();
  }
}
