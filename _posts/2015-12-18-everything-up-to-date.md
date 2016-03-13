---
layout: post
title: 解决 Git 的 Everything up-to-date 问题
description: "前几天，我更新完博客后进行 push 操作，上传数据到 GitHub 时，遇到一个问题，无论我怎么 commit，push 后依然返回提示 Everything up-to-date。"
date: 2015-12-18 19:20:00 +0800
thumb: IMG_PATH/git.png
category: tech
tags: [Git]
---

前几天，我更新完博客后进行 `push` 操作，上传数据到 GitHub 时，遇到一个问题，无论我怎么 `commit`，`push` 后依然返回提示 `Everything up-to-date`。这个问题导致的后果是托管在 GitHub 的博客无法更新。

{% highlight bash %}
$ git push origin master:master
Everything up-to-date
{% endhighlight %}

查看 `status`，确实已经提交了，看看对应远程分支地址有没有问题。

{% highlight bash %}
$ git remote -v
cafe    git@gitcafe.com:fooleap/fooleap.git (fetch)
cafe    git@gitcafe.com:fooleap/fooleap.git (push)
origin  git@github.com:fooleap/fooleap.github.io.git (fetch)
origin  git@github.com:fooleap/fooleap.github.io.git (push)
{% endhighlight %}

看起来很干净，应该没问题，再看看本地分支。

{% highlight bash %}
$ git branch
* (no branch)
  master
{% endhighlight %}

终于发现有一个 `(no branch)` 分支，而且目前处于这个分支，莫名其妙，一点印象都没有，不知道是什么时候的什么操作导致的。不管了，备份好新增加的文件，切换到 `master` 分支，问题解决。

**本文历史**

* 2015 年 12 月 18 日 完成初稿
