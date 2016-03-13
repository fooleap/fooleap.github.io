---
layout: post
title: "使用 Git 管理静态网站"
description: "本博使用 GitHub Pages，很喜欢使用 Git 这种方式管理网站，下面就一起来看看如何使用 Git 来管理静态网站"
thumb: 'http://7fv9cr.com1.z0.glb.clouddn.com/git.png'
category: tech
tags: [Git, SSH, VPS]
---

* toc
{:toc}

本博使用 GitHub Pages，很喜欢使用 Git 这种方式管理网站，下面就一起来看看如何使用 Git 来管理静态网站

以下参考这篇文章 [Using Git to manage a web site](http://toroid.org/ams/git-website-howto)

假设有一台 VPS，它的域名是 fooleap.org，我们可以通过 SSH 登录进行操作

先在服务器上创建一个新账户 git

    $ ssh root@fooleap.org 'adduser git'

###SSH 自动登录

使用公钥互信实现自动登录

    $ ssh git@fooleap.org 'mkdir .ssh'
    $ ssh git@fooleap.org 'cat >> ~/.ssh/authorized_keys' < ~/.ssh/id_rsa.pub

* 在服务器的 ~/.ssh/authorized_keys 文件添加本地公钥

可以在本地的 ~/.ssh/config 文件定义 host git 对应的主机名及用户名

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>~/.ssh/config</code></pre>
<pre style="margin-top: 0; border-top:.1rem dashed #ccc; padding-top:8px;"><code>host git
hostname fooleap.org
user git</code></pre>

经过这样处理之后，我们就可以通过 ssh git 自动登录服务器

###服务器端

    $ mkdir web.git && cd web.git
    $ git --bare init

* 初始化，添加 bare 参数是为了创建一个裸仓库，即不包含工作目录

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>./hooks/post-receive</code></pre>
<pre style="margin-top: 0; border-top:.1rem dashed #ccc; padding-top:8px;"><code>#!/bin/sh
GIT_WORK_TREE=~/web git checkout -f</code></pre>

    $ chmod +x hooks/post-receive

* 在挂钩目录 hooks 下创建一个 post-receive 文件，并赋予它可执行权限

**这么做的作用是什么呢？**

当我们在本地执行推送后，会自动执行这个脚本，将 ~/web 这个目录作为工作目录并进行 checkout 操作

<pre><code>$ cd &amp;&amp; mkdir web </code></pre>

* 创建工作目录，这个目录可通过 Nginx 等设置对其访问

为用户 git 指定一个专用的 shell

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>/etc/passwd</code></pre>
<pre style="margin-top: 0; border-top:.1rem dashed #ccc; padding-top:8px;"><code>- git:x:1001:1000:,,,:/home/git:/bin/bash
+ git:x:1001:1000:,,,:/home/git:/usr/bin/git-shell</code></pre>

* 将默认的 shell: bash 替换为 git-shell

这是为多人管理网站做的准备，作为协作管理的权限

###客户端

    $ mkdir web && cd web
    $ git init
    $ echo "Hello World" > index.html
    $ git add .
    $ git commit -m "add index.html"
    $ git remote add web git@fooleap.org:web.git
    $ git push web +master:refs/heads/master

<ul><li>初始化本地仓库，提交一个版本，添加远程仓库并推送</li></ul>

以后我们就可以在使用 git 来维护静态网站，要更新服务器端的时候，只需轻轻一推

    $ git push web

鄙人外语能力不足，没法和原文一样详细描述，Git 的使用也是半桶屎，有哪里说错，还请指出

**参考资料**

* typeof.net: [实战：用 git 搭建静态网站](http://typeof.net/mechanix/static-website-using-git-in-actions.html)
* Pro Git: [4.4 服务器上的 Git - 架设服务器](http://git-scm.com/book/zh/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E6%9E%B6%E8%AE%BE%E6%9C%8D%E5%8A%A1%E5%99%A8) [7.3 自定义 Git - Git 挂钩](http://git-scm.com/book/zh/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git%E6%8C%82%E9%92%A9#%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%8C%82%E9%92%A9)
* man githooks: [githooks(5)](http://www.kernel.org/pub/software/scm/git/docs/githooks.html#post-receive)

**本文历史**

* 2013 年 01 月 10 日 完成初稿
