---
layout: page
permalink: /about.html
title: 关于
tags: [关于, 博客, fooleap, blog]
---

{% comment %}
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" height="52" style="width:280px;margin:0;" src="http://music.163.com/outchain/player?type=2&id=165614&auto=0&height=32"></iframe>
好多年前，在某个网站听到这首曲子的背景音乐，听着有感觉，便将其扒了下来（[fmmusic.mid]({{ site.IMG_PATH }}/fmmusic.mid)，当年的文件，MIDI 格式的），听得多了，就感觉对自己来说有某种特殊的意义，后来才知道它的名字及由来。
{% endcomment %}

* 博客网址：[http://blog.fooleap.org](http://blog.fooleap.org)
* Atom 订阅：[http://blog.fooleap.org/atom.xml](/atom.xml)

分享技术、记录点滴，这是 fooleap 的个人博客。

请使用 Mozilla Firefox、Google Chrome 等现代浏览器浏览本博客。

本博采用 Jekyll[[1]][1] 搭建，Markdown[[2]][2] 写作，托管于七牛云存储[[3]][3]和GitHub[[4]][4]。 

自 2011 年 02 月 09 日起，本站已运行 <script>document.write(Math.floor((Date.now() / 1000 - {{ "2011-02-09" | date: "%s" }}) / (60 * 60 * 24)));</script> 天，截至 {{ "now" | date: "%Y 年 %m 月 %d 日" }}，写了博文 {{ site.posts | size }} 篇，{% assign count = 0 %}{% for post in site.posts %}{% assign single_count = post.content | strip_html | strip_newlines | remove: ' ' | size %}{% assign count = count | plus: single_count %}{% endfor %}{% if count > 10000 %}{{ count | divided_by: 10000 }} 万 {{ count | modulo: 10000 }}{% else %}{{ count }}{% endif %} 字。

即日起，本博客的原创内容，均采用知识共享组织（Creative Commons）的“署名-非商业性使用 3.0 中国大陆”（CC BY-NC 3.0 CN[[5]][5]）许可。

## 博主

潮汕人，拖延症、强迫症患者，喜欢喝茶、喜欢拍照、喜欢跑步、喜欢骑行。

* WeChat: fooleap（[微信二维码](http://blog.fooleap.org/wechat?qrcode/1)）
* Email: fooleap(at)gmail.com

## 博客进程

* 2011-02-09 博客建立，网址 fooleap.org，名字为“Fooleap”
* 2011-10-28 网址改为二级域名 blog.fooleap.org ，博客改名为“Fooleap&#039;s Blog”
* 2012-03-18 博客从 WordPress 平台转到 Jekyll 平台，托管于 GitHub
* 2013-01-19 转移到 VPS 上
* 2014-01-10 所用的 Host700 卷铺走人，重新转移到 GitHub
* 2014-06-29 升级 Bootstrap 框架为 3.2 
* 2014-08-05 放弃 Bootstrap 框架
* 2015-05-23 增加远程 GitCafé 分支，DNSPod 设置国内访问 GitCafé，国外访问 GitHub
* 2015-10-28 国内解析到阿里云虚拟主机
* 2016-07-01 国内解析到七牛云存储，后来干脆只解析到七牛
* 2016-10-05 使用 Disqus API 解决评论问题
* 2017-03-16 初步完成重写评论框 
* 2017-05-04 使用 webpack 打包前端资源

## 参考资料

[1]: http://jekyllrb.com/ "Jekyll"
[2]: http://daringfireball.net/projects/markdown/ "Markdown"
[3]: http://www.qiniu.com "七牛云存储"
[4]: https://github.com/ "GitHub"
[5]: http://creativecommons.org/licenses/by-nc/3.0/cn/ "署名-非商业性使用 3.0 中国大陆"
