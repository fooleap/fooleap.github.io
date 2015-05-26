---
layout: post
title: "Firefox 的查看源代码功能"
date: 2015-05-27 16:00:00 +0800
category: tech
published: false
tags: [Firefox, view-source, 源代码, 新标签页]
---

在[小熊猫 Firefox](firefox.html){:title="小熊猫 Firefox"} 中，我提到了 Firefox 查看源代码功能。

在 Firefox 中，查看页面最简单的办法就是右键点击“查看页面源代码（View Page Source）”，你还可以使用快捷键 ```Ctrl```+```u``` 以快速查看。

##Firefox 查看源码特色功能

相比较其他浏览器，Firefox 查看源码功能有过而无不及，特色功能主要有以下两个。

1、查看页面源代码时，Firefox 会在 HTML 语法错误的地方以显眼的红色标记。

![源代码红色标记错误]({{site.IMG_PATH}}/view-source-in-firefox-01.png)
▲源代码红色标记错误

2、选中网页的部分元素，右键可查看选中部分的源代码（View Selection Source）。

![右键查看选中部分源代码]({{site.IMG_PATH}}/view-source-in-firefox-02.png)
▲右键查看选中部分源代码

在此需要提醒的是，查看选中部分源码时，显示的是浏览器解析页面完毕后的代码，包括通过 JavaScript 进行加载的一些元素，也就是说和查看元素（```Shift```+```Ctrl```+```i```）显示的代码是一样的。

##如何让 Firefox 在新标签页中查看源码

Chrome 等浏览器查看源代码是在新的标签页中显示的（如图），而 Firefox 则弹出一个窗口，这个窗口甚至可以替换成第三方编辑器，然而这种体验鄙人感觉不如 Chrome，不过强大的 Firefox 肯定也是能实现一样的功能。

![Chrome新标签页显示源代码]({{site.IMG_PATH}}/view-source-in-firefox-03.png)
▲Chrome新标签页显示源代码

**本文历史**

* 2015年05月27日 完成初稿
