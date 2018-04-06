---
layout: post
title: 使用 Python 合并地图瓦片
date: 2018-04-06 18:34:57+0800
category: tech
thumb: IMG_PATH/python.svg
tags: [Python, 瓦片, 天地图]
---

前文提到了[合并瓦片图](/merge-tiles-with-python.html)，而瓦片图应用比较多的则是瓦片地图。对地图本就感兴趣的我，也想试试合并互联网地图的某个范围内的地图图层。

随着技术的发展，国内的地图服务商相继将地图瓦片更新为矢量瓦片[[1]][1]，这下想取到相应的瓦片图，我感觉没那么简单。那还是找个相对简单的，还使用栅格瓦片的地图服务网站来试试。

我先想到的是国字号的“天地图”，天地图·广东[[2]][2]还在使用栅格瓦片，其地图放大到一定级别时，可以看到水域及建筑物图层等。

广东的天地图比起江浙等省份的还是差一大截，精确度也有待提高。不过观察对比后发现，澄海这边的图层也还是要比高德、百度等地图要细腻一些，如图是莲下镇的一部分，有些大巷子都能体现。

![莲下部分区域][p1]

查看请求可知其瓦片图的规则如下：

    http://services.tianditugd.com/gdvec2014/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GDVEC2014&STYLE=GDVEC2014&TILEMATRIXSET=Matrix_0&TILEMATRIX=17&TILEROW={row}&TILECOL={col}&FORMAT=image%2Ftile

其中 `{row}` 和 `{col}`，分别为行和列，也就可以说对应的是 y 和 x。因按链接下载到的文件名不规则，故每张图需另存为有规则的文件名，aria2 很好解决，只需加个参数即可。下面取的是接近澄海区域内，放大级别为 17 的地图瓦片。

```python
#!/usr/bin/env python
output =''
r = 24170
while (r <= 24255):
    c = 108020
    while (c <= 108100 ):
        output += 'http://services.tianditugd.com/gdvec2014/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GDVEC2014&STYLE=GDVEC2014&TILEMATRIXSET=Matrix_0&TILEMATRIX=17&TILEROW='+str(r)+'&TILECOL='+str(c)+'&FORMAT=image%2Ftile\n  out='+str(c)+'_'+str(r)+'.jpg\n'
        c += 1
    r += 1

file = open('tiles.txt', 'w')
file.write(output)
file.close()
```

合并时，和上篇差不多，或许是数字比较大，到后面排序乱了，再进行一次排序后正常。代码如下：

```python
#!/usr/bin/env python
import glob
import re
from PIL import Image

files = glob.glob('./*_*.jpg') 
files.sort(key=lambda x: tuple(int(i) for i in re.findall('\d+', x)[:2]))

imagefiles = {}
for item in files:
    match = re.search(r'\d+', item)
    pre = int(match.group())
    if not imagefiles.get(pre):
        imagefiles[pre] = []
    imagefiles[pre].append(item)

imagefiles = sorted(zip(imagefiles.keys(),imagefiles.values()));

total_width = len(imagefiles) * 256
total_height = len(imagefiles[0][1]) * 256

new_image = Image.new('RGB', (total_width, total_height))

x_offset = 0
for item in imagefiles:
    y_offset = 0
    images = map(Image.open, item[1])
    for subitem in images:
        new_image.paste(subitem, (x_offset, y_offset))
        y_offset += subitem.size[0]
    x_offset += images[0].size[0]

new_image.save('merge.jpg', quality = 90)
```

下面是经缩小后的地图，原图长宽各两万多像素， 40 多兆。

![包含建筑物、水域等图层的澄海地图底图][p2]

对了，它的底图跟地名图层是分开的，且并非所有底图瓦片都有对应的地名瓦片，等哪时闲了再折腾。

## 参考资料

[1]: https://github.com/RLwu/GIS/wiki/%E5%9C%B0%E5%9B%BE%E7%93%A6%E7%89%87%E6%95%B4%E4%BD%93%E4%BB%8B%E7%BB%8D "地图瓦片整体介绍"
[2]: http://www.tianditugd.com/map/page/index.html "天地图·广东"

**本文历史**

* 2018 年 04 月 06 日 完成初稿

[p1]: {{ site.IMG_PATH }}/merge-webmap-tiles-with-python-01.png_640 "莲下部分区域"
[p2]: {{ site.IMG_PATH }}/merge-webmap-tiles-with-python-01.jpg?imageView2/2/w/960 "包含建筑物、水域等图层的澄海地图底图"
