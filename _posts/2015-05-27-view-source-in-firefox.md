---
layout: post
title: "Firefox 的查看源代码功能"
description: "Firefox 的查看源代码功能的总总"
date: 2015-05-27 23:24:00 +0800
category: tech
thumb: 'IMG_PATH/firefox.png'
tags: [Firefox, view-source, 源代码, 新标签页]
---

* toc
{:toc}

在[小熊猫 Firefox](firefox.html){:title="小熊猫 Firefox"} 中，我提到了 Firefox 查看源代码功能。

Firefox 查看源码最简单的办法就是右键点击“查看页面源代码（View Page Source）”，你还可以使用快捷键 `Ctrl`+`u` 以快速查看。

## 特色功能

相比较其他浏览器，Firefox 查看源码功能有过而无不及，特色功能主要有以下两个。

1、查看页面源代码时，Firefox 会在 HTML 语法错误的地方以显眼的红色标记。

![源代码红色标记错误]({{site.IMG_PATH}}/view-source-in-firefox-01.png)
▲源代码红色标记错误

2、选中网页的部分元素，右键可查看选中部分的源代码（View Selection Source）。

![右键查看选中部分源代码]({{site.IMG_PATH}}/view-source-in-firefox-02.png)
▲右键查看选中部分源代码

在此需要提醒的是，查看选中部分源码时，显示的是浏览器解析页面完毕后的代码，包括通过 JavaScript 进行加载的一些元素，也就是说和“查看元素（`Shift`+`Ctrl`+`i`）”显示的代码是一样的。

## 新标签页查看源码

<strong style="color:red">Firefox 最新版本已有变化 ，查看源码、选中源码均为新标签页打开。</strong>

Chrome 等浏览器查看源代码是在新的标签页中显示的（如图），实践发现 Firefox 也是通过 `view-source:`+`URL` 这个地址即可查看源代码。

![Chrome 新标签页显示源代码]({{site.IMG_PATH}}/view-source-in-firefox-03.png)
▲Chrome 新标签页显示源代码

可是 Firefox 默认弹出一个窗口显示，这个窗口甚至可以替换成第三方编辑器，这种体验鄙人感觉不如 Chrome，不过强大的 Firefox 肯定也是能实现一样的功能，随便一搜就有第三方扩展支持，比如 [Source Viewer Tab](https://addons.mozilla.org/en-US/firefox/addon/source-viewer-tab/)。

为实现一个简单的功能去安装一个扩展诚然有些不值，还是另寻它径吧，书签支持 JavaScript，那么可以获取当前页面的地址，采用 `window.open()` 方法即可实现新标签页打开。

{% highlight javascript %}
javascript:window.open("view-source:"+top.location);
{% endhighlight %}

若是 Chrome 这样即可，但 Firefox 还需在后面加上 `void(0)`，否则当前页面将被重定向。

{% highlight javascript %}
javascript:window.open("view-source:"+top.location);void(0);
{% endhighlight %}

或是

{% highlight javascript %}
javascript:void(window.open("view-source:"+top.location));
{% endhighlight %}

鄙人用 Pentadactyl，习惯了快捷键操作，那么如何配置 Pentadactyl 使 FF 可快捷键新标签页显示源码呢？一样可通过 JavaScript 获取当前页面网址。在 `_pentadactylrc` （非 Windows 则是 `.pentadactylrc`） 中添加如下。

{% highlight javascript %}
com! view-source exe "t view-source:" + top.content.location;
map vs :view-source<Return>
{% endhighlight %}

别问我为什么要加 `content`，Firefox 扩展们需要这么干。`:rehash` 之后，`v` `s` 便是新标签查看源码的快捷键。

另外，Pentadactyl 自身也提供一个命令 `:viewsource` 可当前页面查看源码，`:dia[log] selectionsource` 则是查看选中部分源码，不妨也给其绑定一快捷键 `s` `s`。

    map ss :dia selectionsource<Return>

## 源码页面字体？

在此，也扯一下 Firefox 查看源码页面的字体。相比其他浏览器，Firefox 源码页面更加良心，各部分都精心设计，例如元素名被加粗亮色显示。可是，同是使用新宋体，为何显示效果感觉比 Chrome 丑？

利用“查看元素”得知，样式是 `viewsource.css` 文件定义的，不过鄙人找不到这个文件。

![viewsource.css]({{site.IMG_PATH}}/view-source-in-firefox-04.png)
▲viewsource.css

事实上这个页面的字体定义继承于等宽字体，即在`选项`-`内容`-`字体和颜色`-`高级`里面设置。

![设置等宽字体]({{site.IMG_PATH}}/view-source-in-firefox-05.png)
▲设置等宽字体

如果你觉得这样改还不过瘾，可以直接跑 `about:config` 里面更改 `font.name.monospace.zh-CN` 选项（中文版本），就可以 CSS 一样的指定字体优先级（说白了就是指定中英文字体），例如 `Consolas, Microsoft Yahei`，字体大小则可更改 `font.size.fixed.zh-CN` 选项。

## 参考资料

* [View page source trick in firefox, flock : Burad's Blog](http://www.aburad.com/blog/2008/04/view-page-source-trick-in-firefox-flock.html)
* [Set Bookmarks to Open in a New Tab](http://lifehacker.com/5784781/set-bookmarks-to-open-in-a-new-tab-in-chrome)
* [javascript - document.URL vs location.href > no results - Stack Overflow](http://stackoverflow.com/questions/5164964/document-url-vs-location-href-no-results)
* [window.content - Web API 接口 \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/content)

**本文历史**

* 2015 年 05 月 27 日 完成初稿
* 2015 年 09 月 05 日 更新，新版本变化
