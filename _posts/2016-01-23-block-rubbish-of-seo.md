---
layout: post
title: 屏蔽 SEO 垃圾网站
description: "现在用谷歌搜索的时候，若没掌握好技巧，很容易搜出 SEO 垃圾网站。就算把握好技巧，也难免会出现那样的网站。"
date: 2016-01-23 23:30:00 +0800
thumb: IMG_PATH/google.png
category: tech
tags: [Google, 谷歌, SEO, Firefox]
---

现在用谷歌搜索的时候，若没掌握好技巧，很容易搜出 SEO 垃圾网站。就算把握好技巧，也难免会出现那样的网站。

SEO 垃圾网站特点如下，比如说关键词“清理微信存储空间”所检索到的结果其中一项。

![检索结果中的 SEO 垃圾网站]({{ site.IMG_PATH }}/block-rubbish-of-seo-01.png)
&#9650;检索结果中的 SEO 垃圾网站

很容易看到，一般其 URL 中会有搜索的关键词，点开之后是关键词扎堆的一些问答，看起来似乎抓取百度知道的。先不管是怎么做到的，总之这类网站都是垃圾，找不到你想要的答案。

![SEO 垃圾网站内容]({{ site.IMG_PATH }}/block-rubbish-of-seo-02.png)
&#9650;SEO 垃圾网站内容

相信大多数人和鄙人一样讨厌这类网站，而鄙人不止讨厌这种网站，就连脚本之家那种毫不计较版权的，似是全站都是到处抓取技术文章的网站也很厌恶，真的不想在检索结果中看到这类网站。

前段时间，在 V2EX 看到一帖子[[1]][1]，说的便是这个问题，里面有人也给出了解决问题的相关扩展。

鄙人常用 Firefox，根据 useless-websites[[2]][2] 提供的说明，简单说一下 Firefox 的扩展 Hide Unwanted Results of Google Search[[3]][3]。

安装之后，随便设置屏蔽一个网站，然后导出文件，可以看到这个扩展的配置文件格式。


    Hide Unwanted Results Data v1.0
    1,morobat.com

首行加声明，每一行域名前面加上 `1,`，大概就是这样的文件格式，回过头来将那个列表拉下来，并简单修改下再导入即可。

##参考资料

[1]: https://www.v2ex.com/t/245055 "一些网站太无耻了"
[2]: https://github.com/Feiox/useless-websites/ "Feiox/useless-websites"
[3]: https://addons.mozilla.org/zh-CN/firefox/addon/hide-unwanted-results-of-go/ "Hide Unwanted Results of Google Search"

**本文历史**

* 2016 年 01 月 23 日 完成初稿
