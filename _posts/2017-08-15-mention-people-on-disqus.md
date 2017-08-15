---
layout: post
title: "Disqus 的 @ 提及功能"
description: "使用 @ 提及功能引起某人的注意，是 Twitter 发明的。现在这个功能已经是社交平台的标配，也成为我们所认为的社交平台都应有的功能。正如你想的那样，Disqus 评论框早在 2011 年开始便支持 @ 提及功能。"
date: 2017-08-15 08:04:48+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API"]
---

## 为什么 Disqus 要有 @ 功能？

1. 留言者不一定要回复某人，却想提醒某人来看
2. Disqus 的回复邮件通知，默认只通知其父评论的留言者，其余均不通知

使用 @(at) 提及功能引起某人的注意，是 Twitter 发明的[[1]][1]。现在这个功能已经是社交平台的标配，也成为我们所认为的社交平台都应有的功能。正如你想的那样，Disqus 评论框早在 2011 年开始便支持 at 提及功能[[2]][2]。

## Disqus 评论框的 @ 功能

Disqus 的 at 功能，不仅仅可以 at 参与该帖的评论者，而是全体 Disqus 注册用户均可提及，甚至还支持提及 Twitter 用户。至于如何使用，Disqus 已经说得很详细[[3]][3]，在此鄙人就不再多话。

我们需要探讨的是，使用 Disqus API 实现的评论框，应该如何实现 at 提及功能？

Disqus 原生的文本编辑框，用的并不是普通文本输入控件 `<textarea>` 标签，所以它的表现形式比较多样化。抛去华丽的外表，at 某人之后发表评论时，看下请求（也可去后台管理点编辑查看）便可知道，它 at 某人的标识是这样的：

    @username:disqus

其中 `username` 是想要提及的 Disqus 用户的 `username`，若是想提醒 Twitter 用户则是：

    @username:twitter

## 自制评论框实现 @ 功能

那么采用 Disqus API 自己做的评论框，又应该怎么实现这个 at 功能呢？我目前评论内容部分用的是 `<textarea>`，也就是说，在不做任何处理的前提下，仅需在文本框内直接输 `@fooleap:disqus` 就能 at 到我。

此前 @sengmitnick 提到 [@ 功能没什么卵用](/disqus-php-api.html#comment-3437909344)，我想让它有卵用，所以明白了 Disqus 提及功能之后，就决定动手为自制评论框做个相对好用一点的提及功能。我不打算改变原有的纯文本编辑框，依然使用 `<textarea>`。

在实现之前，我梳理了下初步实现的思路：

1. 支持 at 的对象：该帖已加载评论的 Disqus 用户，已够用。
2. 以什么形式代表 at 某人？`@username`，比较折中的显示。
3. 输入 `@` 后怎么显示 autocompleter：观察到和 GitHub Issues 的编辑框有不少相似点，考虑过滤器跟 Github 一样的形式[[4]][4]，跟随光标显示，可用鼠标或键盘选择。

### 替换字符

其中第 1、2 点，实现起来比较方便，思路清晰：

1. 在后端返回每条评论作者的 Username 即可，定义一个数组 users，遍历评论时，判断里面是否存在该评论者的 Username，没有就扔进去。
2. 发表评论时，使用正则替换，符合 `@username` 的字符串，若 `username` 存在于 users 数组，便替换为 `@username:disqus`。

第二步可实现如下：

```js
// message 为评论内容，users 为 username 数组
var mentions = message.match(/@\w+/g);
if( !!mentions ) {
    mentions = mentions.filter(function(mention) {
        return users.indexOf(mention.slice(1)) > -1;
    });
    if( mentions.length > 0 ){
        var re = new RegExp('('+mentions.join('|')+')','g');
        message = message.replace(re,'$1:disqus');
    }
}
```

没有过滤处理，因每篇文章的 Disqus 用户并不多，少数情况下会出现 BUG。

### 显示自动完成过滤框

第三点稍微复杂一点，看似简单的跟随光标显示筛选框，但里面有个比较烧脑的坑，那就是如何获取 `textarea` 内光标的坐标？

使用 `selectionStart` 及 `selectionEnd` 可以获取到光标的位置，但是没办法获取到相关的坐标。我没有过多的研究，而是直接通过 Google 搜索解决，一种实现的思路[[5]][5]如下：

1. 创建一个 `div`，将 `textarea` 的样式全部复制给它，并设置 `position: absolute`
2. 复制开头到光标处的字符串到 `div` 内部，在字符串后面插个 `span`
3. 获取到 `span` 在这个 `div` 的相对位置（`offsetTop`, `offsetLeft`），这也就是 `textarea` 光标处的相对坐标
4. 一旦获取到就把 `div` 移除掉 

其他的就相对简单一点，思路如下：

1. 监听 `keyup` 事件，获取 `selectionStart` 前最后一个 `@` 到 `selectionStart` 的字符串，字符串符合规则 `/^@\w+$|^@$/` 就往前走。
2. 以上字符串去掉 `@` 字符，再去跟已存在的每个 `username` 做正则匹配（忽略大小写）。
3. 若过滤后的 `username` 列表不为空，使用上面获取到的坐标显示出来，并监听鼠标事件 `mouserover`、`click`，键盘事件 `keydown`（上下方向键、回车）。
4. 一旦规则不符，移除过滤列表和键盘事件 `keydown` 的监听。

列表样式结合 GitHub 及 Disqus，具体的效果如下：

![评论框 at 效果][p1]

目前仅局限于 at 已登录用户，匿名评论暂不添加。

## 参考资料

[1]: https://en.wikipedia.org/wiki/Mention_(blogging) "Mention (blogging) - Wikipedia"
[2]: https://blog.disqus.com/pull-people-into-your-conversation-with-mentions "Pull people into your conversation with @mentions" 
[3]: https://help.disqus.com/customer/portal/articles/832143-mentions "Mentions · Disqus"
[4]: https://github.com/blog/1004-mention-autocompletion "@mention autocompletion"
[5]: https://medium.com/@_jh3y/how-to-where-s-the-caret-getting-the-xy-position-of-the-caret-a24ba372990a "HOW TO: Where’s the caret? Getting the XY position of the caret"

**本文历史**

* 2017 年 08 月 15 日 完成初稿
* 2017 年 08 月 15 日 修改部分 “@” 为 “at”

[p1]: {{ site.IMG_PATH }}/mention-people-on-disqus.gif "评论框 at 效果"
