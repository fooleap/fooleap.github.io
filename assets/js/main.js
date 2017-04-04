// closest & matches Polyfill
!function(a){var c;if(a=a.Element)a=a.prototype,!(c=a.matches)&&(c=a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector||a.querySelectorAll&&function matches(a){a=(this.parentNode||this.document||this.ownerDocument).querySelectorAll(a);for(var b=a.length;0<=--b&&a.item(b)!==this;);return-1<b})&&(a.matches=c),!a.closest&&c&&(a.closest=function closest(a){for(var b=this;b;){if(1===b.nodeType&&b.matches(a))return b;b=b.parentNode}return null})}(Function("return this")());

var ua = navigator.userAgent;
//全局变量
var head = document.getElementsByTagName('head')[0],
    site = {
        home: head.dataset.home,
        api: head.dataset.api,
        img: head.dataset.img,
        tongji: head.dataset.tongji,
        analytics: head.dataset.analytics
    },
    page = { 
        layout: head.dataset.layout,
        title: document.title,
        url: location.pathname,
        id: head.dataset.id,
        category: head.dataset.category,
        tags: head.dataset.tags.split(',')
    },
    browser = { 
        mobile: !!ua.match(/AppleWebKit.*Mobile.*/),
        wechat: ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
    };

var flowArr = document.getElementsByClassName('language-flow');
if( flowArr.length > 0 ){

    var fcscript = document.createElement('script');
    fcscript.type = 'text/javascript';
    fcscript.src = '/assets/js/flowchart.min.js';
    document.getElementsByTagName('head')[0].appendChild(fcscript);

    fcscript.onload = function(){
        [].forEach.call(flowArr, function(item,i){
            var flowId = 'flow-' + (i+1);
            var div = document.createElement('div');
            div.classList.add('flow');
            div.setAttribute('id', flowId);

            var pre = item.parentNode;
            pre.insertAdjacentElement('beforebegin', div);
            pre.style.display = 'none';

            var diagram = flowchart.parse(item.innerText);
            diagram.drawSVG(flowId);
        })
    }

    window.addEventListener('load', function(){
        var linkArr = document.querySelectorAll('.flow a');
        [].forEach.call(linkArr, function(link){
            if(/^#/i.test(link.getAttribute('href'))){
                link.setAttribute('target', '_self');
            }
        })
    });
}

// timeago https://goo.gl/jlkyIS
function timeAgo(selector) {
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
    var template = function(t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function(time) {
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
}
timeAgo();

if(browser.wechat && location.origin == site.home){
    var xhrwesign = new XMLHttpRequest();
    xhrwesign.onreadystatechange = function() {
        if (xhrwesign.readyState==4 && xhrwesign.status==200)
        {
            signPackage = JSON.parse(xhrwesign.responseText);
            wx.config({
                debug: false,
                appId: signPackage.appId,
                timestamp: signPackage.timestamp,
                nonceStr: signPackage.nonceStr,
                signature: signPackage.signature,
                jsApiList: [
                    'chooseImage',
                    'previewImage'
                ]
            });
        }
    }
    xhrwesign.open('GET', site.api + '/wechat/jssdk?url='+ location.href, true);
    xhrwesign.send();
    wx.ready(function () {
    });
}

function wxchoose(){
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'], 
        success: function (res) {
            var localIds = res.localIds; 
        }
    });
}

// 图片
(function(){
    var imageArr = document.querySelectorAll('.post-content img');
    var xhrImageExif = [],
        imageExif = [],
        oImgArr = [];

    for(var i = 0; i < imageArr.length; i++){
        oImgArr[i] = imageArr[i].src.split(/_|\?/)[0];
    }
    page.img = imageArr.length;

    [].forEach.call(imageArr, function(item, i){
        if ( page.img > 0  && (new RegExp(site.img,'i')).test(item.getAttribute('src'))){

            //Lightbox
            item.dataset.jslghtbx = item.src.split(/_|\?/)[0];
            item.dataset.jslghtbxCaption = item.getAttribute('alt');
            item.dataset.jslghtbxGroup = 'lightbox';
            item.classList.add('post-image');
            item.parentElement.outerHTML = item.parentElement.outerHTML.replace('<p>','<figure class="post-figure" data-index='+i+'>').replace('</p>','</figure>').replace(item.parentElement.textContent, '<figcaption class="post-figcaption">&#9650; '+ item.parentElement.textContent.trim() +'</figcaption>');

            if( browser.wechat ){
                document.getElementsByClassName('post-figure')[i].addEventListener('click',function(){
                    wx.previewImage({
                        current: oImgArr[i], 
                        urls: oImgArr
                    });
                })
            }

            //Exif
            if( item.src.indexOf('.jpg') > -1 ) {
                imageExif[i] = item.src.split(/_|\?/)[0] + '?exif';
                xhrImageExif[i] = new XMLHttpRequest();
                xhrImageExif[i].open('GET', imageExif[i], true);
                xhrImageExif[i].onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200)
                    {
                        var data = JSON.parse(this.responseText);
                        if ( data.DateTimeOriginal) {
                            var datetime = data.DateTimeOriginal.val.split(/\:|\s/);
                            var date = datetime[0] + '-' + datetime[1] + '-' + datetime[2];
                            var model = data.Model ? data.Model.val : '无';
                            var fnum = data.FNumber ? data.FNumber.val.split(/\//)[1] : '无';
                            var extime = data.ExposureTime ? data.ExposureTime.val : '无';
                            var iso = data.ISOSpeedRatings ? data.ISOSpeedRatings.val.split(/,\s/)[0] : '无';
                            var flength = data.FocalLength ? data.FocalLength.val : '无';
                            document.querySelector('.post-content [src^="' + imageExif[i].slice(0,-5) + '"]').nextElementSibling.insertAdjacentHTML('beforeend', '<small class="post-image-exif">日期: ' + date + ' 器材: ' + model + ' 光圈: ' + fnum + ' 快门: ' + extime + ' 感光度: ' + iso + ' 焦距: ' + flength + '</small>');
                        }
                    }
                };
                xhrImageExif[i].send(null);
            }
        }
    });

})();

// 判断是否支持 Flash http://goo.gl/cg206i
function isFlashSupported() {
    if (window.ActiveXObject) {
        try {
            if (new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
                return true;
        } catch (e) {}
    }
    return navigator.plugins['Shockwave Flash'] ? true : false;
}

var links = document.querySelectorAll('a');

// Vim 键绑定
/*
var inCombo = false;
var lineHeight = 20;
var keys = [];
var row = 0;

function keysDown(event) {
    keys[event.keyCode] = true;
    if (keys[16] && keys[71]) {
        window.scrollTo(0, document.body.scrollHeight);
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
            window.scrollBy(0, lineHeight * row);
            row = 0;
        } else {
            window.scrollBy(0, lineHeight);
        }
    }
    if (keys[75]) {
        if (row) {
            window.scrollBy(0, -lineHeight * row);
            row = 0;
        } else {
            window.scrollBy(0, -lineHeight);
        }
    }
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        for (var i = 48; i <= 57; i++) {
            keys[i] = i - 48;
        }
        row = parseInt(row.toString() + keys[event.keyCode].toString());
    }
}

function keysUp(event) {
    keys[event.keyCode] = false;
}
window.addEventListener('keydown', keysDown, false);
window.addEventListener('keyup', keysUp, false);
*/

if( browser.mobile && page.url == '/' ){
    var pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    var pageNum = 0;
    var postData;
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', '/posts.json', true);
    xhrPosts.onreadystatechange = function() {
        if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
            postData = JSON.parse(xhrPosts.responseText);
            document.addEventListener('scroll', loadMore, false);
        }
    }
    xhrPosts.send();
    function loadMore (){
        var pageMax = Math.ceil(postData.length/10);
        if(document.body.offsetHeight-(document.documentElement.clientHeight +(document.documentElement.scrollTop || document.body.scrollTop )) == 0 && pageNum < pageMax){
            pagination.classList.add('loading');
            setTimeout(function(){
                pageNum++;
                var postMin = pageNum * 10;
                var postMax = (pageNum + 1) * 10;
                var html = '';
                var commentArr = [];
                for( var i = postMin; i < postMax && i < postData.length; i++){
                    html +='<article class="post-item">'+
                        '<img class="post-item-thumb" src="'+postData[i].thumb+'" alt="'+postData[i].title+'">'+
                        '<section class="post-item-summary">'+
                        '<h3 class="post-item-title"><a class="post-item-link" href="'+postData[i].url+'" title="'+postData[i].title+'">'+postData[i].title+'</a></h3>'+
                        '<abbr class="post-item-date timeago" title="'+postData[i].date+'"></abbr>'+
                        '</section>'+
                        '<a class="post-item-comment" title="查看评论" data-disqus-url="'+postData[i].url+'" href="'+postData[i].url+'#comments"></a>'+
                        '</article>';
                    commentArr.push(postData[i].url);
                }
                document.querySelector('.post-list').insertAdjacentHTML('beforeend', html);
                timeAgo();
                comment.count(commentArr);
                pagination.classList.remove('loading');
            },1000);
        }
    }
}

// 目录
var toc = document.querySelector('.post-toc');
var subTitles = document.querySelectorAll('.page-content h2,h3');
var sectionIds = [];
var sections = [];
var clientHeight = document.documentElement.clientHeight;
if (toc) {
    function tocShow() {
        var clientWidth = document.documentElement.clientWidth;
        var tocFixed = clientWidth / 2 - 410 - toc.offsetWidth;
        if (tocFixed < 15) {
            toc.style.visibility = 'hidden';
        } else {
            toc.style.visibility = 'visible';
            toc.style.left = tocFixed + 'px';
        }
    }
    function tocScroll() {
        for (var i = 0; i < subTitles.length; i++) {
            sectionIds.push(subTitles[i].getAttribute('id'));
            sections.push(subTitles[i].offsetTop);
        }
        var pos = document.documentElement.scrollTop || document.body.scrollTop;
        var lob = document.body.offsetHeight - subTitles[subTitles.length - 1].offsetTop;
        for (var i = 0; i < sections.length; i++) {
            if (i === subTitles.length - 1 && clientHeight > lob) {
                pos = pos + (clientHeight - lob);
            }
            if (sections[i] < pos && sections[i] < pos + clientHeight) {
                if (document.querySelector('.active')) {
                    document.querySelector('.active').classList.remove('active');
                }
                document.querySelector('[href="#' + sectionIds[i] + '"').classList.add('active');
            }
        }
    }
    document.addEventListener('scroll', tocScroll, false);
    window.addEventListener('resize', tocShow, false);
    tocShow();
}


// 参考资料、站外链接
(function(){
    if (document.querySelectorAll('h2')[document.querySelectorAll('h2').length - 1].innerHTML === '参考资料') {
        document.querySelectorAll('h2')[document.querySelectorAll('h2').length - 1].insertAdjacentHTML('afterend', '<ol id="refs"></ol>');
    }
    for (var i = 0; i < links.length; i++) {
        if (links[i].hostname != location.hostname && /^javascript/.test(links[i].href) === false) {
            var numText = links[i].innerHTML;
            var num = numText.substring(1, numText.length - 1);
            if (!isNaN(num) && num) {
                var note = 'note-' + num;
                var ref = 'ref-' + num;
                var noteTitle = links[i].getAttribute('title');
                var noteHref = links[i].getAttribute('href');
                links[i].setAttribute('href', '#' + note);
                links[i].setAttribute('id', ref);
                links[i].setAttribute('class', 'ref');
                links[i].outerHTML = '<sup>' + links[i].outerHTML + '</sup>';
                document.getElementById('refs').insertAdjacentHTML('beforeend', '<li id="' + note + '" class="note"><a href="#' + ref + '">^</a> <a href="' + noteHref + '" title="' + noteTitle + '" class="exf-text" target="_blank">' + noteTitle + '</a></li>');
            } else {
                links[i].setAttribute('target', '_blank');
            }
        }
    }
})();

if ( page.layout == 'post' ) {

    // 相关文章
    function randomPosts(){
        var randomIndexUsed = [];
        var counter = 0;
        var numberOfPosts = 5;
        var randomPosts = document.querySelector('#random-posts ul');
        while (counter < numberOfPosts) {
            var randomIndex = Math.floor(Math.random() * posts.length);
            if (randomIndexUsed.indexOf(randomIndex) == '-1') {
                var postUrl = posts[randomIndex].url;
                var postTitle = posts[randomIndex].title;
                randomPosts.insertAdjacentHTML('beforeend', '<li class="post-extend-item"><a class="post-extend-link" href="' + postUrl + '" title="' + postTitle + '">' + postTitle + '</a></li>\n');
                randomIndexUsed.push(randomIndex);
                counter++;
            }
        }
    }
    var posts = [];
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', '/posts.json', true);
    xhrPosts.onreadystatechange = function() {
        if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
            var data = JSON.parse(xhrPosts.responseText);
            for( var i = 0; i < data.length; i++){
                if( data[i].category == page.category && data[i].url != location.pathname ){
                    posts.push(data[i]);
                }
            }
            randomPosts();
        }
    }
    xhrPosts.send();

    var xhrPopular = new XMLHttpRequest();
    xhrPopular.open('GET', site.api + '/disqus/popular', true);
    xhrPopular.onreadystatechange = function() {
        if (xhrPopular.readyState == 4 && xhrPopular.status == 200) {
            var data = JSON.parse(xhrPopular.responseText);
            if( data.code == 0){
                var posts = data.response;
                var popularPosts = document.querySelector('#popular-posts ul');
                posts.forEach(function(item){
                    popularPosts.insertAdjacentHTML('beforeend', '<li class="post-extend-item"><a class="post-extend-link" href="' + item.link + '" title="' + item.title + '">' + item.title + '</a></li>\n');
                })
            }
        }
    }
    xhrPopular.send();

    // 二维码 http://goo.gl/JzmGoq
    var qrscript = document.createElement('script');
    qrscript.type = 'text/javascript';
    qrscript.src = '/assets/js/qrcode.min.js';
    document.getElementsByTagName('head')[0].appendChild(qrscript);
    qrscript.onload = function(){
        new QRCode('qrcode', {
            text: site.home + page.url,
            width: 96,
            height: 96,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });
    }
}

// Disqus 事件绑定
disqus_loaded = false;
function disqus_config() {
    this.page.url = site.home + page.url;
    this.callbacks.onReady.push(function() {
        disqus_loaded = true;
    });
};

// 访客信息
function Guest() {
    this.init();
}

Guest.prototype = {

    // 初始化访客信息
    init: function(){
        this.load();
        var boxArr = document.getElementsByClassName('comment-box');
        var guest = this;
        if( guest.logged_in == 'true' ) {
            [].forEach.call(boxArr,function(item,i){
                item.querySelector('.comment-form-wrapper').classList.add('logged-in');
                item.querySelector('.comment-avatar-image').setAttribute('src', guest.avatar);
                item.querySelector('.comment-form-name').value = guest.name;
                item.querySelector('.comment-form-email').value = guest.email;
                item.querySelector('.comment-form-url').value = guest.url;
            });
        } else {
            [].forEach.call(boxArr,function(item,i){
                item.querySelector('.comment-form-wrapper').classList.remove('logged-in');
            });
            localStorage.setItem('logged_in', 'false');
        }
    },

    // 读取访客信息
    load: function(){
        this.name = localStorage.getItem('name');
        this.email = localStorage.getItem('email');
        this.url = localStorage.getItem('url');
        this.avatar = localStorage.getItem('avatar');
        this.logged_in = localStorage.getItem('logged_in');
    },

    // 清除访客信息
    clear: function(){
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('url');
        localStorage.removeItem('avatar');
        localStorage.setItem('logged_in', 'false');
        guest.init()
    },

    // 提交访客信息
    submit: function(e){
        var item = e.currentTarget.closest('.comment-item') || e.currentTarget.closest('.comment-box');
        name = item.querySelector('.comment-form-name').value;
        email = item.querySelector('.comment-form-email').value;
        avatar = item.querySelector('.comment-avatar-image').getAttribute('src');
        url = item.querySelector('.comment-form-url').value;
        if( guest.logged_in == 'false' ){
            if (/\S/i.test(name)  && /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(email)){
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                localStorage.setItem('url', url);
                localStorage.setItem('avatar', avatar);
                localStorage.setItem('logged_in', 'true');
            } else {
                alert('请正确填写必填项');
                return;
            }
            guest.init();
        }
    }
}


function Comment () {
    this.imagesize = [];
    this.hasBox = !!document.querySelector('.comment-box');
    this.box = this.hasBox ? document.querySelector('.comment-box').outerHTML : '';
    this.init();

}

/* Disqus 评论 */
Comment.prototype = {

    // 初始化
    init: function(){
        // 评论计数
        var countArr = document.querySelectorAll('[data-disqus-url]');
        if( countArr.length > 0 ){
            var commentArr = [];
            [].forEach.call(countArr, function(item,i){
                commentArr[i] = item.dataset.disqusUrl;
            });
            this.count(commentArr);
        }

        // 拉取列表
        if(this.hasBox){
            document.getElementById('comment-toggle').addEventListener('change', function(){
                if( !disqus_loaded ){
                    comment.disqus(); 
                }
                document.getElementById('disqus_thread').style.display = this.checked ? 'block' : 'none';
                document.querySelector('.comment').style.display =  this.checked ? 'none' : 'block';
            })
            this.getlist();
        }
    },

    // 评论计数
    count: function(commentArr){
        var commentLink = encodeURIComponent(commentArr.join(','));
        var xhrCommentCount = new XMLHttpRequest();
        xhrCommentCount.open('GET', site.api +'/disqus/list?link=' + commentLink, true);
        xhrCommentCount.send();
        xhrCommentCount.onreadystatechange = function() {
            if (xhrCommentCount.readyState == 4 && xhrCommentCount.status == 200) {
                var data = JSON.parse(xhrCommentCount.responseText);
                for (var i = 0; i < data.response.length; i++) {
                    var count = data.response[i].posts == 0 ? '' : data.response[i].posts;
                    document.querySelector('[data-disqus-url="' + data.response[i].link.slice(23) + '"]').innerHTML = count;
                }
            }
        }
    },

    // 加载 Disqus 评论
    disqus: function(){
        var d = document,
            s = d.createElement('script');
        s.src = '//fooleap.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    },

    // 评论表单事件绑定
    form: function(){

        // 加载表情
        var emojiList = '';
        comment.emoji.forEach(function(item,i){
            emojiList += '<li class="emojione-item" title="'+ item.title+'" data-code="'+item.code+'"><img class="emojione-item-image" src="'+item.url+'" /></li>';
        })
        var emojiListArr = document.getElementsByClassName('emojione-list');
        [].forEach.call(emojiListArr,function(item,i){
            item.innerHTML = emojiList;
        });

        // 表情点选
        var emojiArr = document.getElementsByClassName('emojione-item');
        [].forEach.call(emojiArr,function(item,i){
            item.addEventListener('click', comment.field, false);
        });

        // 激活列表回复按钮事件
        var replyArr = document.getElementsByClassName('comment-item-reply');
        [].forEach.call(replyArr,function(item,i){
            item.addEventListener('click', comment.show, false);
        });

        // 评论框焦点
        var textareaArr = document.getElementsByClassName('comment-form-textarea');
        [].forEach.call(textareaArr, function(item, i){
            item.addEventListener('focus', comment.focus, false);
            item.addEventListener('blur', comment.focus, false);
        })

        // 邮箱验证
        var emailArr = document.getElementsByClassName('comment-form-email');
        [].forEach.call(emailArr, function(item,i){
            item.addEventListener('blur', comment.verify, false);
        });

        // 重置访客信息
        var exitArr = document.getElementsByClassName('exit');
        [].forEach.call(exitArr,function(item,i){
            item.addEventListener('click', guest.clear, false);
        });

        // 提交按钮
        var submitArr = document.getElementsByClassName('comment-form-submit');
        [].forEach.call(submitArr,function(item,i){
            item.addEventListener('click', guest.submit, false);
            item.addEventListener('click', comment.post, false);
        });

        // 上传图片按钮
        var imgInputArr = document.getElementsByClassName('comment-image-input');
        [].forEach.call(imgInputArr, function(item,i){
            item.addEventListener('change', comment.upload, false);
        });

    },

    // 评论框焦点
    focus: function(e){
        var wrapper = e.currentTarget.closest('.comment-form-wrapper');
        wrapper.classList.add('editing');
        if (wrapper.classList.contains('focus')){
            wrapper.classList.remove('focus');
        } else{
            wrapper.classList.add('focus');
        }
    },

    //点选表情
    field: function(e){
        var item = e.currentTarget;
        var textarea = item.closest('.comment-form').querySelector('.comment-form-textarea');
        textarea.value += item.dataset.code;
        textarea.focus();
    },

    //emoji表情
    emoji: [
        {
            code:':grin:',
            title:'露齿笑',
            url:'//assets-cdn.github.com/images/icons/emoji/unicode/1f601.png'
        },
        {
            code:':joy:',
            title:'破涕为笑',
            url:'//assets-cdn.github.com/images/icons/emoji/unicode/1f602.png'
        },
        {
            code:':heart_eyes:',
            title:'色',
            url:'//assets-cdn.github.com/images/icons/emoji/unicode/1f60d.png'
        },{
            code:':sweat:',
            title:'汗',
            url:'//assets-cdn.github.com/images/icons/emoji/unicode/1f613.png'
        },{
            code:':unamused:',
            title:'无语',
            url:'//assets-cdn.github.com/images/icons/emoji/unicode/1f612.png'
        },{
            code:':smirk:',
            title:'得意',
            url:'//assets-cdn.github.com/images/icons/emoji/unicode/1f60f.png'
        },{
            code:':relieved:',
            title:'满意',
            url:'//assets-cdn.github.com/images/icons/emoji/unicode/1f60c.png'
        },{
            code:':wx_smirk:',
            title:'奸笑',
            url: site.img + '/wx_emoji/2_02.png'
        },{
            code:':wx_hey:',
            title:'嘿哈',
            url: site.img + '/wx_emoji/2_04.png'
        },{
            code:':wx_facepalm:',
            title:'捂脸',
            url: site.img + '/wx_emoji/2_05.png'
        },{
            code:':wx_smart:',
            title:'机智',
            url: site.img + '/wx_emoji/2_06.png'
        },{
            code:':wx_tea:',
            title:'茶',
            url: site.img + '/wx_emoji/2_07.png'
        },{
            code:':wx_yeah:',
            title:'耶',
            url: site.img + '/wx_emoji/2_11.png'
        },{
            code:':wx_moue:',
            title:'皱眉',
            url: site.img + '/wx_emoji/2_12.png'
        },{
            code:':doge:',
            title:'doge',
            url: site.img + '/weibo/doge.png'
        },{
            code:':tanshou:',
            title:'摊手',
            url: site.img + '/weibo/tanshou.png'
        }
    ],
    
    // 邮箱验证
    verify: function(e){
        var email = e.currentTarget;
        var box  = email.closest('.comment-box');
        var avatar = box.querySelector('.comment-avatar-image');
        var name = box.querySelector('.comment-form-name');
        if (name.value != '' && /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(email.value)) {
            var xhrGravatar = new XMLHttpRequest();
            xhrGravatar.open('GET', site.api + '/disqus/getgravatar?email=' + email.value + '&name=' + name.value, true);
            xhrGravatar.send();
            xhrGravatar.onreadystatechange = function() {
                if (xhrGravatar.readyState == 4 && xhrGravatar.status == 200) {
                    if (xhrGravatar.responseText == 'false') {
                        alert('您所填写的邮箱地址有误！');
                    } else {
                        avatar.src = xhrGravatar.responseText;
                    }
                }
            }
        }
    },

    // 发表/回复评论
    post: function(e){
        var item = e.currentTarget.closest('.comment-item') || e.currentTarget.closest('.comment-box') ;
        var message = item.querySelector('.comment-form-textarea').value;
        var parentId = !!item.dataset.id ? item.dataset.id : '';
        var time = (new Date()).toJSON();
        var imgArr = item.getElementsByClassName('comment-image-item');
        var media = [];
        var mediaStr = '';
        [].forEach.call(imgArr, function(image,i){
            media[i] = image.dataset.imageUrl;
            mediaStr += ' ' + image.dataset.imageUrl;
        });
        if( !guest.name && !guest.email ){
            return;
        }
        if( media.length == 0 && message == '' ){
            alert('无法发送空消息');
            item.querySelector('.comment-form-textarea').focus();
            return;
        };
        var preMessage = message;
        comment.emoji.forEach(function(item,i){
            preMessage = preMessage.replace(item.code, '<img class="emojione" src="' + item.url + '" />');
        });
        guest.url = !!guest.url ? guest.url : '';
        var post = {
            'url': guest.url,
            'name': guest.name,
            'avatar': guest.avatar,
            'id': 'preview',
            'parent': parentId,
            'createdAt': time,
            'message': '<p>' + preMessage + '</p>',
            'media': media
        };
        comment.load(post, comment.count);
        timeAgo();

        message += mediaStr;
        
        comment.message = message;

        // 清空或移除评论框
        if( parentId ){
            item.querySelector('.comment-item-cancel').click();
        } else {
            item.querySelector('.comment-form-textarea').value = '';
            item.querySelector('.comment-image-list').innerHTML = '';
            item.querySelector('.comment-form-wrapper').classList.remove('expanded','editing');
        }

        // POST 操作
        var postQuery = 'thread=' + comment.thread + 
            '&parent=' + parentId + 
            '&message=' + message + 
            '&name=' + guest.name + 
            '&email=' + guest.email + 
            '&url=' + guest.url +
            '&link=' + page.url +
            '&title=' + page.title;
        var xhrPostComment = new XMLHttpRequest();
        xhrPostComment.open('POST', site.api + '/disqus/postcomment', true);
        xhrPostComment.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhrPostComment.send(postQuery);
        xhrPostComment.onreadystatechange = function() {
            if (xhrPostComment.readyState == 4 && xhrPostComment.status == 200) {
                var res = JSON.parse(xhrPostComment.responseText);
                if (res.code === 0) {
                    var preview = document.querySelector('.comment-item[data-id="preview"]');
                    preview.parentNode.removeChild(preview);
                    comment.count += 1;
                    document.getElementById('comment-count').innerHTML = comment.count + ' 条评论';
                    comment.load(res.response, comment.count);
                    timeAgo();
                    comment.form();
                } else if (res.code === 2) {
                    if (res.response.indexOf('email') > -1) {
                        alert('请输入正确的名字或邮箱！');
                        return;
                    } else if (res.response.indexOf('message') > -1) {
                        alert('评论不能为空！');
                        return;
                    }
                }
            }
        }
    },

    // 读取评论
    load: function(post, i){

        post.url = post.url ? post.url : 'javascript:;';
        post.createdAt = new Date(post.createdAt).getTime().toString().slice(0, -3);

        var parent = !post.parent ? {
            'name': '',
            'dom': document.querySelector('.comment-list'),
            'insert': 'afterbegin'
        } : {
            'name': !!document.querySelector('.comment-item[data-id="'+post.parent+'"]') ? '<a class="at" href="#'+document.querySelector('.comment-item[data-id="'+post.parent+'"]').getAttribute('id')+'">@' + document.querySelector('.comment-item[data-id="'+post.parent+'"]').dataset.name + '</a>': '',
            'dom': document.querySelector('.comment-item[data-id="'+post.parent+'"] .comment-item-children'),
            'insert': 'beforeend'
        };

        post.message = post.message.replace(/(.{3})/, '$1'+parent.name);

        var imageArr = post.media;
        post.media = '';
        imageArr.forEach(function(item, e){
            post.media += '<a class="comment-item-imagelink" target="_blank" href="' + item + '" ><img class="comment-item-image" src="' + item + '?imageView2/2/h/200"></a>';
        })
        post.media = '<div class="comment-item-images">' + post.media + '</div>';

        var html = '<li class="comment-item" data-index="'+(i+1)+'" data-id="'+post.id+'" data-name="'+ post.name+'" id="comment-' + post.id + '">';
        html += '<div class="comment-item-avatar"><img src="' + post.avatar + '"></div>';
        html += '<div class="comment-item-main">'
        html += '<div class="comment-item-header"><a class="comment-item-name" rel="nofollow" target="_blank" href="' + post.url + '">' + post.name + '</a><span class="comment-item-bullet"> • </span><span class="comment-item-time timeago" datetime="' + post.createdAt + '"></span><span class="comment-item-bullet"> • </span><a class="comment-item-reply" href="javascript:;">回复</a></div>';
        html += '<div class="comment-item-content">' + post.message + post.media + '</div>';
        html += '<ul class="comment-item-children"></ul>';
        html += '</div>'
        html += '</li>';
        if (!!parent.dom) {
            parent.dom.insertAdjacentHTML(parent.insert, html);
        }
    },

    // 获取评论列表
    getlist: function(){
        var xhrListPosts = new XMLHttpRequest();
        xhrListPosts.open('GET', site.api + '/disqus/getcomments?link=' + encodeURIComponent(page.url), true);
        xhrListPosts.send();
        xhrListPosts.onreadystatechange = function() {
            if (xhrListPosts.readyState == 4 && xhrListPosts.status == 200) {
                var res = JSON.parse(xhrListPosts.responseText);
                if (res.code === 0) {
                    comment.thread = res.thread;
                    comment.count = res.posts;
                    document.getElementById('comment-count').innerHTML = res.posts + ' 条评论';
                    document.querySelector('.comment-tips-link').setAttribute('href', res.link);
                    document.querySelector('.comment').classList.remove('loading')
                    if (res.response == null) {
                        return;
                    }
                    res.response.forEach(function(post, i){
                        comment.load(post,i);
                    });
                    timeAgo();
                } else {
                    /*
                    var query = 'url=' + page.url + '&title=' + page.title;;
                    var xhrcreateThread = new XMLHttpRequest();
                    xhrcreateThread.open('POST', site.api + '/disqus/createthread?' + query, true);
                    xhrcreateThread.send();
                    return;*/
                }
                if (/^#disqus|^#comment/.test(location.hash)) {
                    window.scrollTo(0, document.querySelector(location.hash).offsetTop);
                }
            }
        }
        xhrListPosts.onload = function(){
            comment.form();
        }

    },

    // 回复框
    show: function(e){

        // 移除已显示回复框
        var box = document.querySelector('.comment-item .comment-box');
        if( box ){
            box.parentNode.removeChild(box);
            var cancel = document.querySelector('.comment-item-cancel')
            cancel.outerHTML = cancel.outerHTML.replace('cancel','reply');
        }

        // 显示回复框
        var $this = e.currentTarget;
        var item = $this.closest('.comment-item');
        var parentId = item.dataset.id;
        var parentName = item.dataset.name;
        var commentBox = comment.box.replace(/emoji-input/g,'emoji-input-'+parentId).replace(/upload-input/g,'upload-input-'+parentId).replace(/加入讨论……|写条留言……/,'@'+parentName).replace(/加入讨论……|写条留言……/,'').replace(/<label class="comment-actions-label exit"(.|\n)*<\/label>\n/,'').replace(/<input id="tips-input"(.|\n)*<\/label>\n/,'');
        item.querySelector('.comment-item-main .comment-item-children').insertAdjacentHTML('beforebegin', commentBox);
        $this.outerHTML = $this.outerHTML.replace('reply','cancel');
        guest.init();


        // 取消回复
        item.querySelector('.comment-item-cancel').addEventListener('click', function(){
            var box = item.querySelector('.comment-box');
            box.parentNode.removeChild(box);
            this.outerHTML = this.outerHTML.replace('cancel','reply');
            comment.form();
        }, false);

        // 事件绑定
        comment.form();
    },

    // 上传图片
    upload: function(e){
        var file = e.currentTarget;
        var item = file.closest('.comment-box');
        var progress = item.querySelector('.comment-image-progress');
        var loaded = item.querySelector('.comment-image-loaded');
        var wrapper = item.querySelector('.comment-form-wrapper');
        if(file.files.length === 0){
            return;
        }

        //以文件大小识别是否为同张图片
        var size = file.files[0].size;
        if( comment.imagesize.indexOf(size) == -1 ){
            comment.imagesize.push(size);
            progress.style.width = '80px';
        } else {
            console.info('请勿选择已存在的图片！');
            return;
        }

        // 展开图片上传界面
        wrapper.classList.add('expanded');

        // 图片上传请求
        var data = new FormData();
        data.append('file', file.files[0] );
        var filename = file.files[0].name;

        var xhrUpload = new XMLHttpRequest();
        xhrUpload.onreadystatechange = function(){
            if(xhrUpload.readyState == 4 && xhrUpload.status == 200){
                try {
                    var resp = JSON.parse(xhrUpload.responseText);
                    if( resp.code == 0 ){
                        var imageUrl = resp.response[filename].url;
                        var image = new Image();
                        image.src = resp.url+'?imageView2/2/h/200';
                        image.onload = function(){
                            item.querySelector('[data-image-size="'+size+'"] .comment-image-object').setAttribute('src', image.src);
                            item.querySelector('[data-image-size="'+size+'"]').dataset.imageUrl = imageUrl;
                            item.querySelector('[data-image-size="'+size+'"]').classList.remove('loading');
                            item.querySelector('[data-image-size="'+size+'"]').addEventListener('click', comment.remove, false);
                        }
                    }
                } catch (e){
                    var resp = {
                        status: 'error',
                        data: 'Unknown error occurred: [' + xhrUpload.responseText + ']'
                    };
                }
            }
        };

        // 上传进度条
        xhrUpload.upload.addEventListener('progress', function(e){
            loaded.style.width = Math.ceil((e.loaded/e.total) * 100)+ '%';
        }, false);

        // 上传完成
        xhrUpload.upload.addEventListener("load", function(e){
            loaded.style.width = 0;
            progress.style.width = 0;
            var imageItem = '<li class="comment-image-item loading" data-image-size="' + size + '"><img class="comment-image-object" src="/assets/svg/loading.svg" /></li>';
            item.querySelector('.comment-image-list').insertAdjacentHTML('beforeend', imageItem);
        }, false);

        xhrUpload.open('POST', site.api + '/disqus/upload', true);

        xhrUpload.send(data);
    },

    //移除图片
    remove: function(e){
        var item = e.currentTarget.closest('.comment-image-item');
        var wrapper = e.currentTarget.closest('.comment-form-wrapper');
        item.parentNode.removeChild(item);
        comment.imagesize = [];
        var imageArr = document.getElementsByClassName('comment-image-item');
        [].forEach.call(imageArr, function(item, i){
            comment.imagesize[i] = item.dataset.imageSize;
        });
        if(comment.imagesize.length == 0){
            wrapper.classList.remove('expanded');
        }
    }

}

var xhr = new XMLHttpRequest();
xhr.timeout = 1000;
xhr.open('GET', 'https://disqus.com/next/config.json', true);
xhr.onload = function() {
};
xhr.ontimeout = function(){
};
xhr.send(null);

var guest = new Guest();
var comment =  new Comment();

// lightbox http://goo.gl/aA9Y5K
if (page.img > 0 && !browser.mobile) {
    var lbscript = document.createElement('script');
    lbscript.type = 'text/javascript';
    lbscript.src = '/assets/js/lightbox.min.js';
    document.getElementsByTagName('BODY')[0].appendChild(lbscript);
    lbscript.onload =  function(){
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
            nextOnClick: false,
            responsive: true,
            maxImgSize: .9,
        }
        lightbox.load(lightBoxOptions);
    }
}


// 标签云 http://goo.gl/OAvhn3
if ( page.url == '/tags.html' ) {
    var tagscript = document.createElement('script');
    tagscript.type = 'text/javascript';
    tagscript.src = '/assets/js/tagcanvas.min.js';
    document.getElementsByTagName('head')[0].appendChild(tagscript);
    tagscript.onload = function(){
        TagCanvas.Start('tag-canvas', 'tags', {
            textHeight: 25,
            textColour: null,
            //textFont:  ''
            outlineColour: 'rgba(225, 225, 225, .3)',
            outlineMethod: 'block',
            bgRadius: 5,
            reverse: true,
            depth: 0.8,
            Zoom: 1.5,
            weight: true,
            weightSizeMin: 10,
            weightSizeMax: 25,
            wheelZoom: false
        });
    }
}

// 统计
setTimeout(function() {
    if ( location.origin === site.home ) {
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement('script');
            hm.src = '//hm.baidu.com/hm.js?'+site.tongji;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();

        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', site.analytics, 'auto');
        ga('send', 'pageview');
    }
}, 1000);
