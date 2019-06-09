---
layout: post
title: 将京东移动端详情页链接转为 PC 端
date: 2019-06-09 16:46:09+0800
thumb: IMG_PATH/jd.svg
category: tech
tags: [京东]
---

有时候朋友或自己在手机上京东看到喜欢的东西，想在 PC 端浏览详情。若链接直接复制打开是手机网页，此时需要将网址修改一下以打开对应的 PC 端详情页。

将京东移动端的详情页链接改为 PC 端的，以前往往就是删掉 `m.` 即可，后来链接规则改变了，要多删掉一个 `product/`，后面长长的尾巴一般也想去掉。

例如以下移动端的商品详情页面链接：

    https://item.m.jd.com/product/2293339.html?wxa_abtest=o&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&ShareTm=XLIH1VCKJWx75hTJ8wblyJYg2bzH6oC9KDKqXEsWK%2BKXpYLlNBhKZGrNxUYc/5M1RhHZ2QhrL4qiQiDjgmqYuvB4I%2B%2BA9OiqI8%2BbL1IvQUu1T6U8AeNe%2BeD%2BrCZeEK7mWy9/T4bjUHl7NZpXmAukSUMoWny5wiRPSZmkOetFXOg=

改成 PC 端的链接，即：

    https://item.jd.com/2293339.html

有时改得多了，感觉很麻烦，懒得手动去改。

若用 JS 来实现跳转 PC 端详情，其实很简单。

```js
location.href = location.href.replace(/\.m|product\/|\?.*/g,'')
```

为什么要用 JS？那必须是可以直接拉到书签栏，点击即跳转啊！

[京东 PC 详情](javascript:location.href=location.href.replace(/\.m&#124;product\/&#124;\?.*/g,''))

**本文历史**

* 2019 年 06 月 09 日 完成初稿
