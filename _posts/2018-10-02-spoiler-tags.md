---
layout: post
title: 不可立见的 spoiler 标签
date: 2018-10-02 19:40:46+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "spoiler"]
---

Spoiler 可用于编写用户可能不想看到或隐藏的文本，但用户将鼠标移到其上面即可见。Disqus[[1]][1] 有那么个自定义的标签 &#60;spolier&#62;，默认隐藏文本，只有当鼠标移到上面才显示。其他网站也有接近的实现，如：Stack Overflow[[2]][2]、reddit[[3]][3]。

Disqus 直接采用 &#60;spolier&#62; 标签，使用 CSS 定义样式，属于行内元素，默认显示深色背景文本透明，只有在 hover 时转浅色背景显示文本。

Stack Overflow、reddit 这俩网站和 Disqus 有所区别，他们使用 Markdown 语法实现。

其中，Stack Overflow 的语法如下：

```markdown
>! abc
>! abc
```

reddit 则是：

```markdown
>!abc!<
>!abc!<
```

从以上或许可以看出，在 Stack Overflow，spolier 如同 blockquote 的语法，属于块级元素，在 reddit，spolier 则是行内元素。

未完待续……

## 参考资料

[1]: https://help.disqus.com/commenting/spoiler-tags "Spoiler Tags | Disqus"
[2]: https://stackoverflow.com/editing-help#spoilers "Markdown Editing Help - Stack Overflow"
[3]: https://www.reddit.com/wiki/commenting#wiki_posting "commenting - reddit.com"

**本文历史**

* 2018 年 10 月 02 日 完成初稿
