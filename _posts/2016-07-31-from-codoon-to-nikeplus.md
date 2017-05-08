---
layout: post
title: "将咕咚的数据导入到 Nike+"
description: "上篇文章说到运动 APP，Nike+ Running 是我目前正在使用的运动 APP，使用起来还算比较舒服，如果没特殊情况的话，我想不会更换成其他的。"
date: 2016-07-31 18:00:00 +0800
thumb: IMG_PATH/nikeplus.svg
category: tech
tags: ['Nike+', 咕咚, GPX ]
---

上篇文章说到运动 APP，Nike+ Running 是我目前正在使用的运动 APP，使用起来还算比较舒服，如果没特殊情况的话，我想不会更换成其他的。

那么在使用 Nike+ 之前的时间里，我用的咕咚运动的数据，能不能转移到 Nike+ 上面呢？答案是肯定的，只是麻烦些。

咕咚后台并没有提供数据导出的功能，但咕咚网提供有 API[[1]][1]，也就是说可以通过咕咚网 API，将自己的运动数据取下来。然而咕咚网提供的数据并不能直接导入 Nike+，也不能直接上传到任何可跟 Nike+ 同步的平台，例如 Garmin Connect[[2]][2]。

GPX 是一种基于 XML，通用于存储 GPS 数据的文件格式，可以用它来记录地点、轨迹、路径等等。支持同步到 Nike+ 的 Garmin Connect 支持 GPX 文件的导入，另外，通过一个第三方平台 Nike+ Converter & Uploader[[3]][3]，可直接将 GPX 格式文件导入到 Nike+。

那也就是说，只要能把咕咚的数据转换成 GPX 格式即可，这个过程需要造一个轮子，Google 一下，很庆幸，已经有人造好了。[[4]][4][[5]][5]

在近三年时间里，已经有些许变化，故应作修改。咕咚网的数据，iOS 版本跟 Android 版本并不完全相同。我的系统环境是 Windows 7 64 位版本，并已装 Python2。使用这个轮子，需要先使用 pip 安装几个依赖包。

    pip install datetime gpxpy lxml requests

对代码进行简单修改，`codoonurl.py` 文件中：

{% highlight python %}
#apiHost = "http://api.codoon.com/"
apiHost = "https://openapi.codoon.com/"
{% endhighlight %}

`codoon.py` 文件中：

{% highlight python %}
#from time import strptime 此包不存在，用以下代替
from datetime import datetime, timedelta
...
#tmptime = strptime( p["time_stamp"] , DATE_FORMAT ) 有两行，可用以下对应版本替换，因咕咚网的数据 iOS 版本时间还带三个小数位。另外，因时区问题先自减 8 个小时。
#Android
tmptime = datetime.strptime( p["time_stamp"] , DATE_FORMAT ) - timedelta(hours=8)
#iOS
tmptime = datetime.strptime( p["time_stamp"][:-5] , DATE_FORMAT ) - timedelta(hours=8)
#return gpx.to_xml() 默认的 1.0 版本无法导入 Nike+
return gpx.to_xml(version="1.1")
{% endhighlight %}

因为鄙人没有佳明表，也就不想通过访问速度并不快的 Garmin Connect 来同步，所以以上的修改都是针对导入 Nike+ 的。

怎么使用呢？只需在 `codoon.py` 里面填入咕咚的用户名及密码，将最后面的 routeId 替换成相应单次运动的 `route_id` ，运动即可获取该次运动的咕咚网数据及两个 GPX 文件，一个 route，一个 track，Nike+ Converter & Uploader 只支持 track。

那么问题来了，如何获取单次运动的 `route_id` 呢？可以打开咕咚网，点到该次运动，傻傻的打开 Developer Tools，在 NetWork 选项卡中刷新，你会发现的。

这明显比搬砖还要难受，太麻烦了。而这个工具已经有提供相应的功能，通过咕咚的 API 获取相应的数据。仅需取消 `codoon.py` 以下两行的注释，即可获取咕咚的运动数据列表，即每次运动数据的各种属性。

{% highlight python %}
routes = device.get_route_log( productId = imei )
device.saveJsonData( filename = "/route_log.json" , data = routes)
{% endhighlight %}

默认只能获取最新的一百次运动的数据。可修改上面定义函数的 `count`：

{% highlight python %}
def get_route_log(self , productId , count = 100 , excluded = "" , page = 1 , isPart = 1 ):
    command = codoonurl.getRouteLogUrl()
    request_data = {"product_id" : productId , "count" : count , "excluded" : excluded ,"page" : page , "is_part" : isPart }
    return self.excutePostRequst(command , data = request_data)
{% endhighlight %}

获取下来的数据中 `"sports_type" = 1` 的即表示跑步运动类型，再相应复制其 `route_id` 去获取数据即可。

是不是还是很麻烦？鄙人想也是，应该修改为全自动获取所有跑步运动的单次数据，并保存为各自的文件，即使是这样，也还得每个文件手动去导入到 Nike+。想要实现自动同步，看起来还挺有事做的。鄙人并不懂 Python，就不再继续折腾。

使用的过程中，我发现 iOS 记录的数据，转成 GPX 格式后，导入 Nike+ 竟然不显示其路径，但是能显示距离。查看其文件跟 Android 并无明显区别，唯一有区别的似乎只有海拨数据，iOS 记录的是整数，整体添加一个小数点上传依然不行，搞不明白索性就算。

## 参考资料

[1]: http://open.codoon.com/	"咕咚开放平台"
[2]: https://connect.garmin.com/	"Garmin Connect"
[3]: https://www.awsmithson.com/tcx2nikeplus/	"Nike+ Converter & Uploader"
[4]: http://www.wearable.pw/index.php/archives/332	"将Codoon的路径记录导出成GPX路径"
[5]: https://github.com/iascchen/VisHealth/	"iascchen / VisHealth"

**本文历史**

* 2016 年 07 月 31 日 完成初稿
