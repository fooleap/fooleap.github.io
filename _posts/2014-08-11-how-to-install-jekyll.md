---
layout: post
title: 如何搭建 Jekyll 写作环境
description: "在好久好久以前，我提到了我从 WordPress 切换到 Jekyll 的缘由。自从使用 Jekyll 写博，到现在也已经有两年半左右的时间，Jekyll 也日趋成熟，使用起来也相当舒畅，无过多的不适感。"
category: tech
thumb: 'IMG_PATH/jekyll.png'
tags: [Jekyll, Ruby, 博客]
---

* toc
{:toc}

Windows 用户可前往 [在 Windows 上搭建 Jekyll 写作环境](run-jekyll-on-windows.html)

在好久好久以前，我提到了我 [从 WordPress 切换到 Jekyll 的缘由](http://blog.fooleap.org/replace-wordpress-with-jekyll.html)。自从使用 Jekyll 写博，到现在也已经有两年半左右的时间，Jekyll 也日趋成熟，使用起来也相当舒畅，无过多的不适感。

## 废话在前

上一篇介绍 Jekyll 的博文发布时，Jekyll 还只是在 0.*  的版本，目前版本已经迭代到  2.2.0，其官网也在此前进行改版，目前文档相对比较完善。

一直说 Jekyll 是静态博客生成器，那么 Jekyll 应该如何在本地安装呢？换句话说，就是如何在本地部署博客环境。这并不复杂，鄙人也说过网上资源千千万万，也认为多我一个不多，少我一个不少，所以一直没想写。

但想到，若有人以前从没了解到或接触过 Jekyll，无意间进我的博客，也想知道是怎么弄的？在此提供一些资源也是不错的，免得浪费时间去做我做过的体力活。

## Ruby 环境的部署

Jekyll 是使用 Ruby 语言写成的，所以首先要安装一个 Ruby 的解释器。而 Ruby 的各种资源在 Windows 上运行频频报错，因此并不推荐在 Windows 上折腾，若你不得不在 Windows 下工作，可以参考 [这篇文章](http://blog.fens.me/jekyll-bootstarp-github) 部署。Mac OS  X 鄙人并没接触过，固在此也仅介绍在 Linux 上的部署，相信和 Mac OS X 上的安装方法大同小异。

Ruby 环境的安装，一般采用可以提供版本管理及切换的命令行工具  RVM，这个工具的安装十分简单。

安装 RVM 仅需一条命令：

    $ curl -L get.rvm.io | bash -s stable

载入环境：

    $ source ~/.rvm/scripts/rvm

source 的作用之一是方便用户不用另开终端便可快速载入环境变量，在此也可另开一个虚拟终端而不执行该命令。

安装 Ruby：

    $ rvm install 2.1.2

目前的最新的正式版本是 2.1.2

设置 2.1.2 版本为默认版本：

    $ rvm default 2.1.2

以上参考 [如何快速正确的安装 Ruby, Rails 运行环境](https://ruby-china.org/wiki/install_ruby_guide)，关于 RVM 的更多使用方法可参考 [RVM 实用指南](https://ruby-china.org/wiki/rvm-guide)。
至此，已经安装了 Ruby ，以及早就已经提供的 RubyGems、Rake，如果你想了解这些概念，可以查看 [这篇文章](http://henter.me/post/ruby-rvm-gem-rake-bundle-rails.html)。

## Jekyll 以及其他依赖的安装

安装 Jekyll：

    $ gem install jekyll

2.0.0 版本做了较大的调整， 内置 CoffeeScript 的支持，因此需要手动安装一个 JavaScript 运行环境作为依赖，如 node.js。

 在 Arch Linux 是这样：

    # pacman -S nodejs

在 Ubuntu 则是：

    # apt-get install nodejs

到这里，Jekyll 的本地环境就搭建完成。

**注**

 以上  rvm, gem 使用时下载速度过慢可用 [淘宝提供的镜像](http://ruby.taobao.org/)。

## 参考资料

* [Jekyll 在 github 上构建免费的 Web 应用](http://blog.fens.me/jekyll-bootstarp-github/)
* [如何快速正确的安装 Ruby, Rails 运行环境](https://ruby-china.org/wiki/install_ruby_guide)
* [RVM 实用指南](https://ruby-china.org/wiki/rvm-guide)
* [整理 Ruby 相关的各种概念](http://henter.me/post/ruby-rvm-gem-rake-bundle-rails.html)

**本文历史**

* 2014 年 08 年 11 日 完成初稿
