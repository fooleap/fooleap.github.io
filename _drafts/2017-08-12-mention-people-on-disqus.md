---
layout: post
title: "Disqus 的 @ 提及功能"
date: 2017-08-14 10:04:09+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API"]
---

使用 @ 提及功能引起某人的注意，是 Twitter 发明的[[1]][1]。现在这个功能已经是社交平台的标配，也成为我们所认为的社交平台都应有的功能。正如你想的那样，Disqus 评论框早在 2011 年开始便支持 @ 提及功能[[2]][2]。

**为什么要有 @ 功能？**

1. 留言者不一定要回复某人，却想提醒某人来看
2. Disqus 的回复邮件通知，默认只通知其父评论的留言者，其余均不通知

## Disqus 评论框的 @ 功能

Disqus 的 @ 功能，不仅仅可以 @ 参与该帖的评论者，而是全体 Disqus 用户均可提及，甚至还支持提及 Twitter 用户。至于如何使用，Disqus 已经说得很详细[[3]][3]，在此鄙人就不再多话。

我们需要探讨的是，使用 Disqus API 实现的评论框，应该如何实现 @ 提及功能？

Disqus 原生的文本编辑框，用的并不是普通文本输入控件 `<textarea>` 标签，所以它的表现形式比较多样化。抛去华丽的外表，@ 某人之后发表评论时，看下请求（也可去后台管理点编辑查看）便可知道，它 @ 某人的标识是这样的 `@username:disqus`，其中 `username` 是想要提及的 Disqus 用户的 `username`，若是想提醒 Twitter 用户则是 `@username:twitter`。

我做的评论框，文本部分用的是 `<textarea>`，也就是说，在不做任何处理的前提下，仅需在文本框内直接输 `@fooleap:disqus` 就能 @ 到我。

## 自制评论框实现 @ 功能

此前 @sengmitnick 提到 [@ 功能没什么卵用](/disqus-php-api.html#comment-3437909344)，明白了 Disqus 提及功能之后，就可以自己动手为自制评论框做下提及功能。在实现之前，我梳理了下初步实现的思路。

1、是否改变纯文本的编辑框？

不考虑，依然使用 `<textarea>`。

2、以什么形式代表 @ 某人？

`@username`，比较折中的显示。

3、支持 @ 的范围

该帖已加载评论的 Disqus 用户，已够用。

4、输入 `@` 后怎么显示 autocompleter

观察到和 GitHub Issues 的编辑框有不少相似点，考虑过滤器跟 Github 一样的形式[[4]][4]，跟随光标显示，可用鼠标或键盘选择。

## 参考资料

[1]: https://en.wikipedia.org/wiki/Mention_(blogging) "Mention (blogging) - Wikipedia"
[2]: https://blog.disqus.com/pull-people-into-your-conversation-with-mentions "Pull people into your conversation with @mentions" 
[3]: https://help.disqus.com/customer/portal/articles/832143-mentions "Mentions · Disqus"
[4]: https://github.com/blog/1004-mention-autocompletion "@mention autocompletion"

**本文历史**

* 2017 年 08 月 14 日 完成初稿
