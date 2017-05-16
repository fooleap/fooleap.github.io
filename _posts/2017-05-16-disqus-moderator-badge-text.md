---
layout: post
title: "Disqus Moderator Badge Text 已支持中文"
description: "Moderator Badge Text 是管理员徽章文本，也就是在 Disqus 评论框列表管理员名字旁显示的。默认文本为“Moderator”，若语言设置成中文，现在已中文化的评论框默认则是“管理员”。"
date: 2017-05-16 12:16:49+0800
category: tech
thumb: IMG_PATH/disqus.svg
tags: [Disqus, Unicode]
---

Moderator Badge Text 是管理员徽章文本，也就是在 Disqus 评论框列表管理员名字旁显示的。默认文本为“Moderator”，若语言设置成中文，现在已中文化的评论框默认则是“管理员”。

这个文本在 Disqus 后台可以自定义设置，之前，此项设置并不支持直接设置成中文，会显示成乱码，一种解决方案是直接设置成 HTML 字符实体。

## HTML 字符实体

在有些情况下，想显示一些特殊字符需转义输出，例如 Markdown 想在正文中显示 `|`，就需要在前面加反斜杠转义，写成 `\|`，同样的还有 JS 字符串中的引号、换行符等。Markdown 链接 Title 中若需要显示 `|`，反斜杠就无效，这个情况下可直接输入 HTML 字符实体 `&#124;`。

说到 HTML 字符实体，我想写博客的各位都不陌生。在 HTML 中，一些字符是预留的，想要输入也需要以 `&实体名称;` 或 `&#实体数字;` 这种形式输入。

### 实体名称

W3C 有个字符实体名称的列表[[1]][1]，还有个方便查找复制的表格页面[[2]][2]。使用起来例如 `&` 可以写成 `&amp;`、空格则是 `&nbsp;`。

在这里需要注意的是：不是所有字符都有实体名称，也并不是所有浏览器都支持所有实体名称。所以，有些情况下使用实体数字更好。

### 实体数字

HTML 实体字符中的实体数字，就是字符的 Unicode 编码。熟面熟面，直接使用 JavaScript 的 `charCodeAt()` 方法即可返回字符的 Unicode 编码。例如：

```javascript
'|'.charCodeAt()
```

字符实体为 `&#124;`。

这个实体数字也可以是 16 位进制的，只需要在数字前面加上字母 `x` 便可，在使用 `charCodeAt()` 方法获取时，再将其转换成 16 进制的：

```javascript
'|'.charCodeAt().toString(16)
```

字符实体为 `&#x7c;`。

对了，若不习惯直接使用 JavaScript，也有 N 多的线上工具可以提供转换，例如 Unicode code converter[[3]][3]。

## Moderator Badge Text

上面有点离题，绕了这么大个弯，废话那么多。我只是想说，之前在 Disqus 设置管理员徽章文本时，想要显示“博主”，需要这么设置：`&#21338;&#20027;`。而现在已经不需要了直接输入文本就行，想要什么就设置什么，不需要使用什么 HTML 字符实体来设置。

最近，Disqus 中文化已经完成[[4]][4]，评论框已经完全中文化，目前后台除了站点管理，其他的也已经有中文支持了。

## 参考资料

[1]: https://www.w3.org/TR/html51/syntax.html#named-character-references "8.5. Named character references"
[2]: https://dev.w3.org/html5/html-author/charref "Character Entity Reference Chart"
[3]: https://r12a.github.io/apps/conversion/ "Unicode code converter"
[4]: https://www.transifex.com/disqus/disqus/ "Disqus 本地化"

**本文历史**

* 2017 年 05 月 16 日 完成初稿
