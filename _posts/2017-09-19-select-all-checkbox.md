---
layout: post
title: "选择框的全选联动"
date: 2017-09-19 22:00:37+0800
thumb: IMG_PATH/js.svg
category: tech
tags: ["Checkbox", "JavaScript"]
---
最近工作更忙了，博客已经十来天没更新了，今晚有空闲，懒得扒太麻烦的话题，且聊一下简单的 JS 效果，这篇主要说的是选择框的全选联动。

我这里所说的全选联动是：

```html
<label><input class="checkbox" type="checkbox" /> 选择框 1</label>
<label><input class="checkbox" type="checkbox" /> 选择框 2</label>
<label><input class="checkbox" type="checkbox" /> 选择框 3</label>
<label><input class="checkbox" type="checkbox" /> 选择框 4</label>
<label><input class="checkbox" type="checkbox" /> 选择框 5</label>
<label><input id="selectAll" type="checkbox" /> 全选</label>
```
以上六个选择框，且将最后一个叫全选选择框，其余叫其余选择框。

1. 选中全选选择框，其余选择框均被选中；反选全选选择框，其余选择框均未选。
2. 其余选择框都选中时，全选选择框也被选中；其余选择框只要有一项未被选中，全选选择框未选中。

这个 CSS 一般没法实现，但 CSS 的奇淫技巧，也不是第一次见识了，或许会有办法？这里还是说下 JS 实现。

第一个很好实现，只要全选选择框触发 change 事件便做判断及操作即可。

```js
var checkboxes = document.getElementsByClassName('checkbox');
document.getElementById('selectAll').addEventListener('change', function(e) {
  for (var i = 0; i < checkboxes.length; i++) {
    if (!!e.target.checked) {
      checkboxes[i].checked = true;
    } else {
      checkboxes[i].checked = false;
    }
  }
}, false)
```

第二个无非就是判断多个选择框，如下：

```js
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', function(e) {
    var checked = true;
    for (var n = 0; n < checkboxes.length; n++) {
      if (!checkboxes[n].checked) {
        checked = false;
      }
    }
    document.getElementById('selectAll').checked = checked;
  }, false)
}
```

{% include media.html type="iframe" src="//jsfiddle.net/fooleap/2bbky4gf/embedded/result,js,html/" %}

这本是最常见的功能，购物车、后台管理等常用，本篇有些凑字数的感觉。

**本文历史**

* 2017 年 09 月 19 日 完成初稿
