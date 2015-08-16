---
layout: post
title: Disqus 和多说在 Jekyll 的恩怨情仇 
description: "介绍 Disqus 的缺点，以及怎么从 Disqus 迁移到多说，顺便使多说异步加载。"
category: tech
tags: [多说, Jekyll, Disqus, JavaScript]
---

* toc
{:toc}

## Disqus 的缺点

自从使用 Jekyll 以来，一直使用 Disqus 作为评论系统，作为社会化评论系统的鼻祖，无论是用户量还是使用体验，Disqus 都是一级棒的，具体就不多说，毕竟这篇文章也并不是为了介绍 Disqus。

可是在特色社会的我国，Disqus 也有一些缺点：

* 访问慢，有被墙的风险，这点不说也心知肚明，如浙江移动就无法访问 http://a.disquscdn.com
* 允许使用的第三方登录都是要上梯的网站，比如 Facebook、Google、Twitter，国内网友除了一小部分爬墙好手外，访问困难

可以看出基本上就是网络的问题，所以鄙人也将 Disqus 弄成点击加载，而不是打开页面就立即加载。

## Disqus 迁移到多说

那么国内的替代品是什么呢？友言，畅言？虽然有时候不是很稳定，但广受好评的还数多说。然而，从 WordPress 迁移到 Jekyll 已经有几年的“寒舍”，迁移成本并不低，正常迁移有那么几个步骤。

1. 将 Disqus 的评论导出
2. 将 Disqus 的 XML 文件转换为多说使用的 JSON 文件
3. 导入多说后台并部署代码

几步骤中比较头疼的恐怕就是转换导出文件，在 GitHub 上很容易找到别人造的轮子，例如 [GavinFoo/DISQUS2DUOSHUO](https://github.com/GavinFoo/DISQUS2DUOSHUO)。

![多说的文章管理]({{site.IMG_PATH}}/talk-about-duoshuo-01.png)
▲多说的文章管理

转换后导入，多说后台的文章管理中，可以看到比较“迷茫”的 `Thread Key`，看起来并不美观，而看了多说在 [文档](http://dev.duoshuo.com/docs/5003ecd94cab3e7250000008/){:title="评论框调用代码参数说明"} 里也说 `data-thread-key` 是文章的唯一标识，要正确的显示当前页的评论靠的是这个参数。

在 Jekyll 中，据 [Jekyll 文档](http://jekyllrb.com/docs/variables/){:title="Variables - Jekyll"} 页面 ID 可以用 `page.id` 这个变量，意味着在多说中原来的 `Thread Key` 便要一个一个改过，可以从后台改，也可以从后台导出文章数据后编辑完再导入，显然后者效率较高，倘若文章较多，恐怕手动修改是不可取的（太费时间）。

修改后如下：

![修改后的 Thread Key]({{site.IMG_PATH}}/talk-about-duoshuo-02.png)
▲修改后的 `Thread Key`


到这里，在 Jekyll 中部署多说就很方便了，仅需根据多说官方的代码，配合以 Jekyll 的变量即可轻松解决。

{% highlight html %}
<div class="ds-thread" data-thread-key="{{"{{ page.id "}}}}"  data-title="{{"{{ page.title "}}}} | {{"{{ site.title "}}}}" data-url="{{"{{ site.url "}}}}{{"{{ page.url "}}}}"></div>
<script>var duoshuoQuery = {short_name:"fooleap"};</script>
<script src="http://static.duoshuo.com/embed.js"></script>
{% endhighlight %}

这里注意 Jekyll 的配置文件里有设置 `title`、`url` 才可使用 `site.title`、`site.url` 变量。

## 异步加载多说评论

那么，如何将多说做成点击再加载呢？官方亦给出了文档，详细可摸 [动态加载多说评论框的方法](http://dev.duoshuo.com/docs/50b344447f32d30066000147){:title="动态加载多说评论框的方法 - 多说开发者中心"}。Jekyll 又该如何做呢？根据官方的代码填鸭之后如下。

1、加载多说基础代码，跟上面一样。

{% highlight html %}
<script>var duoshuoQuery = {short_name:"fooleap"};</script>
<script src="http://static.duoshuo.com/embed.js"></script>
{% endhighlight %}

2、使用 JS 编写一个加载评论的函数。

{% highlight javascript %}
function toggleDuoshuoComments(container){
    var el = document.createElement('div');
    el.setAttribute('data-thread-key', location.pathname.split(/\./)[0]);
    el.setAttribute('data-url', location.href );
    el.setAttribute('data-author-key', 'fooleap');
    DUOSHUO.EmbedThread(el);
    jQuery(container).append(el);
}
{% endhighlight %}

这里采用 `location.pathname.split(/\./)[0]` 获取和 Jekyll 的 `page.id` 变量一样的字符串，`location.href` 则是页面 URL。

3、添加一个可以按的按钮。

{% highlight html %}
<a href="javascript:void(0);" onclick="toggleDuoshuoComments('#comment-box');">展开评论</a>
<div id="comment-box" ></div>
{% endhighlight %}

到这里就差不多了，可以参考 [这篇文章](http://liam0205.me/2014/07/22/duoshuo-delay/){:title="异步加载多说评论框以加快页面访问速度 - 始终"} 将参数的获取改成采用 Jekyll 的变量，将按钮定制成可开关式的。

然而鄙人并没有将 Disqus 换成多说，这是为什么呢？因为原来的评论嵌套导入到多说后乱了，可能是转换过程中出错。


## 参考资料

* [Variables - Jekyll](http://jekyllrb.com/docs/variables/)
* [动态加载多说评论框的方法 - 多说开发者中心](http://dev.duoshuo.com/docs/50b344447f32d30066000147)

**本文历史**

* 2015 年 08 月 01 日 完成初稿
