---
layout: page
permalink: /about.html
title: 关于
tags: [关于, 网志, fooleap, blog]
scripts: ['http://www.midijs.net/lib/midi.js']
style: true
---

<a class="mid" id="play-mid" href="javascript:void(0)" onClick="MIDIjs.play('http://7fv9cr.com1.z0.glb.clouddn.com/Fmmusic.mid');"><i class="icon-volume-up"></i></a><a class="mid" id="stop-mid" href="javascript:void(0)" onClick="MIDIjs.stop();"><i class="icon-stop"></i></a><a class="mid" id="mid-title" href="http://www.xiami.com/song/3556769" target="_blank">三个人的时光</a>

* 网志网址：[http://blog.fooleap.org](http://blog.fooleap.org)
* Atom 订阅：[http://blog.fooleap.org/atom.xml](/atom.xml)

这是 fooleap 的个人网志，记录点滴。截至 {% for post in site.posts | limit: 1 %}{{ post.date |  date: "%Y 年 %m 月 %d 日" }}{% endfor %} 共有文章 {{ site.posts | size }} 篇。

本网志采用 [Jekyll](http://jekyllrb.com/) 搭建，采用 [Markdown](http://daringfireball.net/projects/markdown/) 写作，托管于 [阿里云](http://www.aliyun.com) 和 [GitHub](https://github.com/fooleap/fooleap.github.io)，图片存储在[七牛](https://portal.qiniu.com/signup?code=3lmtscszx8zf4)。 

即日起，本网志的原创内容，均采用知识共享组织（Creative Commons）的“署名-非商业性使用 3.0 中国大陆”（[CC BY-NC 3.0 CN](http://creativecommons.org/licenses/by-nc/3.0/cn/)）许可。

##博主

生长于潮汕，现浪迹于杭城。

拖延症、强迫症患者，闲余喜欢喝茶、喜欢拍照、喜欢跑步、喜欢骑行。

##联系方式

* Email: fooleap(at)gmail.com
* Twitter: [@fooleap](http://twitter.com/fooleap)
* V2EX: [@fooleap](http://www.v2ex.com/member/fooleap)
* Ruby China: [@fooleap](http://ruby-china.org/fooleap)
* 豆瓣: [@fooleap](http://douban.com/people/fooleap)
* 知乎: [@fooleap](http://zhihu.com/people/fooleap)

##网志进程

* 2011-02-09 网志建立，名字为“Fooleap”
* 2011-10-28 网志网址改为二级域名 blog.fooleap.org ，主域做了重定向，网志改名为“Fooleap&#039;s Blog”
* 2012-03-18 网志从 WordPress 平台转到 Jekyll 平台，托管于 GitHub
* 2013-01-19 转移到 VPS 上
* 2014-01-10 所用的 Host700 卷铺走人，重新转移到 GitHub
* 2014-06-29 升级 Bootstrap 框架为 3.2 
* 2014-08-05 放弃 Bootstrap 框架
* 2015-05-23 增加远程 GitCafé 分支，DNSPod 设置国内访问 GitCafé，国外访问 GitHub。
* 2015-10-28 国内解析到阿里云虚拟主机

<!--<style>
    .mid{
      line-height: 26px;
      font-size: 16px;
      border: none;
      padding: 5px;
      color: #333!important;
    }
    a.mid:after{
      content: ''!important;
    }
    </style>-->
