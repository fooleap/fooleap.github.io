---
layout: post
title: 解决 Firefox 升级后的问题
description: "这两天，把 Firefox 升级到 43.0 64 位版本，升级后有两个问题困扰我，在此记下以备忘。"
date: 2015-12-18 17:30:00 +0800
thumb: IMG_PATH/firefox.png
category: tech
tags: [Firefox, Pentadactyl]
---

* toc
{:toc}

这两天，把 Firefox 升级到 43.0 64 位版本，升级后有两个问题困扰我，在此记下以备忘。

## 未验证扩展被禁用

升级后，有多款扩展提示“未被验证在 Firefox 中使用，现已被禁用。”，这是因为那些拓展并没有托管到 `addons.mozilla.org`并通过审核，Firefox 的新版本默认将其禁止。

![多款扩展被禁用]({{ site.IMG_PATH }}/after-upgrade-to-firefox-43-01.png)
&#9650;多款扩展被禁用

这个问题的解决方法很简单，仅需根据提示点击了解详情，便可在其帮助页面中[[1]][1] 找到。

![扩展被禁用的解决方法]({{ site.IMG_PATH }}/after-upgrade-to-firefox-43-02.png)
&#9650;扩展被禁用的解决方法

根据提示，仅需打开 `about:config`，将里面的 `xpinstall.signatures.required` 首选项的值设为 `false`（双击）即可。

##Pentadactyl 无法使用

Pentadactyl 很好用，然而无论其官网或 AMO 没有很及时的更新 XPI 安装包。就算官网的 Nightly 版本，也仅更新到今年 8 月，当时适配到最新的 Firefox 41.*。

新版本要更新，就必须用 7-Zip 等工具将其 `install.rdf` 文件里规定版本号修改一下，例如下面的修改后，可使其允许在 43.0 版本中安装。

        <em:targetApplication>
            <Description
                em:id="{ec8030f7-c20a-464f-9b0e-13a3a9e97384}"
                em:minVersion="31.0"
                em:maxVersion="43.*"/>
        </em:targetApplication>

不过升级 43.0 之后，安装完却无法使用。搜了下，在 GitHub Pentadactyl 项目的 Issues 中找到答案[[2]][2]。

仅需将其为修复 FF43 无法使用问题，做修改后的 `util.jsm` 文件[[3]][3]，覆盖 XPI 中的原文件并重新安装即可（也可以自己修改文件）。

## 参考资料

[1]: https://support.mozilla.org/zh-CN/kb/add-ons-signing-firefox "Firefox 中的附加组件签名 &#124; Firefox 帮助"
[2]: https://github.com/5digits/dactyl/issues/112 "Pentadactyl doesn&#39;t work with Firefox 43 · Issue #112 · 5digits/dactyl"
[3]: https://github.com/5digits/dactyl/commit/e3c3748511ff6dfa8d917cbba04eaa7d94ad461c "Fix util.regexp.iterate for FF43. · 5digits/dactyl@e3c3748"

**本文历史**

* 2015 年 12 月 18 日 完成初稿
