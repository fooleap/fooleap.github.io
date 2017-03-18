---
layout: post
title: "一夜入秋"
description: ""
date: 2017-03-17 10:30:00+0800
category: life
tags: ["潮汕", "秋天"]
---

2016-11-28 10:30:00+0800

![](){:class="autumn-coming"}
一夜入秋

<style>
.autumn-coming{
    display: inline-block;
    width: 100%;
    height: 0;
    padding-top: 66.7%;
    background-image: url('/autumn.jpg');
    background-repeat: no-repeat;
    animation: autumn-coming-x .5s steps(4, end) infinite, autumn-coming-y 2.5s steps(5, end) infinite;
}

@keyframes autumn-coming-x {
  to {
    background-position-x: -2560px;
  }
}
@keyframes autumn-coming-y {
  to {
    background-position-y: -2135px;
  }
}
</style>
