---
layout: post
title: "更好的 Markdown 插图方式"
description: "我都忘了多久之前，不再喜欢可视化编辑，写博文都喜欢直接编辑源码。使用 Jekyll 以来，采用 Markdown 语法插图比起之前用 HTML 要方便很多。最近忽然发现 Markdown 的插图方式不止一种，感觉参考资料风格的插图更加好用。"
date: 2017-04-27 17:00:00+0800
thumb: IMG_PATH/markdown.png
category: tech
tags: ["Markdown", "Liquid", "Jekyll"]
---

* toc
{:toc}

我都忘了多久之前，不再喜欢可视化编辑，写博文都喜欢直接编辑源码。使用 Jekyll 以来，采用 Markdown 语法插图比起之前用 HTML 要方便很多。最近忽然发现 Markdown 的插图方式不止一种，感觉参考资料风格的插图更加好用。

## 图片命名

考虑到大多数博文的插图并不多，因此图片命名方式不以目录方式，而是均统一以 `博文 id` + `数字` 的方式命名，放在七牛一个空间的根目录。

使用 Jekyll 的全局变量，为插图提供方便，也方便以后换图床等操作。

仅需使用 Liquid 语法插入图床地址 + 文件名即可拼凑出图片 URL。

```liquid{% raw %}
{{ site.IMG_PATH }}/file/to/image
{% endraw %}```

## 内联插图

在这篇博文之前，我是以这种方式进行插图的。

```markdown
![alt text](url/to/image "Title")
```

```markdown{% raw %}
![alt text]({{ site.IMG_PATH }}/file/to/image "Title")
...
![alt text]({{ site.IMG_PATH }}/file/to/image "Title")
...
![alt text]({{ site.IMG_PATH }}/file/to/image "Title")
...
{% endraw %}```

`Title` 是可选的，我一般懒得加。

## 参考资料风格

跟链接一样，Markdown 插图还提供了一种参考链接风格的插图方式[[1]][1]。

```markdown
![alt text][id]

[id]: /url/to/image "Title"
```

```markdown{% raw %}
![alt text][p1]
...
![alt text][p2]
...
![alt text][p3]
...

[p1]: {{ site.IMG_PATH }}/file/to/image "Title"
[p2]: {{ site.IMG_PATH }}/file/to/image "Title"
[p3]: {{ site.IMG_PATH }}/file/to/image "Title"
{% endraw %}```

`Title` 依然是可选的。

参考资料式插图看似复杂，事实上实际应用起来却更加方便。

* 正文不需再复制粘贴，更流畅的写博
* 修改起来或许会更加方便

对于博客里面的外部链接，我亦采用 Markdown 参考资料风格引入，之前还[折腾将其显示为百科风格](/reference.html)。为了和链接区分开来，图片均以 `p` 为前缀。

## 参考资料

[1]: https://daringfireball.net/projects/markdown/syntax#img "Markdown: Syntax"

**本文历史**

* 2017 年 04 月 27 日 完成初稿
