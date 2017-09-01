---
layout: post
title: 纯 CSS 实现导航图标动画
date: 2017-09-01 19:43:14+0800
category: tech
tags: [CSS, CSS3]
---
毫无艺术细胞的我，一直以来都只会切图而不会做图。正如前几天，我给博客导航菜单加上简单的动画，就显得违和感十足。感叹 2017 的现在，做网站普遍已经不用过多的考虑 IE 系列浏览器，一些简单的动画可以完全采用 CSS3 实现。

今天，我在 Dribbble 上看到个导航图标过渡动画[[1]][1]，如下：

![导航图标动画][p1]

感觉挺好玩的，就尝试使用 CSS 实现。最终还没完全实现，下面将过程列出来。

## CSS 实现图标

图标看起来很简单，就采用一个标签实现即可。初始化是三道横，本体、`:before`和`:after` 一个一道。

```html
<i class="icon icon-menu"></i>
```

```css
/* 为了方便查看，居中一下 */
html, body{
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #272e31;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon-menu,
.icon-menu:before,
.icon-menu:after{
    box-sizing: border-box;
    width: 72px;
    height: 8px;
    background-color: #1ca1e3;
    display: block;
}
.icon-menu{
    position: relative;
}
.icon-menu:before,
.icon-menu:after{
    position: absolute;
    right: 0;
    content: "";
}
.icon-menu:before{
    top: -24px;
}
.icon-menu:after{
    bottom: -24px;
}
```

变换后的图形，即箭头，看图箭头应该是在左边的。考虑到要加动画，所以它原本应该是在右边。将整个图形逆时针旋转 180 度，并把 `:before`、`:after` 两个伪元素调整下大小、位置，相应做 45 度旋转，下面的属性覆盖上去即变成一个箭头。

```css
.icon-menu{
    transform: rotate(-180deg);
}
.icon-menu:before,
.icon-menu:after{
    width: 45px;
    right: -10px;
}
.icon-menu:before{
    top: -13px;
    transform: rotate(45deg);
}
.icon-menu:after{
    bottom: -13px;
    transform: rotate(-45deg);
}
```

## CSS 实现动画

CSS 动画最常用的莫过于 `transition` 属性，考虑到导航一般采用点击来弹出菜单，这里采用 checkbox + label 组合做为开关，HTML + CSS 如下。

```html
<input class="nav-checkbox" id="toggle" type="checkbox">
<label class="nav-label" for="toggle">
    <i class="icon icon-menu"></i>
</label>
```

```css
html,
body{
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #272e31;
    display: flex;
    justify-content: center;
    align-items: center;
}
.nav-checkbox{
    display: none;
}
.nav-label{
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon-menu,
.icon-menu:before,
.icon-menu:after{
    box-sizing: border-box;
    width: 72px;
    height: 8px;
    background-color: #1ca1e3;
    display: block;
    transition: all 1s;
}
.icon-menu{
    position: relative;
}
.icon-menu:before,
.icon-menu:after{
    position: absolute;
    right: 0;
    content: "";
}
.icon-menu:before{
    top: -24px;
}
.icon-menu:after{
    bottom: -24px;
}
#toggle:checked ~ [for="toggle"] .icon-menu{
    transform: rotate(-180deg);
}
#toggle:checked ~ [for="toggle"] .icon-menu:before,
#toggle:checked ~ [for="toggle"] .icon-menu:after{
    width: 45px;
    right: -10px;
}
#toggle:checked ~ [for="toggle"] .icon-menu:before{
    top: -13px;
    transform: rotate(45deg);
}
#toggle:checked ~ [for="toggle"] .icon-menu:after{
    bottom: -13px;
    transform: rotate(-45deg);
}
```

看起来像模像样的，实际上还差很多。区别最明显的是，原图的返回动画并不是原路返回（也即顺时针旋转），而是继续逆时针旋转。

在这里换一种实现动画的思路，将开关改成两个动画，采用 CSS Animations 来实现，CSS 修改为：

```css
html,
body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #272e31;
    display: flex;
    justify-content: center;
    align-items: center;
}
.nav-checkbox {
    display: none;
}
.nav-label {
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon-menu,
.icon-menu:before,
.icon-menu:after {
    box-sizing: border-box;
    width: 72px;
    height: 8px;
    background-color: #1ca1e3;
    display: block;
}
.icon-menu {
    position: relative;
    margin: auto 0;
    animation: off 1s ease-in-out;
}
.icon-menu:before,
.icon-menu:after {
    transition: all 1s ease-in-out;
    position: absolute;
    right: 0;
    content: "";
}
.icon-menu:before {
    top: -24px;
}
.icon-menu:after {
    bottom: -24px;
}
#toggle:checked ~ [for="toggle"] .icon-menu {
    animation: on 1s ease-in-out;
    transform: rotate(-180deg);
}
#toggle:checked ~ [for="toggle"] .icon-menu:before,
#toggle:checked ~ [for="toggle"] .icon-menu:after {
    width: 45px;
    right: -10px;
}
#toggle:checked ~ [for="toggle"] .icon-menu:before {
    top: -13px;
    transform: rotate(45deg);
}
#toggle:checked ~ [for="toggle"] .icon-menu:after {
    bottom: -13px;
    transform: rotate(-45deg);
}
@keyframes on {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(-180deg);
    }
}
@keyframes off {
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0);
    }
}
```

切换正常，但有个问题，打开页面时图标便会先转半圈。加几行 JS 很简单，非要纯 CSS 心好累。还有动画细节上的问题，先不管了，扔到 JSFiddle 上[[2]][2]。

{% include media.html type="iframe" src="//jsfiddle.net/fooleap/c6m14dwx/embedded/result,html,css/" %}

各位看客若有兴趣可以尝试实现一下。关于导航图标动画，GitHub 有个库挺全面的[[3]][3]。

## 参考资料

[1]: https://dribbble.com/shots/1726006-Nav-icon-animation "Nav icon animation by Tom Robin Karlsson - Dribbble"
[2]: https://jsfiddle.net/c6m14dwx/ "simple nav icon animation - JSFiddle"
[3]: https://github.com/jonsuh/hamburgers "jonsuh/hamburgers"

**本文历史**

* 2017 年 09 月 01 日 完成初稿

[p1]: {{ site.IMG_PATH }}/nav-icon-animation-with-pure-css.gif "导航图标动画"
