---
layout: post
title: "使用 Disqus API 上传图片"
date: 2017-08-08 17:02:33+0800
thumb: IMG_PATH/disqus.svg
category: tech
tags: ["Disqus", "Disqus API", "PHP"]
---

现 Disqus 上传图片 API，较之前有明显的区别。现在的传图姿势，配合发表评论 API，即便是匿名评论者，也可实现插图。

此前 Disqus 评论框还能正常加载，也就没研究过 Disqus 的插图，故图片如何被上传、发表评论时如何携带图片已不得而知，可以确定的是跟现在不一样。

## Disqus 上传图片 API

为了完善评论框，本想使用七牛 API 实现上传图片功能。在此之前，研究了下 Disqus 的插图方式，对比了以前评论的内容及图片 URL，发现有相当明显的区别。

经鄙人测试，目前，Disqus 原生评论框的传图流程大概是这样的：

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: POST 请求上传图片
op2=>operation: GET 请求文件详情
cond1=>condition: 文件是否符合
cond2=>condition: 身份通过验证
io1=>inputoutput: 返回出错信息
io2=>inputoutput: 返回数据
io3=>inputoutput: 返回数据页面显示

st->op1->cond1
cond1(no,right)->e
cond1(yes,down)->cond2
cond2(no,right)->io1->e
cond2(yes,down)->io2->op2(right)->io3(right)->e
```

Disqus 上传图片 API 是 `https://uploads.services.disqus.com/api/3.0/media/create.json`，具体情况如下：

* 文件的类型及大小限制：JPEG, PNG or GIF and under 5MB
* 需要鉴权
* 除了文件`upload`，还传了另一个参数 `permanent`，`1`为永久，`0` 为临时（一周？）

Disqus 获取图片详情的 API 为`https://disqus.com/api/3.0/media/details.json`，目前感觉没什么作用，可以忽略。

图片上传成功后，Disqus 做了如下的操作：

1. 上传成功后，将图片地址直接放到文本框，也就是评论内容
2. 评论发表时，评论内容作为 `message` 参数提交
3. 评论发表后，Disqus 会自动识别图片并放进 `media`，可在评论列表中显示成图片

可以理解为传图跟插图是分开的，只要在发表评论时带上图片地址即可。

大致了解这个过程之后的，我尝试把七牛上的图片地址放进 `message`，看看会不会自动识别成图片，结果可想而知。经过尝试，发现只有少数 Disqus 家前缀的图片地址会生效。

## 示例代码

或许上面讲得太乱，用代码来解释更加合适。在登录状态下，将以下 HTML 放入 Disqus 网站合适地方，并执行 JS 代码。

```html
<p>
    <label>文件上传：</label>
    <input type="file" name="upload" id="file" required />
</p>
<p>
    <label>存储时限：</label>
    <input type="radio" name="permanent" value="1" checked /><label>永久</label>
    <input type="radio" name="permanent" value="0" /><label>临时</label>
</p>
<p>
    <button id="submit">上传图片</button>
</p>
```

```js
document.getElementById('submit').addEventListener('click', function() {

    var file = document.getElementById('file');
    var permanent = document.querySelector('input[name="permanent"]:checked');
    var formdata = new FormData();
    formdata.append('upload', file.files[0]);
    formdata.append('permanent', parseInt(permanent.value));
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://uploads.services.disqus.com/api/3.0/media/create.json?api_key=E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F', true);
    xhr.withCredentials = true;
    xhr.onload = function() {
        if(xhr.status == 200){
            alert('上传成功！');
            console.log(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(formdata);

}, false);
```

有了这个 API，自制评论框就有了很多可能。可做成直接粘贴网址提交上传图片，或传完图片再 Fetch 到七牛等等。

**本文历史**

* 2017 年 08 月 08 日 完成初稿
