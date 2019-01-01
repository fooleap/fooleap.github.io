var iDisqus = require('disqus-php-api');
var wx = require('weixin-js-sdk');
var coordtransform = require('coordtransform');
var raphael = require('webpack-raphael');
var flowchart = require('flowchart.js');
var QRCode = require('davidshimjs-qrcodejs');
import './sass/main.scss';
var _hmt = _hmt || [];

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// TimeAgo https://coderwall.com/p/uub3pw/javascript-timeago-func-e-g-8-hours-ago
function timeAgo(selector) {

  var templates = {
    prefix: "",
    suffix: "前",
    seconds: "几秒",
    minute: "1分钟",
    minutes: "%d分钟",
    hour: "1小时",
    hours: "%d小时",
    day: "1天",
    days: "%d天",
    month: "1个月",
    months: "%d个月",
    year: "1年",
    years: "%d年"
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
      $this.innerHTML = timer($this.getAttribute('datetime'));
    }
  }
  // update time every minute
  setTimeout(timeAgo, 60000);
}


// matches & closest polyfill https://github.com/jonathantneal/closest
(function (ElementProto) {
  if (typeof ElementProto.matches !== 'function') {
    ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return Boolean(elements[index]);
    };
  }

  if (typeof ElementProto.closest !== 'function') {
    ElementProto.closest = function closest(selector) {
      var element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
})(window.Element.prototype);

function getQuery(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}


// 微信 SDK
if (browser.wechat && location.origin == site.home) {
  var xhrwesign = new XMLHttpRequest();
  xhrwesign.onreadystatechange = function () {
    if (xhrwesign.readyState == 4 && xhrwesign.status == 200) {
      var signPackage = JSON.parse(xhrwesign.responseText);
      wx.config({
        debug: false,
        appId: signPackage.appId,
        timestamp: signPackage.timestamp,
        nonceStr: signPackage.nonceStr,
        signature: signPackage.signature,
        jsApiList: [
          'chooseImage',
          'previewImage',
          //'setBounceBackground'
        ]
      });
    }
  }
  xhrwesign.open('GET', site.api + '/wechat/jssdk.php?url=' + location.href, true);
  xhrwesign.send();
  wx.ready(function () {
  });
}

window.addEventListener('beforeunload', function (event) {
  document.getElementById('menu').checked = false;
});

document.addEventListener('DOMContentLoaded', function (event) {
  var disq = new iDisqus('comment', {
    forum: site.forum,
    site: site.home,
    api: site.api + '/disqus',
    title: page.title,
    url: page.url,
    mode: 2,
    timeout: 3000,
    slug: page.url.slice(1).split('.')[0],
    init: true,
    toggle: 'comment-toggle',
    sort: 'newest',
    emoji_path: site.api + '/emoji/unicode/',
  });

  disq.count();
  timeAgo();

  var curYear = new Date().getFullYear();
  var startYear = Date.parse(curYear+'-01-01 00:00:00');
  var endYear = Date.parse(curYear+'-12-31 23:59:59');
  var yearProgress = (Date.now() - startYear) / (endYear - startYear) * 100;
  var widthProgress = yearProgress.toFixed(2) + '%'
  document.styleSheets[0].addRule('.page-title:before', 'width:'+widthProgress);
  document.styleSheets[0].addRule('.page-title:after', 'left:'+widthProgress);
  document.styleSheets[0].addRule('.page-title:after', 'content:"' + parseInt(yearProgress) + '%"');

  function wxchoose() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var localIds = res.localIds;
      }
    });
  }

  // 目录
  var toc = document.querySelector('.post-toc');
  var subTitles = document.querySelectorAll('.page-content h2,.page-content h3');
  var clientHeight = document.documentElement.clientHeight;
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
    var sectionIds = [];
    var sections = [];
    for (var i = 0; i < subTitles.length; i++) {
      sectionIds.push(subTitles[i].id);
      sections.push(subTitles[i].offsetTop);
    }
    var pos = document.documentElement.scrollTop || document.body.scrollTop;
    var lob = document.body.offsetHeight - subTitles[subTitles.length - 1].offsetTop;
    for (var i = 0; i < sections.length; i++) {
      if (i === subTitles.length - 1 && clientHeight > lob) {
        pos = pos + (clientHeight - lob);
      }
      if (sections[i] <= pos && sections[i] < pos + clientHeight) {
        if (document.querySelector('.active')) {
          document.querySelector('.active').classList.remove('active');
        }
        document.querySelector('[href="#' + sectionIds[i] + '"]').classList.add('active');
      }
    }
  }
  if (!!toc) {
    document.addEventListener('scroll', tocScroll, false);
    window.addEventListener('resize', tocShow, false);
    tocShow();
  }


  // 参考资料、站外链接
  if (document.querySelectorAll('h2')[document.querySelectorAll('h2').length - 1].innerHTML === '参考资料') {
    document.querySelectorAll('h2')[document.querySelectorAll('h2').length - 1].insertAdjacentHTML('afterend', '<ol id="refs"></ol>');
  }
  var links = document.getElementsByTagName('a');
  var noteArr = [];
  for (var i = 0; i < links.length; i++) {
    if (links[i].hostname != location.hostname && /^javascript/.test(links[i].href) === false) {
      var numText = links[i].innerHTML;
      if (/\[[0-9]*\]/.test(numText)) {
        var num = parseInt(numText.slice(1, -1));
        noteArr.push({
          num: num,
          title: links[i].title,
          href: links[i].href
        });
        links[i].classList.add('ref');
        links[i].href = '#note-' + num;
        links[i].id = 'ref-' + num;
      } else {
        links[i].target = '_blank';
      }
    }
  }
  noteArr = noteArr.sort(function (a, b) {
    return +(a.num > b.num) || +(a.num === b.num) - 1;
  })
  for (var i = 0; i < noteArr.length; i++) {
    document.getElementById('refs').insertAdjacentHTML('beforeend', '<li id="note-' + noteArr[i].num + '" class="note"><a href="#ref-' + noteArr[i].num + '">^</a> <a href="' + noteArr[i].href + '" title="' + noteArr[i].title + '" class="exf-text" target="_blank">' + noteArr[i].title + '</a></li>');
  }

  if (page.layout == 'post') {
    var imageArr = document.querySelectorAll('.post-content img[data-src]:not([class="emoji"])')
    var image = {
      src: [],
      thumb: [],
      title: [],
      coord: []
    };
    for (var i = 0; i < imageArr.length; i++) {
      image.thumb[i] = imageArr[i].src;
      image.src[i] = imageArr[i].dataset.src;
      //new RegExp(site.img,'i').test(imageArr[i].src) ? imageArr[i].src.split(/_|\?/)[0] : imageArr[i].src;
    }
    image.jpg = image.src.filter(function (item) {
      return item.indexOf('.jpg') > -1 && new RegExp(site.img, 'i').test(item);
    });
    [].forEach.call(imageArr, function (item, i) {
      image.title[i] = item.title || item.parentElement.textContent.trim() || item.alt;
      item.title = image.title[i];
      item.classList.add('post-image');
      item.parentElement.outerHTML = item.parentElement.outerHTML.replace('<p>', '<figure class="post-figure" data-index=' + i + '>').replace('</p>', '</figure>').replace(item.parentElement.textContent, '');
      var imgdom = document.querySelector('.post-image[data-src="' + image.src[i] + '"]');;
      if (new RegExp(site.img, 'i').test(image.src[i])) {
        imgdom.insertAdjacentHTML('afterend', '<figcaption class="post-figcaption">&#9650; ' + image.title[i] + '</figcaption>');
      }

      imgdom.addEventListener('click', function () {
        if (browser.wechat && browser.mobile) {
          wx.previewImage({
            current: image.src[i],
            urls: image.src
          });
        } else {
          window.open(image.src[i]);
        }
      })
    })

    var getExif = function (index) {
      if (index < image.jpg.length) {
        var item = image.jpg[index];
        var xhrExif = new XMLHttpRequest();
        xhrExif.open('GET', item + '?exif', true);
        xhrExif.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              var data = JSON.parse(this.responseText);
              var parseVal = function (odata) {
                if (!!odata) {
                  return odata.val;
                } else {
                  return '无';
                }
              }
              if (!!data.DateTimeOriginal) {
                var datetime = data.DateTimeOriginal.val.split(/\:|\s/);
                var date = datetime[0] + '-' + datetime[1] + '-' + datetime[2] + ' ' + datetime[3] + ':' + datetime[4];
                var make = parseVal(data.Make);
                var model = parseVal(data.Model);
                var fnum = parseVal(data.FNumber);
                var extime = parseVal(data.ExposureTime);
                var iso = parseVal(data.ISOSpeedRatings);
                var flength = parseVal(data.FocalLength);
                document.querySelector('.post-image[data-src="' + item + '"]').closest('.post-figure').dataset.exif = '时间: ' + date + ' 器材: ' + (model.indexOf(make) > -1 ? '' : make) + ' ' + model + ' 光圈: ' + fnum + ' 快门: ' + extime + ' 感光度: ' + iso + ' 焦距: ' + flength;
              }
              if (!!data.GPSLongitude) {
                var olat = data.GPSLatitude.val.split(', ');
                var olng = data.GPSLongitude.val.split(', ');
                var lat = 0, lng = 0;
                for (var e = 0; e < olat.length; e++) {
                  lat += olat[e] / Math.pow(60, e);
                  lng += olng[e] / Math.pow(60, e);
                }
                lat = data.GPSLatitudeRef && data.GPSLatitudeRef.val == 'S' ? -lat : lat;
                lng = data.GPSLongitudeRef && data.GPSLongitudeRef.val == 'W' ? -lng : lng;
                image.coord[index] = coordtransform.wgs84togcj02(lng, lat).join(',');
              }
            }
            index++;
            getExif(index);
          }
        }
        xhrExif.send();
      } else {
        var xhrRegeo = new XMLHttpRequest();
        xhrRegeo.open('GET', '//restapi.amap.com/v3/geocode/regeo?key=890ae1502f6ab57aaa7d73d32f2c8cc1&batch=true&location=' + image.coord.filter(function () { return true }).join('|'), true);
        xhrRegeo.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (data.info == 'OK') {
              var address, city, dist, town;
              for (var m = 0, n = 0; m < image.jpg.length; m++) {
                address = data.regeocodes[n];
                if (m in image.coord && !!address) {
                  address = address.addressComponent;
                  city = address.city || '';
                  dist = address.district || '';
                  town = address.township || '';
                  document.querySelector('[data-src="' + image.jpg[m] + '"]').title = '摄于' + city + dist + town;
                  n++;
                }
              }
            }
          }
        }
        xhrRegeo.send();
      }
    }

    if (image.jpg.length > 0) {
      getExif(0);
    }

    // 流程图
    var flowArr = document.getElementsByClassName('language-flow');
    [].forEach.call(flowArr, function (item, i) {
      var flowId = 'flow-' + (i + 1);

      var div = document.createElement('div');
      div.classList.add('flow');
      div.id = flowId;

      var pre = item.parentNode;
      pre.insertAdjacentElement('beforebegin', div);
      pre.style.display = 'none';

      var diagram = flowchart.parse(item.innerText);
      diagram.drawSVG(flowId, {
        'yes-text': '是',
        'no-text': '否',
      });
    })

    window.addEventListener('load', function () {
      var linkArr = document.querySelectorAll('.flow a');
      [].forEach.call(linkArr, function (link) {
        if (/^#/i.test(link.href)) {
          link.target = '_self';
        }
      })
    });

    // 相关文章
    var postData;
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', '/posts.json', true);
    xhrPosts.onreadystatechange = function () {
      if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
        postData = JSON.parse(xhrPosts.responseText);
        randomPosts(relatedPosts(page.tags, page.category));
      }
    }
    xhrPosts.send(null);

    function relatedPosts(tags, cat) {
      var posts = [];
      var used = [];
      postData.forEach(function (item, i) {
        if (item.tags.some(function (tag) { return tags.indexOf(tag) > -1; }) && item.url != location.pathname) {
          posts.push(item);
          used.push(i);
        }
      })
      while (posts.length < 5) {
        var index = Math.floor(Math.random() * postData.length);
        var item = postData[index];
        if (used.indexOf(index) == '-1' && item.category == cat && item.url != location.pathname) {
          posts.push(item);
          used.push(index);
        }
      }
      return posts;
    }

    function randomPosts(posts) {
      var used = [];
      var counter = 0;
      var html = '';
      while (counter < 5) {
        var index = Math.floor(Math.random() * posts.length);
        if (used.indexOf(index) == '-1') {
          html += '<li class="post-extend-item"><a class="post-extend-link" href="' + posts[index].url + '" title="' + posts[index].title + '">' + posts[index].title + '</a></li>\n';
          used.push(index);
          counter++;
        }
      }
      document.querySelector('#random-posts').insertAdjacentHTML('beforeend', html);
    }

    // 微信二维码
    var qrcode = new QRCode('qrcode', {
      text: document.getElementById('qrcode').dataset.qrcodeUrl,
      width: 80,
      height: 80,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.L,
      useSVG: true
    });

    var wechatQrcode = document.getElementById('wechat-qrcode');
    if (wechatQrcode) {
      var qrcode = new QRCode('wechat-qrcode', {
        text: document.getElementById('wechat-qrcode').dataset.qrcodeUrl,
        width: 80,
        height: 80,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L,
        useSVG: true
      });
    }
  }


  if (page.url == '/archive.html') {
    document.querySelector('.page-search-input').addEventListener('keyup', function (e) {
      var archive = document.getElementsByClassName('archive-item-link');
      for (var i = 0; i < archive.length; i++) {
        if (archive[i].title.toLowerCase().indexOf(this.value.toLowerCase()) > -1) {
          archive[i].closest('li').style.display = 'block';
        } else {
          archive[i].closest('li').style.display = 'none';
        }
      }
      if (e.keyCode == 13) {
        location.href = '/search.html?keyword=' + this.value;
      }
    })
  }

  if (page.url == '/search.html') {
    var keyword = getQuery('keyword');
    var searchData;
    var input = document.querySelector('.search-input');
    var result = document.querySelector('.search-result');
    var xhrSearch = new XMLHttpRequest();
    xhrSearch.open('GET', '/search.json', true);
    xhrSearch.onreadystatechange = function () {
      if (xhrSearch.readyState == 4 && xhrSearch.status == 200) {
        searchData = JSON.parse(xhrSearch.responseText);
        if (keyword) {
          input.value = decodeURI(keyword);
          search(decodeURI(keyword));
        }
        input.placeholder = "请输入关键词，回车搜索";
      }
    }
    xhrSearch.send(null);

    document.querySelector('.search-input').addEventListener('keyup', function (e) {
      if (e.keyCode == 13) {
        search(decodeURI(this.value));
      }
    })

    function search(keyword) {
      result.innerHTML = '';
      var title = '搜索：' + keyword + ' | ' + site.title;
      var url = '/search.html?keyword=' + keyword;
      var total = result.length;
      var html = '';
      searchData.forEach(function (item) {
        var postContent = item.title + item.tags.join('') + item.content;
        if (postContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          var index = item.content.toLowerCase().indexOf(keyword.toLowerCase());
          var realKeyword = item.content.substr(index, keyword.length);
          var first = index > 75 ? index - 75 : 0;
          var last = first + 150;
          html += '<div class="search-result-item">' +
            '      <i class="search-result-thumb" data-src="' + item.thumb + '" style="background-image:url(' + item.thumb + ')"></i>' +
            '      <div class="search-result-content">' +
            '        <div class="search-result-header">' +
            '           <div class="search-result-title"><a class="search-result-link" target="_blank" href="' + item.url + '">' + item.title + '</a></div>' +
            '           <div class="search-result-comment"></div>' +
            '        </div>' +
            '        <div class="search-result-desc">' + item.content.slice(first, last).replace(new RegExp(realKeyword, 'g'), '<span class="search-result-highlight">' + realKeyword + '</span>') + '</div>' +
            '      </div>' +
            '    </div>';
        }
      })
      result.innerHTML = html;
      document.title = title;
      history.replaceState({
        "title": title,
        "url": url
      }, title, url);
      if (site.home === location.origin && window.parent == window) {
        _hmt.push(['_trackPageview', url]);
      }
    }

  }


  if (page.url == '/tags.html') {
    var keyword = getQuery('keyword');
    var tagsData;
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', '/posts.json', true);
    xhrPosts.onreadystatechange = function () {
      if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
        tagsData = JSON.parse(xhrPosts.responseText);
        if (keyword) {
          tags(decodeURI(keyword));
        }
      }
    }
    xhrPosts.send(null);
    function tags(keyword) {
      var title = '标签：' + keyword + ' | ' + site.title;
      var url = '/tags.html?keyword=' + keyword;
      var tagsTable = document.getElementById('tags-table');
      tagsTable.style.display = 'table';
      tagsTable.querySelector('thead tr').innerHTML = '<th colspan=2>以下是标签含有“' + keyword + '”的所有文章</th>';
      var html = '';
      tagsData.forEach(function (item) {
        if (item.tags.indexOf(keyword) > -1) {
          var date = item.date.slice(0, 10).split('-');
          date = date[0] + ' 年 ' + date[1] + ' 月 ' + date[2] + ' 日';
          html += '<tr><td><time>' + date + '</time></td><td><a href="' + item.url + '" title="' + item.title + '">' + item.title + '</a></td></tr>';
        }
      })
      tagsTable.getElementsByTagName('tbody')[0].innerHTML = html;
      document.title = title;
      history.replaceState({
        "title": title,
        "url": url
      }, title, url);
      if (site.home === location.origin && window.parent == window) {
        _hmt.push(['_trackPageview', url]);
      }
    }
    var tagLinks = document.getElementsByClassName('post-tags-item');
    var tagCount = tagLinks.length;
    for (var i = 0; i < tagCount; i++) {
      tagLinks[i].addEventListener('click', function (e) {
        tags(e.currentTarget.title);
        e.preventDefault();
      }, false);
    }
  }

  var appendZero = function (num) {
    if (!num) {
      return '00'
    }

    if (num < 10) {
      return '0' + num
    }

    return num
  }

  // 跑步
  if (page.url == '/running.html') {
    var runningTable = document.querySelector('.running-table-container');
    var xhrBest = new XMLHttpRequest();
    xhrBest.open('GET', site.api + '/nike/best.php', true);
    xhrBest.onreadystatechange = function () {
      if (xhrBest.readyState == 4 && xhrBest.status == 200) {
        var records = JSON.parse(xhrBest.responseText).records;
        var theadHtml = '', tbodyHtml = '';
        for (var i = 0; i < records.length; i++) {
          var record = records[i];
          switch (record.type_id) {
            case 'fastest.run.continuous.5k':
              theadHtml += '<th>5 公里</th>';
              break;
            case 'fastest.run.continuous.10k':
              theadHtml += '<th>10 公里</th>';
              break;
            case 'fastest.run.continuous.half_marathon':
              theadHtml += '<th>半马</th>';
              break;
            case 'fastest.run.continuous.marathon':
              theadHtml += '<th>全马</th>';
              break;
            case 'longest.run.distance.activity':
              theadHtml += '<th>最远记录</th>';
              break;
            case 'longest.run.duration.activity':
              theadHtml += '<th>最久记录</th>';
              break;

          }
          if (record.type_id.indexOf('distance') > -1) {
            var distance = (record.value / 1000).toFixed(2);
            tbodyHtml += '<td>' + distance + ' 公里</td>';
          }
          if (/5k|10k|marathon|duration/.test(record.type_id)) {
            var duration = record.value;
            var totalMinute = parseInt(duration / 60)
            var durationSecond = parseInt(duration % 60)
            var durationMinute = parseInt(totalMinute % 60)
            var durationHour = parseInt(totalMinute / 60)
            tbodyHtml += '<td>' + appendZero(durationHour) + ':' + appendZero(durationMinute) + ':' + appendZero(durationSecond) + '</td>';
          }
        }
        theadHtml = '<thead><tr>' + theadHtml + '</tr></thead>';
        tbodyHtml = '<tbody><tr>' + tbodyHtml + '</tr></tbody>';
        runningTable.innerHTML = '<table>' + theadHtml + tbodyHtml + '</table>';

      }
    }
    xhrBest.send()

    var start_time = new Date(), queryStr = '';
    var posts = [];
    var runningList = document.querySelector('.running-list');
    var loadMoreBtn = document.querySelector('.running-loadmore-link');
    var loadMore = function () {
      loadMoreBtn.style.display = 'none';
      var postsHtml = '';
      var xhrPosts = new XMLHttpRequest();
      xhrPosts.open('GET', site.api + '/nike/posts.php' + queryStr, true);
      xhrPosts.onreadystatechange = function () {
        if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
          posts = JSON.parse(xhrPosts.responseText);
          posts.forEach(function (item) {
            start_time = new Date(item.published);
            postsHtml += '<div class="running-item">' +
              '<a class="running-item-thumb" href="' + item.tags.image.url + '" target="_blank"><img class="running-item-image" src="' + item.tags.image.thumb + '"></a>' +
              '<div class="running-item-intro">' +
              '<p>' + start_time.Format('yyyy-MM-dd hh:mm') + '</p>' +
              '<p><a href="/running-map.html?id=' + item.object.id + '" target="_blank" title="跑步路径详情"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M552.279379 912.204821c-13.853519-0.723477-27.333532-1.896186-40.054251-3.480264-11.007705-1.622964-20.9788 6.393617-22.338774 17.381879-1.369184 10.988262 6.423293 20.979824 17.391089 22.349007 13.659091 1.700735 28.088732 2.971681 42.888809 3.75451 0.36225 0.019443 0.714268 0.019443 1.075495 0.019443 10.56973 0 19.407002-8.290827 19.973914-18.965957C571.803038 922.196383 563.328016 912.771733 552.279379 912.204821zM435.441347 891.459335c-12.717649-4.555759-24.292266-9.893324-34.391275-15.818267-9.54233-5.650697-21.811772-2.385327-27.40414 7.117095-5.602601 9.54233-2.40477 21.820981 7.128351 27.41335 12.239765 7.175423 26.083052 13.549597 41.138956 18.9854 2.238994 0.781806 4.514827 1.153266 6.765077 1.153266 8.211009 0 15.905248-5.064342 18.848277-13.256932C451.260637 906.671805 445.854511 895.173936 435.441347 891.459335zM949.942307 313.422316c-5.083785-9.854439-17.166985-13.70514-26.963095-8.641821 0 0-6.843872 3.539616-18.222013 10.011005-9.600659 5.473665-12.964266 17.695011-7.488555 27.316136 3.694135 6.471388 10.460236 10.088776 17.420765 10.088776 3.361561 0 6.765077-0.841158 9.893324-2.620687 10.285251-5.846148 16.542768-9.092076 16.738219-9.190313C951.135482 335.322092 955.007673 323.256288 949.942307 313.422316zM716.209962 511.901763c3.207042 1.877767 6.707772 2.777253 10.16757 2.777253 6.843872 0 13.531178-3.499707 17.265222-9.81453 5.964852-10.128685 13.491269-20.590967 22.328541-31.148417 7.118118-8.466835 6.004761-21.097504-2.463098-28.214599-8.485255-7.118118-21.116947-5.982248-28.195156 2.482541-10.264784 12.221346-19.065218 24.51944-26.160823 36.506449C703.539384 494.012324 706.687074 506.271532 716.209962 511.901763zM351.513866 812.818253c-0.167822-10.910491-9.073656-19.72832-20.022009-19.72832-11.057847 0-20.022009 8.974395-20.022009 20.041452 0 1.896186 0.261966 12.0832 5.542226 26.357298 2.991124 8.095375 10.645454 13.080923 18.780739 13.080923 2.306532 0 4.663206-0.410346 6.951319-1.270946 10.371208-3.832282 15.661701-15.329127 11.82942-25.731034C351.863836 818.292941 351.531262 813.287951 351.513866 812.818253zM332.116073 192.214766c-77.409021 0-140.154064 62.724577-140.154064 140.116201 0 77.388555 62.745043 140.133597 140.154064 140.133597 77.409021 0 140.154064-62.745043 140.154064-140.133597C472.270137 254.939343 409.525094 192.214766 332.116073 192.214766zM332.116073 432.165744c-55.285141 0-100.110045-44.853557-100.110045-100.168374 0-55.314817 44.824905-100.169397 100.110045-100.169397 55.29435 0 100.110045 44.855604 100.110045 100.169397C432.226119 387.31321 387.410424 432.165744 332.116073 432.165744zM834.777381 760.064772c-10.831696 2.248204-17.793248 12.845563-15.545044 23.678282 1.349741 6.472412 2.034333 12.827143 2.034333 18.868743 0 4.927219-0.470721 9.854439-1.369184 14.566764-2.112104 10.871605 4.985548 21.37175 15.857153 23.443945 1.270946 0.273223 2.561335 0.37146 3.811816 0.37146 9.406231 0 17.793248-6.627954 19.631106-16.20917 1.407046-7.234775 2.112104-14.665001 2.112104-22.172999 0-8.759501-0.958838-17.851577-2.855024-27.001981C856.186993 764.757654 845.511863 757.874897 834.777381 760.064772zM781.535783 870.850971c-9.42465 6.53074-20.490683 12.435217-32.868595 17.519002-10.226922 4.223185-15.09479 15.915481-10.892071 26.161846 3.187599 7.722892 10.657734 12.396331 18.516726 12.396331 2.542916 0 5.14416-0.48914 7.626701-1.505283 15.036461-6.198166 28.64541-13.510712 40.416502-21.644973 9.092076-6.335289 11.358699-18.809391 5.063319-27.882024C803.100938 866.823238 790.586926 864.554568 781.535783 870.850971zM736.211505 603.369987c-5.728468-10.245342-9.228175-20.88261-10.381441-31.655977-1.173732-10.988262-10.813277-18.927071-22.035876-17.754363-11.007705 1.172709-18.96698 11.028171-17.773805 22.035876 1.739621 16.170285 6.863315 31.969109 15.270798 46.946218 3.656273 6.550183 10.459213 10.245342 17.479093 10.245342 3.305279 0 6.667863-0.821715 9.757225-2.561335C738.187509 625.229854 741.627864 613.028974 736.211505 603.369987zM831.922357 361.444029c-11.164271 8.016581-22.680559 16.736173-34.099632 26.024723-8.565073 6.999414-9.854439 19.611663-2.87549 28.17469 3.970428 4.868891 9.718339 7.371898 15.545044 7.371898 4.439102 0 8.916067-1.467421 12.629645-4.497431 10.753925-8.759501 21.606087-16.993023 32.145118-24.538883 8.973372-6.433526 11.048637-18.946514 4.594645-27.922956C853.430206 357.063255 840.936661 355.011526 831.922357 361.444029zM817.96139 693.546799c-8.464789-11.105942-18.24248-22.25077-29.05371-33.219589-7.744381-7.879458-20.413935-7.958252-28.312836-0.214894-7.880481 7.742335-7.958252 20.451798-0.196475 28.331255 9.620102 9.757225 18.301831 19.689435 25.76992 29.427216 3.950985 5.161556 9.894348 7.860015 15.917528 7.860015 4.242627 0 8.523117-1.348718 12.141528-4.125971C823.026756 714.859197 824.688605 702.3063 817.96139 693.546799zM673.056116 907.883399c-12.748349 1.818415-26.160823 3.167133-39.887452 4.047176-11.036357 0.723477-19.404955 10.245342-18.692734 21.292955 0.684592 10.597359 9.494235 18.73162 19.963681 18.73162 0.430812 0 0.870834-0.038886 1.309832-0.038886 14.743796-0.977257 29.191856-2.424212 42.938951-4.379751 10.948353-1.564635 18.554588-11.692297 17.010419-22.641673C694.1352 913.944442 684.025958 906.240993 673.056116 907.883399zM332.116073 71.770604c-143.752008 0-260.286118 117.354801-260.286118 262.10351 0 212.967416 260.286118 418.643776 260.286118 418.643776s260.286118-205.675336 260.286118-418.643776C592.402191 189.125405 475.868081 71.770604 332.116073 71.770604zM332.076164 699.882088c-23.824615-21.25407-61.619406-57.230446-99.347682-102.475929-55.138808-66.107627-120.854509-165.494195-120.854509-263.532045 0-122.418121 98.800213-222.059492 220.2421-222.059492 121.440863 0 220.2421 99.641371 220.2421 222.059492C552.358173 487.871463 394.352533 644.234697 332.076164 699.882088z"></path></svg></a>' + item.tags.text + '</p>' +
              '</div>' +
              '</div>';
          })

          runningList.insertAdjacentHTML('beforeend', postsHtml);
          if (posts.length < 12) {
            loadMoreBtn.innerHTML = '没有更多啦';
            loadMoreBtn.style.display = 'inline';
            loadMoreBtn.style.pointerEvents = 'none';
          } else {
            loadMoreBtn.style.display = 'inline';
          }

          start_time.setTime(start_time.getTime() - 1);
          queryStr = '?start_time=' + start_time.toISOString();
        }
      }
      xhrPosts.send(null);
    }
    loadMoreBtn.addEventListener('click', loadMore, false);
    loadMore();
  }

  if (page.url == '/tech.html' || page.url == '/life.html' || page.url == '/album.html') {
    var pageNum = !!getQuery('page') ? parseInt(getQuery('page')) : 1;
    var postData, posts = [];
    var xhrPosts = new XMLHttpRequest();
    var category = page.url.slice(1, -5);
    xhrPosts.open('GET', '/posts.json', true);
    xhrPosts.onreadystatechange = function () {
      if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
        postData = JSON.parse(xhrPosts.responseText);
        postData.forEach(function (item) {
          if (item.category == category) {
            posts.push(item);
          }
        })
        turn(pageNum);
      }
    }
    xhrPosts.send(null);

    function turn(pageNum) {
      var cat = '';
      var postClass = '';
      var pageSize = 10;
      switch (page.url) {
        case '/tech.html':
          cat = '技术';
          postClass = 'post-tech';
          break;
        case '/life.html':
          cat = '生活';
          pageSize = 12;
          postClass = 'post-life';
          break;
        case '/album.html':
          cat = '相册';
          postClass = 'post-album';
          break;
      }
      var title = pageNum == 1 ? cat + ' | ' + site.title : cat + '：第' + pageNum + '页 | ' + site.title;
      var url = pageNum == 1 ? page.url : page.url + '?page=' + pageNum;
      var html = '';
      var total = posts.length;
      var first = (pageNum - 1) * pageSize;
      var last = total > pageNum * pageSize ? pageNum * pageSize : total;
      if (page.url == '/life.html') {
        for (var i = first; i < last; i++) {
          var item = posts[i];
          html += '<article class="post-item">' +
            '    <i class="post-item-thumb" data-src="' + item.image + '" style="background-image:url(' + (item.image.indexOf('svg') > -1 ? item.image : item.image + '?imageView2/1/w/400/h/266') + ')"></i>' +
            '    <section class="post-item-summary">' +
            '    <h3 class="post-item-title"><a class="post-item-link" href="' + item.url + '" title="' + item.title + '">' + item.title + (item.images > 30 && item.category == 'life' ? '[' + item.images + 'P]' : '') + '</a></h3>' +
            '    </section>' +
            '    <section class="post-item-footer"><time class="post-item-date timeago" datetime="' + item.date + '"></time><a class="post-item-cmt" title="查看评论" href="' + item.url + '#comment"><span data-disqus-url="' + item.url + '"></span><span>条评论</span></a></section>' +
            '</article>';
        }
      } else {
        for (var i = first; i < last; i++) {
          var item = posts[i];
          html += '<article class="post-item">' +
            '    <i class="post-item-thumb" data-src="' + item.thumb + '" style="background-image:url(' + item.thumb + ')"></i>' +
            '    <section class="post-item-summary">' +
            '    <h3 class="post-item-title"><a class="post-item-link" href="' + item.url + '" title="' + item.title + '">' + item.title + (item.images > 30 && item.category == 'life' ? '[' + item.images + 'P]' : '') + '</a></h3>' +
            '    <time class="post-item-date timeago" datetime="' + item.date + '"></time>' +
            '    </section>' +
            '    <a class="post-item-comment" title="查看评论" data-disqus-url="' + item.url + '" href="' + item.url + '#comment"></a>' +
            '</article>';
        }
      }

      var totalPage = Math.ceil(total / pageSize);
      var prev = pageNum > 1 ? pageNum - 1 : 0;
      var next = pageNum < totalPage ? pageNum + 1 : 0;
      var prevLink = !!prev ? '<a class="pagination-item-link" href="' + page.url + '?page=' + prev + '" data-page="' + prev + '">较新文章 &raquo;</a>' : '';
      var nextLink = !!next ? '<a class="pagination-item-link" href="' + page.url + '?page=' + next + '" data-page="' + next + '">&laquo; 较旧文章</a>' : '';
      var pagination = '<ul class="pagination-list">' +
        '<li class="pagination-item">' + nextLink + '</li>' +
        '<li class="pagination-item">' + pageNum + ' / ' + totalPage + '</li>' +
        '<li class="pagination-item">' + prevLink + '</li>' +
        '</ul>';

      document.querySelector('.post-list').classList.add(postClass);
      document.querySelector('.post-list').innerHTML = html;
      document.querySelector('.pagination').innerHTML = pagination;
      timeAgo();
      disq.count();
      var link = document.getElementsByClassName('pagination-item-link');
      for (var i = 0; i < link.length; i++) {
        link[i].addEventListener('click', function (e) {
          var pageNum = parseInt(e.currentTarget.dataset.page);
          turn(pageNum);
          e.preventDefault();
        })
      }
      document.title = title;
      history.replaceState({
        "title": title,
        "url": url
      }, title, url);
      if (site.home === location.origin && window.parent == window) {
        _hmt.push(['_trackPageview', url]);
      }
    }
  }
})

var loadWebfont = function () {
  var html = document.documentElement;
  var script = document.getElementsByTagName('script')[0];

  var tkConfig = {
    kitId: 'rir3gzo',
    timeout: 3000,
    async: true,
    loading: function () {
      console.log(1);
    },
    active: function () {
      console.log(2);
    },
    inactive: function () {
      console.log(3);
    }
  };

  var tkTimer = setTimeout(function () {
    html.classList.remove('wf-loading');
    html.classList.add('wf-inactive');
  }, tkConfig.timeout);

  var tkScript = document.createElement('script');
  var tkState, tkFlag = false;

  html.classList.add('wf-loading');

  tkScript.src = 'https://use.typekit.net/' + tkConfig.kitId + '.js';
  tkScript.async = true;
  tkScript.onload = tkScript.onreadystatechange = function () {
    tkState = this.readyState;
    if (tkFlag || tkState && tkState != 'complete' && tkState != 'loaded') {
      return;
    }
    tkFlag = true;
    clearTimeout(tkTimer);
    try {

      Typekit.load(tkConfig)

    } catch (e) {

    }
  };
  script.parentNode.insertBefore(tkScript, script)
}

// 统计
if (site.home === location.origin && window.parent == window) {
  setTimeout(function () {

    var s = document.getElementsByTagName("script")[0];
    var hm = document.createElement('script');
    hm.src = '//hm.baidu.com/hm.js?' + site.tongji;
    s.parentNode.insertBefore(hm, s);
    var bp = document.createElement('script');
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    s.parentNode.insertBefore(bp, s);

    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
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
  }, 1000);
}
