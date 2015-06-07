---
layout: post
title: 在 Windows 上搭建 Jekyll 写作环境
date: 2015-05-27 09:00:00 +0800
description: "曾几何时，别说是 Jekyll，Windows 用户想要好好用一会 Ruby 也相当麻烦，安装时各种出错，但现在想在 Windows 上搭建一个可用的 Jekyll 写作环境还是挺简单的。"
category: tech
tags: [Jekyll, Ruby, Windows, wdm, 博客]
---

* toc
{:toc}

曾几何时，别说是 Jekyll，Windows 用户想要好好用一会 Ruby 也相当麻烦，安装时各种出错，但现在想在 Windows 上搭建一个可用的 Jekyll 写作环境还是挺简单的。

Jekyll 官方在 [Jekyll on Windows](http://jekyllrb.com/docs/windows/) 引用了 Julian Thilo 的介绍 [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/)，部署的过程如下。

##安装 Ruby 

首先，按需到 [RubyInstallers](http://rubyinstaller.org/downloads) 下载一个 Ruby 安装包，根据实际需求，鄙人选择“Ruby 2.2.2 (x64)”。
 
安装的时候注意勾选“Add Ruby executables to your PATH”，设置环境变量，这样一来，你将能在 Windows 命令行直接使用 Ruby 的相关命令。

![Add Ruby executables to your PATH]({{site.IMG_PATH}}/run-jekyll-on-windows-01.png)
▲勾选 Add Ruby executables to your PATH
 
##安装 Ruby DevKit

除此，由于 Jekyll 的一些依赖需要支持（例如 yajl-ruby），还需要安装一个 Ruby DevKit，Ruby  的开发工具包，一样[在此](http://rubyinstaller.org/downloads)按需获取，鄙人选择 `DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe`。
 
这是一个压缩包， 为它建个目录（永久）并解压进去，例如 `C:\RubyDevKit`，进入此目录并初始化。

    cd C:\RubyDevKit
    ruby dk.rb init

若它不能自动获取 Ruby 目录时，需编辑其目录下的 `config.yml` 文件手动照葫芦画飘在后面加上

    - C:/Ruby22-x64

最后安装 DevKit

    ruby dk.rb install

##安装 Jekyll

假如你打算将博客托管到 GitHub 上，建议直接跳到 [github-pages](#github-pages-ruby-gem)

和 Linux 一样，在 Windows 上安装 Jekyll 仅需在命令行输入

    gem install jekyll

等待安装后，你就可以使用 Jekyll，使用 `jekyll new` 命令即可简单生成一个默认的博客，例如

    jekyll new blog

##GitHub Pages Ruby Gem

GitHub 提供 [`github-pages`](https://github.com/github/pages-gem) 这个 gem，方便我们本地搭建和 GitHub Pages 线上相同的 [Jekyll 环境](https://pages.github.com/versions/)，包括 Jekyll、少部分插件、Markdown 渲染引擎等等。

安装 gem

    gem install github-pages

或许版本不够新，但一定最适合将博客托管在 GitHub Pages 的你。


##语法高亮(可选)

若你的博客托管在 GitHub，又想使用语法高亮（pygments），那么你需要安装 Python。到 [Python Releases for Windows](https://www.python.org/downloads/windows/) 按需下载 Python 2，安装时和 Ruby 一样，如图注意勾选设置环境变量的选项。

![Python 设置环境变量]({{site.IMG_PATH}}/run-jekyll-on-windows-02.png)
▲Python 设置环境变量

在配置中启用

    highlighter: pygments

你也可以使用 Rouge，安装

    gem install rouge

在配置中启用

    highlighter: rouge

##安装 wdm（可选）

从 v2.4.0 开始，Jekyll 本地部署时，会相当于以前版本加 `--watch` 一样，监听其源文件的变化，而 Windows 似乎有时候并不会奏效，不过鄙人使用并没碰到。当然你若碰到，可安装 wdm (Windows Directory Monitor )来改善这个问题。

鄙人本不想安装，但运行 `jekyll s` 时，会有以下提醒

    Please add the following to your Gemfile to avoid polling for changes:   
      gem 'wdm', '>= 0.1.0' if Gem.win_platform?


于是强迫症发，只好安装

    gem install wdm

不过问题来了，wdm 死活安装不上，Google 了一下，据此 [Issus](https://github.com/Maher4Ever/wdm/issues/18)，大概是与 Ruby 版本兼容问题，这个分支 [HaiderRazvi/wdm](https://github.com/HaiderRazvi/wdm) 可以被装上

    git clone https://github.com/HaiderRazvi/wdm.git
    cd wdm
    gem build wdm.gemspec
    gem install wdm-0.1.0.gem

当然，关于 gem，你也可以通过 Bundler 来管理，在 `Gemfile` 文件中指定，具体可以看看[这篇文章](http://blog.leanote.com/post/551ab4c438f41114e80014af)。

**本文历史**

* 2015年05月26日 完成初稿
* 2015年05月27日 加入语法高亮
* 2015年06月03日 GitHub Pages Gem
