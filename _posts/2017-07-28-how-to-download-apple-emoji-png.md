---
layout: post
title: "如何下载 Apple Emoji 的 PNG 图片"
date: 2017-07-28 06:30:26+0800
thumb: IMG_PATH/apple.svg
category: tech
tags: ["EmojiOne", "Emoji", "JavaScript"]
---

Emoji 表情是现代人几乎每天都能接触到的东西，此前为了博客正文支持 Emoji，特意装了 [Jemoji 插件](/jemoji.html)。现在，为了评论支持 Emoji 表情，我在使用 Disqus API 制作评论框时，顺便也加上 Emoji 表情的支持，用的是 EmojiOne[[1]][1]。

Emoji 虽然有标准，但在不同的设备，甚至不同的网站、App 上显示都不一样。其中，我想大家最为熟悉的还是苹果的，毕竟 Emoji 的流行还是苹果带的，加上微信等常用软件也是用它，所以我打算在评论框上 Emoji 表情也用 Apple Emoji。

之前用 Jemoji 时，用了 GitHub 的 CDN，其表情文件命名方式跟 EmojiOne 是一样的，均是使用其 Unicode 编码为文件名，而且是 Apple Emoji 的新表情，正合我意，于是就直接使用 GitHub 上的资源。而事实上，GitHub 上面的表情并不全，从其 Emoji API[[2]][2] 返回的数据来看，有表情 1500 个左右，看起来数量相当庞大，实际使用中发现一些新表情并没有，比如说区分肤色的那部分，从 EmojiOne 提供的 Emoji 短代码数据[[3]][3]来看，有 2600 多个表情，还是差挺多的。

那我们应该去哪里下载到 Apple Emoji 新表情相对较全的 PNG 资源呢？Emojipedia 是提供 Emoji 百科的一个网站，在 Apple Emoji List[[4]][4] 这个页面，几乎列出了所有的表情。或许可以把这个页面的表情全部下载下来能用？查看源码，发现其文件名命名方式是短代码 + Unicode，区别不大嘛，批量重命名即可。

于是按 F12 开干，发现页面用了 jQuery，更加方便了：

```js
var output = '';
$('.emoji-grid img').each(function(){
    var url = $(this).data('src');
    output += (!!url ? url : $(this).attr('src'))+ '\n';
});
$('body').append('<textarea>'+output+'</textarea>');
```

这样就把所有 Emoji 表情的 PNG 图片地址扔到一个 textarea 里面，复制出来另存就 OK。哦，对了，Emojipedia 提供两种规格的图片，分别是 `72x72` 及 `144x144`。若需要 `144x144` 分辨率的，只需另复制一份并修改其 URL 中的 `72` 这个数字为 `144` 即可。

怎么批量下载？扔到 VPS 上用 wget 应该是最省心的。

```bash
$ wget -i file
```

如何重新命名？Windows 有个神器叫 TC（Total Commander）[[5]][5]，用它来批量重命名再合适不过，用起来比 sed 要方便多了，起码是图形界面的操作。

那么在自己网站使用 Apple Emoji 是否侵权？这有点废话，那么多网站都在用了。关于这个，或许可以看这个用了 Apple Emoji 做的视频[[6]][6]，介绍里是怎么说的。

网上的 Apple Emoji 图片表情，可能大部分都是提取自 Apple Color Emoji 字体，能不能直接从 Apple Color Emoji 中导出来图片？这里就先不折腾了，以上下载的 PNG 表情已经够用。

## 参考资料

[1]: https://github.com/emojione/emojione "emojione/emojione: EmojiOne™ is the open emoji standard."
[2]: https://api.github.com/emojis "https://api.github.com/emojis"
[3]: https://github.com/emojione/emojione/tree/master/extras/alpha-codes "Emoji Alpha Codes"
[4]: https://emojipedia.org/apple/ "Apple Emoji List — Emojis for iPhone, iPad and macOS"
[5]: https://www.ghisler.com/ "Total Commander"
[6]: http://ideas.dissolve.com/tips/how-to-get-emojis-in-your-projects "How to use emoji in your video"

**本文历史**

* 2017 年 07 月 28 日 完成初稿
