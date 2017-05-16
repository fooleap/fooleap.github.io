---
layout: post
title: "Disqus Moderator Badge Text 已支持中文"
description: ""
date: 2017-05-16 06:16:49+0800
category: tech
thumb: IMG_PATH/disqus.svg
tags: [Disqus, Unicode]
---

* toc
{:toc}

Moderator Badge Text 直接 Google 翻译的意思是主持人徽章文本，可理解为管理员（博主）徽章文本，也就是在 Disqus 评论框列表上显示的，默认为“Moderator”，若设置成中文，现在已中文化的评论框默认则是“管理员”。

这个文本在 Disqus 后台可以自定义设置，之前，此项设置并不支持直接设置成中文，会显示成乱码，一种解决方案是直接设置成 HTML 字符实体。

## HTML 字符实体

在有些情况下，想显示一些特殊字符需转义输出，例如 Markdown 想在正文中显示 `|`，就需要在前面加反斜杠转义，写成 `\|`，同样的还有 JS 字符串中的引号、换行符等。

Markdown 链接 Title 中若需要显示 `|`，反斜杠就无效，这个情况下可直接输入 HTML 字符实体 `&#124;` 也可以是 `&#x7c;`。

说到 HTML 字符实体，我想写博客的大家都不陌生。在 HTML 中，一些字符是预留的，想要输入就需要以 `&实体名称;` 或 `&#实体数字;` 这种形式输入。

### 实体名称

不是所有字符都有实体名称，也并不是所有浏览器都支持所有实体名称，所以，有些情况下使用实体数字更好。

例如 `&` 可以写成 `&amp;`、空格则是 `&nbsp;`。

### 实体数字


## 参考资料

[1]: https://www.freeformatter.com/html-entities.html "Complete list of HTML entities - FreeFormatter.com"

**本文历史**

* 2017 年 05 月 16 日 完成初稿
