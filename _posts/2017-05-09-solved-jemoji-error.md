---
layout: post
title: "解决 Jemoji 的出错"
description: "最近在 macOS 上安装 Jekyll 后，运行总是提示 Jemoji 出错，折腾到今晚才算解决这个小问题，解决方法其实很简单，原因就是 Ruby 的版本问题。"
date: 2017-05-09 23:15:55+0800
category: tech
thumb: IMG_PATH/jekyll.png
tags: [Jekyll, Jemoji, Ruby]
---

* toc
{:toc}

最近在 macOS 上安装 Jekyll 后，运行总是提示 Jemoji 出错，折腾到今晚才算解决这个小问题，解决方法其实很简单，原因就是 Ruby 的版本问题。

## 出现问题

前几天入了一台 MBP，虽然是 15 年低配的，性能一般，但对我来说已经够用。

为了本地环境跟 GitHub Pages 一样，本地 Jekyll 我都是直接装上 `github-pages` 这个 Gem。在 macOS 上也不例外，可是装上运行即出错。我忘记了是什么出错信息，感觉理应是 Ruby 版本的问题，系统预装的 Ruby 版本比较低。

于是，我使用 rvm 安装 Ruby 的最新版本 `2.4.0`，并设置为默认版本。再次运行 Jekyll，抛出错误如下：

```
$ jekyll s
Configuration file: /Users/chenxilong/blog/_config.yml
Configuration file: /Users/chenxilong/blog/_config.yml
Dependency Error: Yikes! It looks like you don't have jemoji or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'Unable to activate activesupport-4.2.7, because json-2.0.2 conflicts with json (>= 1.7.7, ~> 1.7)' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
jekyll 3.4.3 | Error:  jemoji
```

Jemoji 出错，起初就想 Jemoji 也不常用，不用就行。


## 尝试过程

后来我还是不死心，就尝试解决这个问题。从上面的出错信息可看出与 `json` 版本有关，看看目前 `json` 是什么版本，查看 Gem 列表

```
$ gem list
...
json (default: 2.0.2, 1.8.6)
...
```

发现 `json` 这个 Gem 默认使用的是 `2.0.2` 这个版本，出错信息里面提及的应该是不能用这个版本，我尝试卸载：

```
$ gem uninstall json -v 2.0.2
ERROR:  While executing gem ... (Gem::InstallError)
    gem "json" cannot be uninstalled because it is a default gem
```

`2.0.2` 版本无法卸载，`1.8.6` 版本卸载却很轻松。

网上搜索，发现同病相怜之人不少，尤其是 Jemoji 项目里面的 Issus[[1]][1]，居然 Open 状态的前两条就是这个问题，可是我还是没找到解决方法。

我将目光转向 Jekyll 文档，发现眼熟的 `json` 出现在官方指示创建的 `Gemfile` 文件中[[2]][2]，根据提示配置好并安装，再运行。

出错如下：

```
$ jekyll s
/Users/chenxilong/.rvm/gems/ruby-2.4.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:40:in `block in setup': You have already activated json 2.0.2, but your Gemfile requires json 1.8.6. Prepending `bundle exec` to your command may solve this. (Gem::LoadError)
	...
```

更加确信是 `json` 的版本问题，我尝试强制卸载掉 `2.0.2` 版本，失败告终。

## 解决问题

就在这山穷水尽之时，我突然灵机一动，想明白了，会不会是 Ruby 的版本太新了？以前也有遇到过因 Ruby 版本太新导致运行 Jekyll 出错的问题。

果不其然，使用 rvm 安装上 `2.3.1` 版本后，切换至默认，再次运行 Jekyll 就没有出错了:joy::joy::joy:

此时，`json` 的默认版本是 `1.8.3`。

对了，Jemoji 是什么玩意？请查看——[Jekyll 的 emoji 插件](/jemoji.html)

## 参考资料

[1]: https://github.com/jekyll/jemoji/issues "Issues · jekyll/jemoji"
[2]: https://jekyllrb.com/docs/github-pages/#use-the-github-pages-gem "Use the github-pages gem"

**本文历史**

* 2017 年 05 月 09 日 完成初稿
