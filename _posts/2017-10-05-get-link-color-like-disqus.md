---
layout: post
title: "像 Disqus 一样获取链接颜色"
date: 2017-10-05 21:10:15+0800
thumb: IMG_PATH/js.svg
category: tech
tags: ["Disqus", "JavaScript"]
---

平常接触 Disqus 比较多的朋友不难发现，Disqus 原生评论列表的链接颜色，似乎是直接采用所应用页面的主链接颜色，也就是出现次数最多的链接颜色。

那么，怎样获取到页面的主链接颜色呢？思路是遍历所有的 `<a>` 标签，并获取到相应的颜色值，存起来再比较，以找出出现次数最多的那个颜色值。

获取 CSS 属性值，采用 window 的 getComputedStyle 方法[[1]][1]没跑。因实现起来不麻烦，就不多话，具体代码可如下：

```js
function getColor(){
    var links = document.getElementsByTagName('a');
    var colors = {};
    var max = 0;
    var linkColor;
    for (var i = 0; i < links.length; i++) {
        var color = getComputedStyle(links[i]).color;
        colors[color] = (colors[color] || 0) + 1;
    }
    for (var color in colors) {
        var count = colors[color];
        if (count > max) {
            max = count;
            linkColor = color;
        }
    }
    return linkColor || rgb(46, 159, 255);
}
```

经 [@xcatliu](#comment-3558113630) 提醒，Disqus 使用的不是出现次数最多的颜色值，而是 id 为 disqus_thread 中的 a 标签继承的颜色值，也就是说，若想改变 Disqus 评论框的链接颜色，只需用 CSS 指定一下就可以了，如：

```css
#disqus_thread a{
    color: #ff0;
}
```

关于 Disqus 是怎么获取到颜色值，又是怎么传到 iframe 里的， [@xcatliu](#comment-3558113630) 解释得很清楚，就不再废话。

## 参考资料

[1]: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle "Window.getComputedStyle() - Web API 接口 &#124; MDN"

**本文历史**

* 2017 年 10 月 05 日 完成初稿
* 2017 年 10 月 14 日 完善 
