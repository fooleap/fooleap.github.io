// closest & matches Polyfill
!function(a){var c;if(a=a.Element)a=a.prototype,!(c=a.matches)&&(c=a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector||a.querySelectorAll&&function matches(a){a=(this.parentNode||this.document||this.ownerDocument).querySelectorAll(a);for(var b=a.length;0<=--b&&a.item(b)!==this;);return-1<b})&&(a.matches=c),!a.closest&&c&&(a.closest=function closest(a){for(var b=this;b;){if(1===b.nodeType&&b.matches(a))return b;b=b.parentNode}return null})}(Function("return this")());

var imgpath = document.getElementsByTagName('head')[0].dataset.imgPath;

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

// 图片
(function(){
    var postImages = document.querySelectorAll('.post-content img');
    var pageImages = document.querySelectorAll('.post-item-thumb');
    var imageArr = postImages.length > 0 ? postImages : pageImages;
    var xhrImageAve = [],
        xhrImageExif = [],
        imageAve = [],
        imageExif = [];
    [].forEach.call(imageArr, function(item, i){

        //预加载图片平均色调
        imageAve[i] = item.src.split(/_|\?/)[0] + '?imageAve';
        xhrImageAve[i] = new XMLHttpRequest();
        xhrImageAve[i].open('GET', imageAve[i], true);
        xhrImageAve[i].onreadystatechange = function() {
            if (this.readyState==4 && this.status==200)
            {
                var data = JSON.parse(this.responseText);
                var color = data.RGB.slice(2);
                document.querySelector('[src^="' + this.responseURL.slice(0,-9) + '"]').style.backgroundColor = '#' + color;
            }
        };
        xhrImageAve[i].send(null);

        if ( postImages.length > 0 ){
            //Lightbox
            item.dataset.jslghtbx = item.src.split(/_|\?/)[0];
            item.dataset.jslghtbxCaption = item.getAttribute('alt');
            item.dataset.jslghtbxGroup = 'lightbox';
            item.classList.add('post-image');
            item.parentElement.outerHTML = item.parentElement.outerHTML.replace('<p>','<figure class="post-figure">').replace('</p>','</figure>').replace(item.parentElement.textContent, '<figcaption class="post-figcaption">'+ item.parentElement.textContent.trim() +'</figcaption>');

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
                            var model = (data.Model) ? (data.Model.val) : '无';
                            var fnum = (data.FNumber) ? (data.FNumber.val.split(/\//)[1]) : '无';
                            var extime = (data.ExposureTime) ? (data.ExposureTime.val) : '无';
                            var iso = (data.ISOSpeedRatings) ? (data.ISOSpeedRatings.val.split(/,\s/)[0]) : '无';
                            var flength = (data.FocalLength) ? (data.FocalLength.val) : '无';
                            document.querySelector('[src^="' + this.responseURL.slice(0,-5) + '"]').nextSibling.insertAdjacentHTML('beforeend', '<small class="post-image-exif">日期: ' + date + ' 器材: ' + model + ' 光圈: ' + fnum + ' 快门: ' + extime + ' 感光度: ' + iso + ' 焦距: ' + flength + '</small>');
                        }
                    }
                };
                xhrImageExif[i].send(null);
            }
        }

        //恢复背景色
        var image = new Image();
        image.onload = function(){
            document.querySelector('[src="' + this.src + '"]').dataset.onload = "true";
        }
        image.src = item.src;
    });

})();

(function(){
    [].forEach.call(document.querySelectorAll('.icon'), function(item, i){
        item.addEventListener('mouseover', function(){
            var hoverColor = this.dataset.color;
            this.contentDocument.querySelector('.icon').setAttribute("fill", hoverColor);
        }, false);
        item.addEventListener('mouseout', function(){
            var hoverColor = this.dataset.color;
            this.contentDocument.querySelector('.icon').setAttribute("fill", null);
        }, false);
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

// 返回顶部按钮
function toggleToTop() {
    var pos = document.documentElement.scrollTop || document.body.scrollTop;
    if (pos > clientHeight) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}


// 目录
var toc = document.getElementById('toc');
var subTitles = document.querySelectorAll('.main-content h2,h3');
var sectionIds = [];
var sections = [];
if (toc) {
    var tocFixed = clientWidth / 2 - 400 - toc.offsetWidth;
    if (tocFixed < 15) {
        toc.classList.add('hide');
    } else {
        toc.style.left = tocFixed + 'px';
    }
}

function tocShow() {
    if (toc) {
        for (var i = 0; i < subTitles.length; i++) {
            sectionIds.push(subTitles[i].getAttribute('id'));
            sections.push(subTitles[i].offsetTop);
        }
        document.addEventListener('scroll', tocScroll, false);
    }
}

function tocScroll() {
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
                document.getElementById('refs').insertAdjacentHTML('beforeend', '<li class="note"><a href="#' + ref + '">&and;</a> <a href="' + noteHref + '" title="' + noteTitle + '" id="' + note + '" class="exf-text" target="_blank">' + noteTitle + '</a></li>');
            } else {
                links[i].setAttribute('target', '_blank');
            }
        }
    }
    var noteLinks = document.querySelectorAll('a[href^="#note"], a[href^="#ref"]');
    for (var i = 0; i < noteLinks.length; i++) {
        noteLinks[i].addEventListener('click', function(){
            for (var i = 0; i < noteLinks.length; i++) {
                noteLinks[i].parentElement.style.backgroundColor = '';
            }
            var href = this.href.split('#')[1];
            document.getElementById(href).parentElement.style.backgroundColor = 'rgb(235, 235, 235)';
        }, false);
    }
})();

// Disqus 评论
// 评论计数
var commentLinks = document.querySelectorAll('.post-item-comment');
var commentArr = []
if (commentLinks.length > 0) {
    for (var i = 0; i < commentLinks.length; i++) {
        commentArr[i] = commentLinks[i].dataset.disqusUrl;
    }
    var commentLink = commentArr.join(',');
    var xhrCommentCount = new XMLHttpRequest();
    xhrCommentCount.open('GET', 'http://api.fooleap.org/disqus/list?link=' + commentLink, true);
    xhrCommentCount.send();
    xhrCommentCount.onreadystatechange = function() {
        if (xhrCommentCount.readyState == 4 && xhrCommentCount.status == 200) {
            var data = JSON.parse(xhrCommentCount.responseText);
            for (var i = 0; i < data.response.length; i++) {
                var count = data.response[i].posts == 0 ? '' : data.response[i].posts;
                document.querySelector('[data-disqus-url="' + data.response[i].link.slice(24) + '"]').innerHTML = count;
            }
        }
    }
}


// 显示完整评论
function disqus_config() {
    this.page.url = 'http://blog.fooleap.org' + location.pathname;
    this.callbacks.onReady.push(function() {
        console.log('disqus loaded');
        document.querySelector('.disqus-loading').style.display = 'none';
        commentToggle();
    });
};

function showComments() {
    document.querySelector('.comment-show').style.display = 'none';
    document.querySelector('.comment').insertAdjacentHTML('beforebegin', '<div class="comment-mode cf"><div class="comment-toggle" onclick="commentToggle()"><div class="comment-swtich"></div></div><div class="comment-name">简易评论框</div><div class="disqus-loading"></div></div>');
    var d = document,
        s = d.createElement('script');
    s.src = '//fooleap.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}

function commentToggle() {
    var comment = document.querySelectorAll('.comment');
    var toggle = document.querySelector('.comment-toggle');
    var name = document.querySelector('.comment-name');
    if (toggle.className == 'comment-toggle') {
        toggle.className = 'comment-toggle disqus';
        comment[0].className = 'comment hide';
        comment[1].className = 'comment';
        name.innerHTML = 'Disqus 评论框';
    } else {
        toggle.className = 'comment-toggle';
        comment[0].className = 'comment';
        comment[1].className = 'comment hide';
        name.innerHTML = '简易评论框';
    }
}

var windowWidth = window.innerWidth;
if (windowWidth < 414) {
    var postTitles = document.getElementsByClassName('post-title');
    var postWidth = windowWidth - 88;
    for (var i = 0; i < postTitles.length; i++) {
        postTitles[i].style.width = (postWidth + 'px');
    }
}

//评论
function getComments(res) {
    if (res.code === 0) {
        document.querySelector('.comment-form').setAttribute('data-id', res.id);
        document.querySelector('#comment-count').innerHTML = res.posts + ' 条评论';
        document.getElementById('comments').classList.remove('loading')
        if (res.response == null) {
            return;
        }
        res.response.forEach(function(post, i){
            var profileUrl = post.profileUrl ? post.profileUrl : 'javascript:void(0);';
            var url = post.url ? post.url : profileUrl;
            var date = new Date(post.createdAt).getTime().toString().slice(0, -3);
            var images = post.media;
            var imageList = '<div class="post-image">';
            images.forEach(function(item, e){
                imageList += '<a target="_blank" href="' + item + '" ><img class="comment-item-image" src="' + item + '"></a>';
            })
            imageList += '</div>';
            var isModerator = post.name == 'fooleap' ? '<span class="moderator">博主</span>' : '';
            var html = '<li class="comment-item" id="comment-' + post.id + '">';
            html += '<div class="comment-item-avatar"><img src="' + post.avatar + '"></div>';
            html += '<div clas="comment-item-main">'
            html += '<div class="comment-item-header"><a target="_blank" href="' + url + '">' + post.name + '</a>' + isModerator + '<span class="bullet"> • </span><span class="timeago" title="' + date + '">' + post.createdAt + '</span><span class="bullet"> • </span><a class="comment-reply" href="javascript:void(0)" onclick="showCommentForm(this)">回复</a></div>';
            html += '<div class="comment-item-content">' + post.message + imageList + '</div>';
            html += '<ul class="comment-item-children"></ul>';
            html += '</div>'
            html += '</li>';
            if (post.parent == null) {
                document.getElementById('comments').insertAdjacentHTML('afterbegin', html);
            } else {
                if (document.querySelector('#comment-' + post.parent + ' .comment-item-children')) {
                    document.querySelector('#comment-' + post.parent + ' .comment-item-children').insertAdjacentHTML('beforeend', html);
                }
            }
        });
        timeAgo();
        /*
        //是否能连上 Disqus
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://disqus.com/next/config.json', true);
        xhr.onload = function(e) {
            document.querySelector('.comment-show').style.display = 'inline-block';
        };
        xhr.send(null);*/
    } else {
        var url = location.pathname.slice(1);
        var title = document.querySelector('title').innerText;
        var xhrcreateThread = new XMLHttpRequest();
        xhrcreateThread.open('POST', 'http://api.fooleap.org/disqus/createthread?url=' + url + '&title=' + title, true);
        xhrcreateThread.send();
        return;
    }
}
//html += '<div class="comment-form cf hide" data-parent="' + post.id + '" data-id="' + res.id + '"><span class="avatar"><img src="http://gravatar.duoshuo.com/avatar/?d=a.disquscdn.com/images/noavatar92.png"></span><div class="textarea-wrapper"><textarea class="comment-form-textarea" placeholder="回复' + post.name + '…" onfocus="editComment(this)" onblur="editComment(this)"></textarea><div class="post-actions cf">' + document.querySelector('.emojione').outerHTML + '<button class="logged-button" onclick="replyComment(this)">发表回复</button></div></div><div class="comment-input-group hide"><input class="comment-form-input comment-form-name" type="text" placeholder="请输入您的名字（必填）"><input class="comment-form-input comment-form-email" type="email" placeholder="请输入您的邮箱（必填）" onblur="verifyEmail(this)"><input class="comment-form-input comment-form-url" type="text" placeholder="请输入您的网址（可选）"></div><label class="comment-input-checkbox hide" for="remember-' + post.id + '"><input type="checkbox" id="remember-' + post.id + '" checked> 记住我</label><button title="若有回复，您将得到邮件提醒" class="comment-form-submit hide" onclick="replyComment(this)"><i class="icon icon-proceed"></i></button><div class="comment-form-alert"></div></div>'

//获取文章评论
if (document.querySelector('#comments')) {
    var xhrComment = new XMLHttpRequest();
    xhrComment.open('GET', 'http://api.fooleap.org/disqus/getcomments?link=' + location.pathname.slice(1), true);
    xhrComment.send();
    xhrComment.onreadystatechange = function() {
        if (xhrComment.readyState == 4 && xhrComment.status == 200) {
            getComments(JSON.parse(xhrComment.responseText));
            //loadGuest();
            if (/^#disqus|^#comment/.test(location.hash)) {
                window.scrollTo(0, document.querySelector(location.hash).offsetTop);
            }
        }
    }
}

//验证邮箱
function verifyEmail(el) {
    var guest = el.parentElement;
    var form = el.parentElement.parentElement;
    var avatar = form.querySelector('.avatar img');
    var name = guest.querySelector('.guest-form-name') || form.querySelector('.comment-form-input');
    var alert = form.querySelector('.comment-form-alert');
    if (el.value != '') {
        if (/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(el.value)) {
            var xhrGravatar = new XMLHttpRequest();
            xhrGravatar.open('GET', 'http://api.fooleap.org/disqus/getgravatar?email=' + el.value + '&name=' + name.value, true);
            xhrGravatar.send();
            xhrGravatar.onreadystatechange = function() {
                if (xhrGravatar.readyState == 4 && xhrGravatar.status == 200) {
                    if (xhrGravatar.responseText == 'false') {
                        alert.innerHTML = '您所填写的邮箱地址有误！';
                    } else {
                        alert.innerHTML = '';
                        avatar.src = xhrGravatar.responseText;
                    }
                }
            }
        } else {
            alert.innerHTML = '您所填写的邮箱地址有误！';
        }
    }
}

//编辑评论
function editComment(el) {
    el.parentNode.classList.add('editing');
    if (el.parentNode.classList.contains('focus')){
        el.parentNode.classList.remove('focus');
    } else {
        el.parentNode.classList.add('focus');
    }
}

//提交加载
function htmlComment(data) {
    var post = data.response;
    var url = post.author.url ? post.author.url : 'javascript:void(0);';
    var date = new Date(post.createdAt).getTime().toString().slice(0, -3);
    var html = '<li class="comment-item" id="comment-' + post.id + '">';
    html += '<a target="_blank" class="avatar" href="' + url + '"><img src="' + post.author.avatar.cache + '"></a>';
    html += '<div class="post-header"><a target="_blank" href="' + url + '">' + post.author.name + '</a><span class="bullet"> • </span><span class="timeago" title="' + date + '">' + post.createdAt + '</span><span class="bullet"> • </span><a class="comment-reply" href="javascript:void(0)" onclick="showCommentForm(this)">回复</a></div>';
    html += '<div class="post-content">' + post.message + '</div>';
    html += '<ul class="post-children"></ul>';
    html += '</li>';
    return html;
}

//移除预览评论
function removeComment() {
    var node = document.querySelector('.comment-item.transparent');
    node.parentNode.removeChild(node);
}

//发表预加载 
function previewComment(parent, avatar, name, message, url) {
    var url = url == '' ? 'javascript:void(0);' : url;
    var html = '<li class="comment-item transparent">';
    html += '<a target="_blank" class="avatar"><img src="' + avatar + '"></a>';
    html += '<div class="post-header"><a target="_blank" href="' + url + '">' + name + '</a><span class="bullet"> • </span><span class="timeago">几秒前</span><span class="bullet"> • </span><a class="comment-reply" href="javascript:void(0)" onclick="showCommentForm(this)">回复</a></div>';
    html += '<div class="post-content">' + message + '</div>';
    html += '<ul class="post-children"></ul>';
    html += '</li>';
    if (parent == null) {
        document.getElementById('comments').insertAdjacentHTML('afterbegin', html);
        document.getElementById('message').value = '';
    } else {
        document.querySelector('#comment-' + parent + ' .post-children').insertAdjacentHTML('beforeend', html);
        document.querySelector('#comment-' + parent + ' .comment-form-textarea').value = '';
    }
}

/*
//读取访客信息
function loadGuest() {
    var name = document.querySelectorAll('.comment-form-name');
    var email = document.querySelectorAll('.comment-form-email');
    var url = document.querySelectorAll('.comment-form-url');
    var avatar = document.querySelectorAll('.comment-form .avatar img');
    var input = document.querySelectorAll('.comment-input-group');
    var submit = document.querySelectorAll('.comment-form-submit');
    var checkbox = document.querySelectorAll('.comment-input-checkbox');
    var loggedSubmit = document.querySelectorAll('.logged-button');
    if (localStorage.getItem('name')) {
        var logName = document.querySelector('.logged-name');
        logName.innerHTML = localStorage.getItem('name');
        //document.querySelector('#coauthor').className = 'author';
        for (var i = 0; i < name.length; i++) {
            name[i].value = localStorage.getItem('name');
            email[i].value = localStorage.getItem('email');
            url[i].value = localStorage.getItem('url');
            avatar[i].src = localStorage.getItem('avatar');
            input[i].className = 'comment-input-group hide';
            submit[i].className = 'comment-form-submit hide';
            checkbox[i].className = 'comment-input-checkbox hide';
            loggedSubmit[i].className = 'logged-button';
        }
    } else {
        for (var i = 0; i < input.length; i++) {
            input[i].className = 'comment-input-group';
            submit[i].className = 'comment-form-submit';
            checkbox[i].className = 'comment-input-checkbox';
            loggedSubmit[i].className = 'logged-button hide';
        }
        //src = 'https://a.disquscdn.com/images/noavatar92.png';
    }
}

//编辑访客信息
function editGuest() {
    var guestForm = '<div class="guest-form">' +
        '<input class="guest-form-name" type="text" placeholder="请输入您的名字（必填）" value="' + localStorage.getItem('name') + '">' +
        '<input class="guest-form-email" type="email" placeholder="请输入您的邮箱（必填）" onblur="verifyEmail(this)" value="' + localStorage.getItem('email') + '">' +
        '<input class="guest-form-url" type="text" placeholder="请输入您的网址（可选）" value="' + localStorage.getItem('url') + '">' +
        '<button class="guest-form-submit" onclick="submitGuest()">保存</button><button class="guest-form-clear" onclick="clearGuest()">清除</button>' +
        '</div>';
    if (document.querySelectorAll('.guest-form').length == 0) {
        document.querySelector('.comment-header').insertAdjacentHTML('afterend', guestForm);
    } else {
        var node = document.querySelector('.guest-form');
        node.parentNode.removeChild(node);
    }
}

//提交访客信息
function submitGuest() {
    var name = document.querySelector('.guest-form-name').value;
    var email = document.querySelector('.guest-form-email').value;
    var url = document.querySelector('.guest-form-url').value;
    var avatar = document.querySelector('.avatar img').src;
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('url', url);
    localStorage.setItem('avatar', avatar);
    var node = document.querySelector('.guest-form');
    node.parentNode.removeChild(node);
    //loadGuest();
}

//清除访客信息
function clearGuest() {
    var node = document.querySelector('.guest-form');
    node.parentNode.removeChild(node);
    //loadGuest();
}
*/

var guest = {
    init: function(){
        if(localStorage.getItem('logged_in') == 'true' ){
           document.querySelector('.comment-form-wrapper').classList.add('logged-in');
        } else {
           localStorage.setItem('logged_in', 'false');
        }
    },
    edit: function(){
    },
    submit: function(){
    },
    clear: function(){
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('url');
        localStorage.removeItem('avatar');
        localStorage.setItem('logged_in', false);
    }
}

function Comment () {
    this.imagesize = [];
    this.link = document.getElementsByTagName('head')[0].dataset.url;
    this.init();
}

Comment.prototype = {
    // 初始化
    init: function(){
        guest.init();

        //选图即上传
        document.getElementById('image-upload').addEventListener('change', function(e){
            comment.upload();
        });
    },
    //emoji表情
    emoji: {
        text: [
            'doge',
            'tanshou',
            'wx_smirk',
            'wx_hey',
            'wx_facepalm',
            'wx_smart',
            'wx_tea',
            'wx_yeah',
            'wx_moue'
        ],
        code: [
            'doge',
            '摊手',
            '奸笑',
            '嘿哈',
            '捂脸',
            '茶',
            '耶',
            '皱眉'
        ],
        url: [
            'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/doge_org.gif',
            'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/09/pcmoren_tanshou_thumb.png',
            imgpath + '/2_02.png',
            imgpath + '/2_04.png',
            imgpath + '/2_05.png',
            imgpath + '/2_06.png',
            imgpath + '/2_07.png',
            imgpath + '/2_11.png',
            imgpath + '/2_12.png'
        ],
    },
    get: function(){
    },

    //移除图片
    remove: function(){
        var currentItem = this.closest('.comment-image-item');
        currentItem.parentNode.removeChild(currentItem);
        comment.imagesize = [];
        [].forEach.call(document.getElementsByClassName('comment-image-item'), function(item, i){
            comment.imagesize[i] = item.dataset.imageSize;
        })
    },

    // 上传图片
    upload: function(id){
        var id = id ? '-' + id : '';
        var file = document.getElementById('image-upload'+id);
        var progress = document.querySelector('.comment-image-progress');
        var loaded = document.querySelector('.comment-image-loaded');
        var wrapper = document.querySelector('.comment-form-wrapper');
        if(file.files.length === 0){
            return;
        }

        // 展开图片上传界面
        wrapper.classList.add('expanded');

        //以文件大小识别是否为同张图片
        var size = file.files[0].size;
        if( this.imagesize.indexOf(size) == -1 ){
            this.imagesize.push(size);
            progress.style.width = '80px';
        } else {
            console.log('请勿选择已存在的图片！');
            return;
        }

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

                        // 上传至 Disqus 回调成功，显示正在读取
                        var imageUrl = resp.response[filename].url;
                        var imageFilename = resp.response[filename].filename;
                        var imageItem = '<li class="comment-image-item loading" data-image-size="' + size + '" data-image-filename="'+imageFilename+'" data-image-url="'+imageUrl+'"><img class="comment-image-object" src="/assets/svg/loading.svg"/></li>';
                        document.querySelector('.comment-image-list').insertAdjacentHTML('beforeend', imageItem);

                        // Fetch 到七牛，回调显示图片
                        var fetchQuery = 'url=' + imageUrl + '&prefix=images'+ '&filename='+imageFilename;
                        var xhrFetch = new XMLHttpRequest();
                        xhrFetch.onreadystatechange = function(){
                            if(xhrFetch.readyState == 4 && xhrFetch.status == 200){
                                var file = JSON.parse(xhrFetch.responseText);
                                document.querySelector('[data-image-filename="'+file.filename+'"] .comment-image-object').setAttribute('src',file.url);
                                document.querySelector('[data-image-filename="'+file.filename+'"]').classList.remove('loading');
                            }
                        }
                        xhrFetch.open('GET', 'http://api.fooleap.org/qiniu/fetch?'+fetchQuery,true);
                        xhrFetch.send();
                    }
                } catch (e){
                    var resp = {
                        status: 'error',
                        data: 'Unknown error occurred: [' + xhrUpload.responseText + ']'
                    };
                }
                loaded.style.width = 0;
                progress.style.width = 0;
            }
        };

        // 上传进度条
        xhrUpload.upload.addEventListener('progress', function(e){
            loaded.style.width = Math.ceil((e.loaded/e.total) * 100)+ '%';
        }, false);
        xhrUpload.open('POST', 'http://api.fooleap.org/disqus/upload',true);
        xhrUpload.send(data);
    },

    // 发表/回复评论
    post: function(){
    },

    //
}

if( document.getElementsByTagName('head')[0].dataset.id != null || document.getElementsByTagName('head')[0].dataset.url == '/guestbook.html'){
    var comment = new Comment();
}

//发表评论
function postComment(parent) {
    var id = document.querySelector('.comment-form').getAttribute('data-id');
    var name = document.getElementById('author_name').value;
    var email = document.getElementById('author_email').value;
    var url = document.getElementById('author_url').value;
    var avatar = document.querySelector('.avatar img').src;
    var message = document.getElementById('message').value;
    var count = parseInt(document.querySelector('.comment-header-count').innerText.slice(0, -9)) + 1 + ' comments';
    previewComment(parent, avatar, name, message, url);
    var xhrPostComment = new XMLHttpRequest();
    xhrPostComment.open('POST', 'http://api.fooleap.org/disqus/postcomment', true);
    xhrPostComment.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrPostComment.send('id=' + id + '&message=' + message + '&name=' + name + '&email=' + email + '&url=' + url);
    xhrPostComment.onreadystatechange = function() {
        if (xhrPostComment.readyState == 4 && xhrPostComment.status == 200) {
            var data = JSON.parse(xhrPostComment.responseText);
            if (data.code === 0) {
                var result = htmlComment(data);
                document.getElementById('comments').insertAdjacentHTML('afterbegin', result);
                document.querySelector('.comment-header-count').innerText = count;
                timeAgo();
                if (document.querySelector('#remember').checked) {
                    localStorage.setItem('name', name);
                    localStorage.setItem('email', email);
                    localStorage.setItem('url', url);
                    localStorage.setItem('avatar', avatar);
                    //loadGuest();
                }
                removeComment();
            } else if (data.code === 2) {
                if (data.response.indexOf('email') > -1) {
                    alert('请输入正确的名字或邮箱！');
                    removeComment();
                    document.getElementById('message').value = message;
                    return;
                } else if (data.response.indexOf('message') > -1) {
                    alert('评论不能为空！');
                    removeComment();
                    document.getElementById('message').value = message;
                    return;
                }
            }
        }
    }
}

//显示回复框
function showCommentForm(el) {
    var post = el.parentElement.parentElement;
    var commentForms = document.querySelectorAll('.comment-form');
    for (var i = 1; i < commentForms.length; i++) {
        commentForms[i].className = 'comment-form cf hide';
    }
    el.innerHTML = el.innerHTML == '回复' ? '取消回复' : '回复';
    if (el.innerHTML == '回复') {
        post.querySelector('.comment-form').className = 'comment-form cf hide';
    } else {
        post.querySelector('.comment-form').className = 'comment-form cf';
    }
    for (var i = 1; i < commentForms.length; i++) {
        if (commentForms[i].className == 'comment-form cf hide') {
            commentForms[i].parentElement.querySelector('.comment-reply').innerHTML = "回复";
        }
    }
}

function AddOnPos(myField, myValue) {
    myField = myField.closest('.comment-item').querySelector('.comment-form-textarea');
    myField.value += myValue;
    myField.focus();
}

//回复评论
function replyComment(el) {
    var form = el.parentElement;
    if (form.className.indexOf('comment-form') < 0) {
        form = el.parentElement.parentElement.parentElement;
    }
    var id = form.getAttribute('data-id');
    var parent = form.getAttribute('data-parent');
    var name = form.querySelector('.comment-form-name').value;
    var email = form.querySelector('.comment-form-email').value;
    var url = form.querySelector('.comment-form-url').value;
    var message = form.querySelector('.comment-form-textarea').value;
    var avatar = form.querySelector('.avatar img').src;
    var title = document.querySelector('title').innerText;
    var link = location.pathname.slice(1);
    var count = parseInt(document.querySelector('.comment-header-count').innerText.slice(0, -9)) + 1 + ' comments';
    previewComment(parent, avatar, name, message, url);
    var xhrReplyComment = new XMLHttpRequest();
    xhrReplyComment.open('POST', 'http://api.fooleap.org/disqus/postcomment', true);
    xhrReplyComment.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrReplyComment.send('id=' + id + '&parent=' + parent + '&message=' + message + '&name=' + name + '&email=' + email + '&url=' + url);
    xhrReplyComment.onreadystatechange = function() {
        if (xhrReplyComment.readyState == 4 && xhrReplyComment.status == 200) {
            var data = JSON.parse(xhrReplyComment.responseText);
            if (data.code === 0) {
                var result = htmlComment(data);
                form.className = 'comment-form cf hide';
                form.nextSibling.insertAdjacentHTML('beforeend', result);
                form.querySelector('.comment-form-textarea').value = '';
                var commentReplys = document.querySelectorAll('.comment-reply');
                for (var i = 0; i < commentReplys.length; i++) {
                    commentReplys[i].innerHTML = '回复';
                };
                var commentTextareas = document.querySelectorAll('.comment-form-textarea');
                for (var i = 0; i < commentTextareas.length; i++) {
                    commentTextareas[i].className = 'comment-form-textarea';
                };
                document.querySelector('.comment-header-count').innerText = count;
                timeAgo();
                if (form.querySelector('[id^=remember]').checked) {
                    localStorage.setItem('name', name);
                    localStorage.setItem('email', email);
                    localStorage.setItem('url', url);
                    localStorage.setItem('avatar', avatar);
                    //loadGuest();
                }
                removeComment();
            } else if (data.code === 2) {
                if (data.response.indexOf('email') > -1) {
                    alert('请输入正确的名字或邮箱！');
                    return;
                } else if (data.response.indexOf('message') > -1) {
                    alert('评论不能为空！');
                    return;
                }
            }
        }
    }
    var xhrSendEmail = new XMLHttpRequest();
    xhrSendEmail.open('POST', 'http://api.fooleap.org/disqus/sendemail', true);
    xhrSendEmail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrSendEmail.send('parent=' + parent + '&message=' + message + '&name=' + name + '&title=' + title + '&link=' + link);
}

// 二维码 http://goo.gl/JzmGoq
var wechat = document.getElementById('wechat');
var qrcode = document.getElementById('qrcode');

function qrCode() {
    var qrcode = new QRCode('qrcode', {
        text: wechat.dataset.wechatUrl,
        width: 96,
        height: 96,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
    });
}
if (wechat) {
    var qrscript = document.createElement('script');
    qrscript.type = 'text/javascript';
    qrscript.src = 'http://' + location.host + '/assets/js/qrcode.min.js';
    document.getElementsByTagName('head')[0].appendChild(qrscript);

    function qrShow() {
        if (qrcode.classList.contains('show')) {
            qrcode.classList.remove('show');
            wechat.classList.remove('light');
        } else {
            qrcode.classList.add('show');
            wechat.classList.add('light');
        }
    }
    wechat.addEventListener('click', qrShow, false);
}

// 相关文章

function randomPosts(count, post) {
    var postsCount = count;
    var posts = post;
    var randomIndexUsed = [];
    var counter = 0;
    var numberOfPosts = 5;
    var RandomPosts = document.querySelector('#random-posts ul');
    while (counter < numberOfPosts) {
        var randomIndex = Math.floor(Math.random() * postsCount);
        if (randomIndexUsed.indexOf(randomIndex) == '-1') {
            var postUrl = posts[randomIndex].url;
            var postTitle = posts[randomIndex].title;
            RandomPosts.insertAdjacentHTML('beforeend', '<li><a href="' + postUrl + '" title="' + postTitle + '">' + postTitle + '</a></li>\n');
            randomIndexUsed.push(randomIndex);
            counter++;
        }
    }
}
var info = document.getElementById('random-posts');

if (info) {
    var category = info.dataset.category;
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', '/posts.json', true);
    xhrPosts.onreadystatechange = function() {
        if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
            var data = JSON.parse(xhrPosts.responseText);
            var posts = [];
            for( var i = 0; i < data.length; i++){
                if( data[i].category == category && data[i].url != location.pathname ){
                  posts.push(data[i]);
                }
            }
            randomPosts(posts.length, posts);
        }
    }
    xhrPosts.send();
}

// 查看源码
var postContent = document.querySelector('.page-content');
var mainContent = document.querySelector('.main-content');
var sourceView = document.querySelector('.view-code a');

function showSource() {
    var source = document.getElementById('source');
    if (source) {
        mainContent.classList.remove('hide');
        if (toc) {
            toc.classList.remove('hide');
        }
        source.parentNode.removeChild(source);
        sourceView.innerHTML = '<i class="icon-file-code"></i>源码';
        sourceView.setAttribute('title', '查看内容源码');
        window.scrollTo(0, sourceView.offsetTop);
    } else {
        mainContent.classList.add('hide');
        if (toc) {
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
        sourceView.setAttribute('title', '返回文章内容');
    }
}
if (sourceView) {
    if (document.addEventListener) {
        sourceView.addEventListener('click', showSource, false);
    } else {
        sourceView.attachEvent('onclick', showSource);
    }
}

// lightbox http://goo.gl/aA9Y5K
(function lightbox() {
    if (document.querySelectorAll('.image') && clientWidth > 640) {
        var lbscript = document.createElement('script');
        lbscript.type = 'text/javascript';
        lbscript.src = '/assets/js/lightbox.min.js';
        document.getElementsByTagName('BODY')[0].appendChild(lbscript);
    }
})();

// 标签云 http://goo.gl/OAvhn3
var tagCanvas = document.getElementById('tag-canvas');
if (tagCanvas) {
    if (clientWidth < 640) {
        tagCanvas.setAttribute('width', clientWidth);
        tagCanvas.setAttribute('height', clientWidth * 2 / 3);
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

    function tagShow() {
        for (var i = 0; i < hidePosts.length; i++) {
            hidePosts[i].style.display = 'none';
        }
        var href = decodeURIComponent(this.href.split('#')[1]);
        document.querySelector('h1').innerHTML = '“' + href + '”的相关文章';
        document.getElementById(href).removeAttribute('style');
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 1);
    }
    for (var i = 0; i < tagLinks.length; i++) {
        tagLinks[i].addEventListener('click', tagShow, false);
    }
    if (location.hash) {
        document.querySelector('[href="' + decodeURIComponent(location.hash) + '"]').click();
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 1);
    }
}

setTimeout(function() {
    if (location.hostname === 'blog.fooleap.org') {
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement('script');
            hm.src = '//hm.baidu.com/hm.js?fa7ec982118ebd236663169678264582';
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

        ga('create', 'UA-16717905-7', 'auto');
        ga('send', 'pageview');
    }
}, 1000);

window.onload = function() {
    tocShow();
    if (wechat) {
        qrCode();
    }
    window.addEventListener('keydown', keysDown, false);
    window.addEventListener('keyup', keysUp, false);
    if (document.querySelectorAll('.post-image') && clientWidth > 640) {
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
    if (tagCanvas) {
        tagCloud();
    }
}
