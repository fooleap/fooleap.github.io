---
layout: post
title: 使用 Python 合并瓦片图
date: 2018-04-01 17:49:48+0800
category: tech
thumb: IMG_PATH/python.svg
tags: [Python, OpenSeadragon, 瓦片, 地图]
---

高分辨率图片由于体积过大，并不适合直接在浏览器等直接查看，于是就有了瓦片图。一张大图往往是使用很多瓦片组成，最常碰到的莫过于各种 Web 地图。

OpenSeadragon 是一个可以实现在 Web 轻松浏览高分辨率图片的 JS 库，有不少展示艺术品图像或摄影欣赏的网站使用[[1]][1]。前几天，碰到一个网站便是使用这个强大的库，想看的图片并没有提供原图下载，在线查看最大分辨率图片感觉挺大的，就想弄下来看看。

## 下载瓦片图

简单研究了下，OpenSeadragon 就跟地图一样，大图也是由很多相同分辨率的小图所组成的。若想要扒一张大图下来，也就是得把所有小图都下下来，然后再进行合并操作。

瓦片图下载是个问题，图片放大到最大级别。浏览器按 F12，一看瓦片图资源的命名方式，感觉还是不难的。`3_2.jpg`、`15_6.jpg`，看这样的文件名，可推断出第一个数字可能是横坐标，第二个数字是纵坐标，即 `x_y.jpg` 的命名方式，再看瓦片图的分辨率。只要再知道最大图的分辨率，便可以把所有瓦片图的链接都弄出来。

下面以 OpenSeadragon 官网[[2]][2]的示例图为例，把瓦片图扒下来。在 F12 工具里面，可以很方便的找到上面三个参数，瓦片图前缀、瓦片图分辨率及图片原分辨率。

![瓦片图前缀、瓦片图分辨率及图片原分辨率][p1]

顺便直接写段脚本把所有瓦片图链接保存起来。

```javascript
function downloadTiles(width, height, prefix) {
    var x = parseInt(width / 256 + 1);
    var y = parseInt(height / 256 + 1);
    var output = '';
    for(var i = 0; i < x; i++){
        for(var j = 0; j < y; j++){
            output += (prefix + i + '_' + j + '.jpg\n');
        }
    }
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    element.setAttribute('download', 'tiles.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
downloadTiles(13920, 10200, 'https://openseadragon.github.io/example-images/duomo/duomo_files/14/')
```

再之后，使用 aria2 便可快速下载。

    aria2c -i tiles.txt

两千多张瓦片图，不是个小数目啊！那应该如何把瓦片图合并呢？

## 合并瓦片图

想到合并图片，我最先想到的是 Python，虽然我还没有写过。一番挣扎之后，合并的脚本也有了，写上些注释，废话就不多说了。

```python
#!/usr/bin/env python
#coding=utf-8
import glob
import re
from PIL import Image

# 列出所在目录下所有 JPG 图片，并按 x_y.jpg 先 x 后 y 序数排序。
files = glob.glob('./*_*.jpg') 
files.sort(key=lambda x: tuple(int(i) for i in re.findall('\d+', x)[:2]))

# 创建字典 {0:{'./0_0.jpg','./0_1.jpg'...}, 1:{'./1_0.jpg','./1_1.jpg'...}}
imagefiles = {}
for item in files:
    match = re.search(r'\d+', item)
    pre = int(match.group())
    if not imagefiles.get(pre):
        imagefiles[pre] = []
    imagefiles[pre].append(item)

# 原图片宽高，每张瓦片图都是 256 * 256，就不多费事
total_width = len(imagefiles) * 256
total_height = len(imagefiles[0]) * 256

# 创建原分辨率的空白图片
new_image = Image.new('RGB', ( total_width,total_height ))

# 按列依次粘贴进刚创建的图片
x_offset = 0
for item in imagefiles:
    y_offset = 0
    images = map(Image.open, imagefiles[item])
    for subitem in images:
        new_image.paste(subitem, (x_offset, y_offset))
        y_offset += subitem.size[0]
    x_offset += images[0].size[0]

# 保存图片
new_image.save('merge.jpg', quality = 90)
```

## 参考资料

[1]: https://openseadragon.github.io/examples/in-the-wild/ "OpenSeadragon in the Wild"
[2]: https://openseadragon.github.io/ "OpenSeadragon"

**本文历史**

* 2018 年 04 月 01 日 完成初稿

[p1]: {{ site.IMG_PATH }}/merge-tiles-with-python-01.png "瓦片图前缀、瓦片图分辨率及图片原分辨率"
