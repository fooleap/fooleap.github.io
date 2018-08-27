---
layout: post
title: 暂存 Disqus 匿名评论者邮箱地址
date: 2018-08-27 05:18:14+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API"]
---

年中，因欧盟的《通用数据保护条例》(GDPR)[[1]][1]，Disqus 隐藏了评论者电子邮箱及 IP 地址的部分数据[[2]][2]，IP 地址倒是可有可无，但邮箱地址的屏蔽带来一些困扰。官方不提供，想要解决问题，那只能自己保存。

获取匿名评论者邮箱号的作用主要有俩，一是发送回复邮件提醒，二是显示对应的 Gravatar 头像[[3]][3]。

刚开始我认为发邮件提醒这个功能比较重要，一般评论都会在近几天回复，所以只想到保存近期的邮箱号，以评论 ID 保存了近一个月的邮箱数据。后来意识到这样做太笨了，显示 Gravatar 头像几乎不能，有时还会有很多重复的邮箱号数据。

好在 Disqus 并没有完全屏蔽邮箱，而是隐藏了邮箱号的用户名部分，规则如下：

* 若用户名是 1 个字符，则替换为"\*”，如 u@email.com -> \*@email.com
* 若用户名超过了 1 个字符，则替换除了第 1 个字符外的所有字符为“\*”，如 username@email.com -> u\*\*\*\*\*\*\*@email.com

以上规则 PHP 代码可以如下：

```php
$index = strrpos($email, '@');
$start = $index > 1 ? 1 : 0;
$length = $index - $start;
$star = str_repeat('*', $length);
$anonEmail = substr_replace($email, $star, $start, $length);
```

使用 name 和以上规则处理过的 email，作为识别差强人意。以其 MD5 值为 key，邮箱号为 value。只需要在提交匿名评论时保存，读取评论时匹配取出即可。

## 参考资料

[1]: https://en.wikipedia.org/wiki/General_Data_Protection_Regulation "General Data Protection Regulation - Wikipedia"
[2]: https://blog.disqus.com/update-on-privacy-and-gdpr-compliance "Update on Privacy and GDPR Compliance"
[3]: https://en.gravatar.com/site/implement/images/ "Image Requests"

**本文历史**

* 2018 年 08 月 27 日 完成初稿
