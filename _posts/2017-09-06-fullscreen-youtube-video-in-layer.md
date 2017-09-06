---
layout: post
title: "弹出层中的视频全屏问题"
date: 2017-09-06 12:48:59+0800
thumb: IMG_PATH/js.svg
category: tech
tags: ["YouTube", "Layer", "JavaScript"]
---

前几天，在做一个站时，需要弹出层播放 YouTube 视频。网站采用 jQuery，并使用 Layer[[1]][1] 做弹层。需要显示 YouTube 的视频，从简使用 YouTube 简单的 IFrame Player API[[2]][2] 调用视频。

JS 代码段如下：

```js
function onPlayerReady(event) {
    event.target.playVideo();
}
var player;
layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
    area: ['800px', '450px'],
    content: '<div id="player"></div>',
    shadeClose: true,
    skin: 'layer-video',
    success: function(){
        player = new YT.Player('player', {
            height: '450',
            width: '800',
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': onPlayerReady,
            }
        });
    }
});
```

网页使用中出现个小问题，就是弹层中的 YouTube 视频全屏后看不到了。实际上它是已经有执行全屏操作的，理所当然想到 CSS 的定位问题。我记得之前使用自己写的弹层并播放腾讯视频全屏没问题，问题可能在于 Layer。

我在 YouTube API 文档里找不到全屏的相关 event，后来发现直接监听网页的全屏事件即可，具体可以看 Fullscreen API[[3]][3]。我的想法是监听全屏，当有全屏时操作 DOM，让视频能显示出来。

调试来调试去心好累，搞得都想放弃 Layer，直接为这视频写个简单的弹出层。后来灵机一动，直接把弹层的主容器作为 YouTube API 操作的容器。也即：

```js
function onPlayerReady(event) {
    event.target.playVideo();
}
var player;
layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
    area: ['800px', '450px'],
    shadeClose: true,
    skin: 'layer-video',
    success: function(){
        var playerId = $('.layer-video').attr('id');
        player = new YT.Player(playerId, {
            height: '450',
            width: '800',
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': onPlayerReady,
            }
        });
    }
});
```

问题解决。

## 参考资料

[1]: http://layer.layui.com/ "layer（jQuery弹出层插件）"
[2]: https://developers.google.com/youtube/iframe_api_reference "YouTube Player API Reference for iframe Embeds &#124; YouTube IFrame Player API"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API "Fullscreen API - Web APIs &#124; MDN"

**本文历史**

* 2017 年 09 月 06 日 完成初稿
