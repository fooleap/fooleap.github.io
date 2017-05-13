---
layout: post
title: "使用 Jekyll 代替 WordPress"
description: "Jekyll 是针对博客平台的静态网站生成器，目前你所看到的博客正是使用这个轻巧的工具生成的。"
category: tech
thumb: IMG_PATH/jekyll.svg
tags: [WordPress, Jekyll, Git, Markdown]
---

Jekyll 是针对博客平台的静态网站生成器，目前你所看到的博客正是使用这个轻巧的工具生成的。

小博建立之初是使用世界上最流行的博客系统 WordPress 作为平台在浩瀚的互联网上保留这一亩三分地，WordPress 搭建使用简单，经过插件扩展更是无所不能，自身的 SEO 足够，优化方便，但用久了，还是会发现 WordPress 作为个人博客，也有一些不可忽视的缺点

* 略显臃肿
* 需要数据库的支持
* HTML 语法
* 在线编辑

这些缺点导致的烦恼

* 占用空间大，流量多
* 动态，读取网页慢
* 写博不方便
* 容易丢失数据

针对这些问题，也有了解决的方法

* 使用简洁主题，如我的 <del>[老博客](http://old.fooleap.org/)</del>
* 伪静态插件及评论托管平台，如 [WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/), [友言](http://www.uyan.cc/)
* Markdown 语法插件，如 [WP-Markdown](http://wordpress.org/extend/plugins/wp-markdown/)
* 使用离线写博工具，如 [Zoundry Raven](http://www.zoundryraven.com)

所谓治标不治本，这一堆插件，工具，先不提学习成本，使用不是更不方便了么？到底有没有一个可以一次性解决所有烦恼的博客平台呢？答案远在天边，近在眼前。

![Jekyll]({{site.IMG_PATH}}/replace-wordpress-with-jekyll.png)
Jekyll（来自官网）

[Jekyll](http://jekyllrb.com/) 是 GitHub 创始人之一 [Tom Preston-Werner](http://tom.preston-werner.com/) 使用 Ruby 写成，GitHub Pages 上自带 Jekyll，因此更新博客只需推送源文件到 GitHub 即可，服务器端会自动生成 HTML，也可部署到自己的 VPS 上实现一样的功能。

Jekyll 原生解决了上文一系列问题

* 最轻巧的博客系统之一，模板自制
* 生成静态页面，都说静态网站速度快
* [Markdown](http://en.wikipedia.org/wiki/Markdown) 或 [Textile](http://en.wikipedia.org/wiki/Textile_\(markup_language\)) 语法，轻量标记语言，语法简洁，排版方便，阅读轻松
* 本地编辑，Git 更新，不必担心数据丢失，可以选择自己喜欢的文本编辑器，如 Vim

除去这些，Jekyll 还有哪些优势呢

* 通过 Pygments 对代码高亮有较好的支持，标记简单
* 大量优秀程序员在使用，包括作者自己，可以显示优越性，符合装逼心理
* 既然是静态的，可以使用 Git 作为版本控制更新博客，操作方便，平时管理，服务器端可以无视
* 可以使用 GitHub 作为托管平台，发布到 GitHub Pages，不过目前被某建筑物肆虐，可尝试国内的 [GitCafe](https://gitcafe.com/) Pages，目前暂不支持绑定域名

有了优点，缺点也就原形毕露

* SEO 没有 WordPress 来得那么好做，不过个人博客对这方面无需要求
* 动态部分，比如评论支持，需要外援，近年来兴起的社会化评论系统正好弥补了这个不足
* 模板，除非是前端工程师，普通人自制漂亮的模板谈何容易，不过这点不用担心，和 WordPress 一样有现成的，只是少点
* Markdown, Git, 版本控制对于屏幕前的你来说可能都是新名词，学习的成本不低，想玩自定义，或许还需要熟悉 Liquid, 懂点 Ruby

喜欢这种本地使用 Markdown 语法写博的方式，可以让自己专注于写作，更是深深地爱上使用 Git 推送到 GitHub 发布更新博客的便利操作。

或许您会留意到，小博很久之前就已经换成 Jekyll 了，为啥现在才来写关于它的文章呢？因为网上介绍它的文章实在太多，下面摘取一些供大家参考

* [Jekyll 世界](http://yihui.name/cn/2012/02/hello-jekyll/)
* [迁移博客系统到 Jekyll](http://qixinglu.com/post/migrate_blog_system_to_jekyll.html)
* [Blogging Like a Hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html)
* [理想的写作环境：git+github+markdown+jekyll](http://www.yangzhiping.com/tech/writing-space.html)

最后还是要大赞一下 Jekyll，下面套用一句广告词：
自从用了 Jekyll，腰不酸了，腿也不疼了，一口气写上一千字，嘿！不费劲～

如果您有兴趣，可戳 [如何搭建 Jekyll 写作环境](http://blog.fooleap.org/how-to-install-jekyll.html)

**本文历史**

* 2013 年 01 月 19 日 完成初稿
* 2015 年 02 月 24 日 换图床
