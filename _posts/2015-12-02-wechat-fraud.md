---
layout: post
title: 天上不会掉馅饼之微信诈骗
description: "微信的免费领取陷阱。"
thumb: IMG_PATH/wechat.svg
date: 2015-12-02 15:43:00 +0800
category: life
tags: [微信, 诈骗, 借贷宝]
---

今天，刷朋友圈时，看到某好友转发的一条信息。

![转发的虚假]({{ site.IMG_PATH }}/wechat-fraud-01.png?imageView2/2/w/360)
转发的虚假信息

点开之后是这样的，一篇感人肺腑的长文。

![转发的虚假]({{ site.IMG_PATH }}/wechat-fraud-01.jpg?imageView2/2/w/360)
转发的虚假信息

看老大爷那么不容易，算了，帮他们吃掉几斤橙子（其实是贪小便宜）。识别二维码，关注了他们的公众号，对了也就是中了他们的圈套。

![被骗的过程]({{ site.IMG_PATH }}/wechat-fraud-02.png?imageView2/2/w/360)
被骗的过程

到后面，点开最后的那个链接。

![骗注册的标题]({{ site.IMG_PATH }}/wechat-fraud-03.png?imageView2/2/w/360)
骗注册的标题

看到这标题，我靠，被骗了。果然，内容是让填写他们的邀请码注册借贷宝，这样他们就能领取佣金。之前的那一系列东西都是为了这个做铺垫的，一举多得，奸诈。大环境下的隐私并不值钱，但我也只好安慰自己还好上面的联系方式没用实名。

![骗注册的内容]({{ site.IMG_PATH }}/wechat-fraud-04.png?imageView2/2/w/360)
骗注册的内容

说说借贷宝，前几天刚好听一个室友说过这玩意，借贷宝营销方式有点像传销，邀请注册不单单邀请人有佣金，其上线也有佣金可领，具体如何操作我也不大清楚，反正就是有利可图还不薄，貌似邀请一个能有几十块钱入账。

回过头来再来看那条感人肺腑虚假信息，里面的真实性是不是有可疑的地方。

![虚假信息]({{ site.IMG_PATH }}/wechat-fraud-05.png?imageView2/2/w/360)
虚假信息

反搜图片并没返回结果。本着自己喜欢地理，对地理信息相对敏感，且看一些地理方面的。看那块石碑“洪江市”，洪江确实是湖南怀化的，那边也确实盛产冰糖橙，然而，洪江并没有“松岩乡”[[1]][1]。

![赣B的车]({{ site.IMG_PATH }}/wechat-fraud-02.jpg?imageView2/2/w/360)
赣B的车

赣B？不是江西赣州的车牌号么？怎么会出现在湘西？哦，对了，赣南也盛产冰糖橙……你懂的。

最后的二维码，扫描结果是 `http://dwz.cn/2g81s6` 打开链接会进行两次跳转，首先跳转到 `http://yyz8.cc/bttz.html?bttz` 再跳转到某公众号的文章，且看第一次跳转域名的网站首页 `http://yyz8.cc/`，诈骗行径很清晰了吧……

![yyz8.cc 对应页面]({{ site.IMG_PATH }}/wechat-fraud-06.png?imageView2/2/w/360)
yyz8.cc 对应页面

其对话中也都用了类似的两次跳转的短链接，作用在于公众号被封的时候，骗子依然可以在自己架的网站设置跳转到另一个新的公众号，就这短短的时间内，我已经见这骗子的 N 个不同的公众号了。

{% include media.html type="video" src="IMG_PATH/wechat-fraud-01.mp4" poster="IMG_PATH/wechat-fraud-01.mp4?vframe/jpg/offset/0" %}

天上不会掉馅饼，非可信商家搞的活动一般都不靠谱，切勿贪小失大……整个过程我好像也没损失什么，就是感觉不爽！

## 参考资料

[1]:http://www.hjs.gov.cn/info/iList.jsp?cat_id=10249 "洪江市人民政府-洪江概况"

**本文历史**

* 2015 年 12 月 02 日 完成初稿
