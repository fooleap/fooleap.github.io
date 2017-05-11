---
layout: post
title: JavaScript 实现 Vim 键绑定
description: "一旦习惯 Vim 的热键操作，网页浏览也会想用熟悉的热键操作，有人为热门浏览器开发了扩展，例如 Firefox 有个人觉得近完美的扩展解决方案 Vimperator 或 Pentadactyl，Chrome 则有不大完美的 Vichrome、Vimium 等，还有些人直接写了类 vi 的浏览器，例如 dwb，不过我想没用过 vi 的人不会去尝试这样的扩展或软件。"
date: 2015-09-20 07:10:00 +0800
thumb: 'IMG_PATH/js.svg'
category: tech
tags: [JavaScript, Vim, 'Key Bindings', 快捷键]
---

* toc
{:toc}

## Vim 热键

一旦习惯 Vim 的热键操作，网页浏览也会想用熟悉的热键操作，有人为热门浏览器开发了扩展，例如 Firefox 有个人觉得近完美的扩展解决方案 Vimperator 或 Pentadactyl，Chrome 则有不大完美的 Vichrome、Vimium 等[[1]] [1]，还有些人直接写了类 vi 的浏览器，例如 dwb[[2]] [2]，不过我想没用过 vi 的人不会去尝试这样的扩展或软件。

![dwb 界面]({{ site.IMG_PATH }}/vim-key-bindings-for-web-page-01.png?imageView2/2/w/640)
dwb 界面

那么，能不能直接使用 JavaScript，在网站中实现热键操作，让访问你网站的人都能享受，答案是可以的，知乎的快捷键就有些 vi 的感觉[[3]] [3]。

![知乎的快捷键]({{ site.IMG_PATH }}/vim-key-bindings-for-web-page-02.png)
知乎的快捷键

## 功能介绍

小博在右下角弄个回到顶部按钮，对长文而言，使用鼠标慢慢滚，拉到下面，一点就回到顶部，感觉方便的，但有时候还是感觉有些多余。键盘也可用空格或 `Home` `End` 等键，但我想说离得太远了，如若和鄙人一样使用 [Poker II](poker-2.html) 等迷你键盘更是麻烦，何不采用 Vim 的热键来操作呢？使用 `g` `g` 来返回顶部不是更方便么？所以，鄙人就想使用 JavaScript 实现这么几个简单的键绑定：

|---
|热键                |操作     
|---
|`j`                 |下滚一行 
|`k`                 |上滚一行 
|`2` `j`             |下滚 2 行
|`3` `k`             |上滚 3 行
|`g` `g`             |回到顶部 
|`G` (`Shift` + `g`) |滚到底部 

注：`2` `j` 中数字可以为任意正整数。

## 键盘事件

键盘操作自然离不开监听键盘事件，键盘事件有三个，分别是

|事件                |说明      |属性    |
|--------------------|----------|--------|
|keydown             |按下按键  |keyCode |
|keypress            |字符键按下|charCode|
|keyup               |释放按键  |keyCode |

注：其中 `keypress` 事件是按下可输入字符的键就会触发，例如 `a`、`b`、`c`，若按下 `Ctrl`、`Shift` 等则不触发。

触发事件会返回对象，其中 `keydown`、`keyup` 事件会返回 `keyCode` 属性，有些浏览器比如 Firefox 还会返回 `key` 属性，但一般还是使用兼容性比较好的 `keyCode`；`keypress` 事件则会返回 `charCode` 属性。

其中 `keyCode` 的值可以在 MDN 找到[[4]] [4]，`charCode` 则区分大小写，属性值基本等同于 ASCII 码[[5]] [5]。

JavaScript Event KeyCodes[[6]] [6]这个网站可以方便获取 `keyCode` 值，另外可以使用代码自己获取 `keyCode`：

{% highlight javascript %}
window.addEventListener('keydown', function(event){ console.log(event) });
{% endhighlight %}

`charCode` 值则可用下面代码获得：

{% highlight javascript %}
window.addEventListener('keypress', function(event){ console.log(event) });
{% endhighlight %}

说了这么多，上面所说需要用到的几个键，其 `keyCode` 及 `charCode` 如下：

|---
|按键    |keyCode |charCode
|---
|`Shift` |16      |无
|`0 - 9` |48 - 57 |48 - 57
|`G`     |71      |71
|`g`     |71      |103
|`j`     |74      |106
|`k`     |75      |107

注：均为数字，非字符。

## 实现过程

### 上下滚一行

看几个快捷键操作，`j`、`k` 想必是最简单的，其余几个可能没有那么简单，所以先从简单的出发。

监听 `keydown` 事件，如果按下 `j`, `k` 键，使用 `scrollBy()` 方法实现上滚下滚一行[[7]] [7]，假定行高为 20 个像素，那么：

{% highlight javascript %}
function keysDown(event) {
  if (event.keyCode == 74) {
    window.scrollBy(0, 20);
  }
  if (event.keyCode == 75) {
    window.scrollBy(0, -20);
  }
}
window.addEventListener('keydown', keysDown, false);
{% endhighlight %}

### 上下滚 n 行

数字的 `keyCode` 并不等于原数字，所以这里引入一个数组，当输入为数字时，将数组内对应值赋值为原数字。每次输入数字的时候，还要结合此前输入的数字进行计算，结合上面的上下滚一行，实现如下：

{% highlight javascript %}
var lineHeight = 20; // 行高，可设置
var keys = [];
var row = 0;
function keysDown(event) {
  if (event.keyCode == 74) {
    if (row) {
      window.scrollBy(0, lineHeight * row );
      row = 0;
    } else {
      window.scrollBy(0, lineHeight);
    }
  }
  if (event.keyCode == 75) {
    if (row) {
      window.scrollBy(0, -lineHeight * row );
      row = 0;
    } else {
      window.scrollBy(0, -lineHeight);
    }
  }
  if (event.keyCode >= 48 && event.keyCode <= 57) {
    for (var i = 48; i <= 57; i ++) {
      keys[i] = i - 48;
    }
    row = parseInt(row.toString() + keys[event.keyCode].toString());
  }
}
window.addEventListener('keydown', keysDown, false);
{% endhighlight %}

### 回到顶部

Vim 的普通模式下按下 `g` `g`，即双击 `g`，就回到顶部，双击一般有一个延时的处理，虽然看起来挺简单，但凭空想象还是需要时间的，二话不说先 Google 一番，很快便在 Stack Overflow 找到了解决方法[[8]] [8]，不得不说这方法有些小聪明。

返回顶部用到了 `scrollTo()` 方法[[9]] [9]，具体代码可以这样写：

{% highlight javascript %}
var inCombo = false;
function keysDown(event) {
  if (event.keyCode == 71) {
    if (!inCombo) {
      inCombo = true;
      // 五百毫秒的延时，即需在半秒内完成双击
      setTimeout('inCombo = false;', 500);
    } else {
      window.scrollTo(0, 0);
    }
  }
}
window.addEventListener('keydown', keysDown, false);
{% endhighlight %}

### 滚到底部

滚到底部是 `Shift` + `g`，也即是组合键操作，不得不说 Google 才是人类的未来，一搜便可[[10]] [10]。

这里滚到底部需要获取整个网页的高度，其实这是个大坑，`offsetHeight`、`scrollHeight` 傻傻分不清，各浏览器的标准也有区别，这里就随便丢了算是整个网页高度的 `document.body.scrollHeight`，其实真的很想简单粗暴丢个 `99999`：

{% highlight javascript %}
var keys = [];
function keysDown(event) {
  keys[event.keyCode] = true;
  if (keys[16] && keys[71]) {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
function keysUp(event) {
  keys[event.keyCode] = false;
}
window.addEventListener('keydown', keysDown, false);
window.addEventListener('keyup', keysUp, false);
{% endhighlight %}

## 完整代码

整合以上功能，且为一些浏览器做兼容之后[[11]] [11]，完整代码如下：

{% highlight javascript %}
var inCombo = false;
var lineHeight = 20;
var keys = [];
var row = 0;
function keysDown(event) {
  keys[event.keyCode] = true;
  if (keys[16] && keys[71]) {
    window.scrollTo(0, document.body.scrollHeight );
  }
  if (keys[71]) {
    if (!inCombo) {
      inCombo = true;
      setTimeout('inCombo = false;', 500);
    } else {
      window.scrollTo(0, 0);
    }
  }
  if (keys[74]) {
    if (row) {
      window.scrollBy(0, lineHeight * row );
      row = 0;
    } else {
      window.scrollBy(0, lineHeight);
    }
  }
  if (keys[75]) {
    if (row) {
      window.scrollBy(0, -lineHeight * row );
      row = 0;
    } else {
      window.scrollBy(0, -lineHeight);
    }
  }
  if (event.keyCode >= 48 && event.keyCode <= 57) {
    for (var i = 48; i <= 57; i ++) {
      keys[i] = i - 48;
    }
    row = parseInt(row.toString() + keys[event.keyCode].toString());
  }
}
function keysUp(event) {
  keys[event.keyCode] = false;
}
if(window.addEventListener){
  window.addEventListener('keydown', keysDown, false);
  window.addEventListener("keyup", keysUp, false);
} else if (document.attachEvent){
  document.attachEvent('onkeydown', keysDown);
  document.attachEvent('onkeyup', keysUp);
} else {
  document.addEventListener('keydown', keysDown, false);
  document.addEventListener("keyup", keysUp, false);
}
{% endhighlight %}

上面说了那么多，原来也不需要用到 `keypress`，如果做到严格一点，区分大小写，或许 `keypress` 就派上用场。不过我想现在大多数人的大写锁定键基本不用到，所以也没必要较劲。为啥不实现 `Ctrl` + `f`， `Ctrl` + `b` 等？因为 `Ctrl` + `*` 本身就是浏览器的热键，还需考虑如何屏蔽。

另外，可以用 jQuery 简单实现平滑滚动而非直接定位，或者也可自己写，在此鄙人不想折腾了。

哦，对了，鄙人已将代码部署到本博，顺便学一下知乎，加按 `c` 查看评论，赶紧使用 `g` `g` 试试吧～

## 参考资料

[1]: http://vim.wikia.com/wiki/Vim_key_bindings_for_web_browsers "Vim key bindings for web browsers"
[2]: http://portix.bitbucket.org/dwb/ "dwb - a webkit browser"
[3]: http://www.zhihu.com/question/19842222 "知乎支持快捷键吗？"
[4]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode "KeyboardEvent.keyCode - Web API Interfaces | MDN"
[5]: https://zh.wikipedia.org/wiki/ASCII "ASCII - 维基百科"
[6]: http://keycode.info/ "JavaScript Event KeyCodes"
[7]: http://www.w3school.com.cn/jsref/met_win_scrollby.asp "HTML DOM scrollBy() 方法"
[8]: http://stackoverflow.com/a/4478456 "vim - press two continuous key to trigger an event in JavaScript - Stack Overflow"
[9]: http://www.w3school.com.cn/jsref/met_win_scrollto.asp "HTML DOM scrollTo() 方法"
[10]: http://www.kirupa.com/html5/keyboard_events_in_javascript.htm "Keyboard Events in JavaScript"
[11]: http://stackoverflow.com/a/9507321 "javascript - Why keydown listener doesn&#39;t work in IE - Stack Overflow"

**本文历史**

* 2015 年 09 月 20 日 完成初稿
