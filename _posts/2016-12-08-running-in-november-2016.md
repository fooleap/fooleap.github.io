---
layout: post
title: "11 月跑步笔记"
description: "11 月份，无疑是我跑步以来跑量最多的一个月，比破百的 10 月份还要高出 50 公里。配速也有一定的提高，总体的平均配速终于比 Nike+ 上我这个年龄段的跑者要快一些。"
date: 2016-12-08 08:17:00 +0800
category: life
tags: ["跑步", "潮汕"]
js: true
scripts: ["http://echarts.baidu.com/dist/echarts.common.min.js"]
---

11 月份，无疑是我跑步以来跑量最多的一个月，比破百的 10 月份还要高出 50 公里。配速也有一定的提高，总体的平均配速终于比 Nike+ 上我这个年龄段的跑者要快一些。

跑步这两个月来，大概瘦了有 6 斤左右，之前一直是 75 公斤，最近是 72 公斤上下，最明显的应该是肚子小了很多。前几天跟朋友出去聚餐，顺便到公园里逛逛，打篮球的同学们都说我瘦了。

因接近年底，工作比较忙，晚上时常加班，于是晨跑变得多了，夜跑变少了。天气转凉的月份里，跑步越来越舒服，到月末十几二十度左右的温度，有点风，跑步出汗后就没感觉到很热。天气凉了还有一点变化，早上是睡懒觉的好时间，到下旬总是自己一个人跑。

废话不多说，还是来看看数据吧，11 月份总共跑了 31 次，155 公里，平均配速比起上个月要提高一分多钟。


| 次数 | 总距离 | 总时间 | 平均时速 | 平均配速 | 总步数 | 总热量 |
|:----:|:------:|:------:|:--------:|:--------:|:------:|:------:|
|      |        |        |          |          |        |        |
|----
{: class="running-total" style="display:none"}

Nike+ 获取概览的 API 一次性限制在 30 次，所以下面的图表最后一天是没显示上去的，这个待解决。从图表中可以看到，有很多天都是 5 公里，在上个月，我跑步的标准长度就是 5 公里，5 公里配速最快则是 5 分钟 20 秒左右。我打算这个月把每次的标准跑量提高到 6 公里。

<div id="running" style="width:640px;height:427px;display: none"></div>

跑步最长距离则是[桂林线上半马](/guilin-marathon-online.html)，当天晚上还刷了个 3 公里。而最快配速则是有一天跑了 1 公里的疾速跑，配速是 4 分多钟，或许被 Nike+ 吃掉几秒，但还是感觉很慢，要是中学生的考试，那么这个速度是不及格的吧？我记得当年高考一千米跑步，我的成绩是 3 分 45 秒。

| 距离 | 时间 | 时速 | 配速 | 步数 | 热量 |
|:----:|:----:|:----:|:----:|:----:|:----:|
|      |      |      |      |      |      |
|----
{: class="running-max" style="display:none"}

下面跑步过程中拍的图。

11 月 2 日早晨，很神奇，东边日头已升起，西边却是厚重的乌云，估计乌云底下在下雨。

![阳光下的乌云]({{ site.IMG_PATH }}/running-in-november-2016-01.jpg_640)
阳光下的乌云

![当天上班路上在莲阳桥上往东边看]({{ site.IMG_PATH }}/running-in-november-2016-02.jpg_640)
当天上班路上在莲阳桥上往东边看

6 号早上跑去塔山，路过上巷小学，潮汕各地学校真是到处都能见吴南生[[1]][1]的提字，回来的路上见村里一工业区附近一大片荒地长满了草，想当年在这边踢过球。

![上巷小学]({{ site.IMG_PATH }}/running-in-november-2016-03.jpg_640)
上巷小学

![长满了杂草的荒地]({{ site.IMG_PATH }}/running-in-november-2016-04.jpg_640)
长满了杂草的荒地

14 号几乎是上个月空气质量最差的一天，一大早雾气特重，应该也夹着霾。当年在杭州，秋冬这是常态，很不适合晨跑。


![能见度极差的路上]({{ site.IMG_PATH }}/running-in-november-2016-05.jpg_640)
能见度极差的路上

![阳光已经升起的田园]({{ site.IMG_PATH }}/running-in-november-2016-06.jpg_640)
阳光已经升起的田园

11 月下旬，村里公园跑道铺塑胶工程开始，改造排水及铺水泥，

![跑道改造]({{ site.IMG_PATH }}/running-in-november-2016-07.jpg_640)
跑道改造


11 月底到最近，天空都还不错，蓝天白云的。

![11 月 29 日 湾中]({{ site.IMG_PATH }}/running-in-november-2016-08.jpg_640)
11 月 29 日 湾中

![11 月 30 日 东湾路]({{ site.IMG_PATH }}/running-in-november-2016-09.jpg_640)
11 月 30 日 东湾路

最近因工作忙，业余又多跑步，凿了好多坑都没时间填上，空了好多篇博文草稿。

## 参考资料

[1]: https://zh.wikipedia.org/wiki/%E5%90%B4%E5%8D%97%E7%94%9F "吴南生 - 维基百科"

**本文历史**

* 2016 年 12 月 08 日 完成初稿

<!--<script>
var runningChart = document.getElementById('running');
var mainWidth = document.querySelector('.main-content').offsetWidth;

if ( mainWidth < 640 ){
   runningChart.style.width = window.innerWidth + 'px';
   runningChart.style.height = window.innerWidth*2/3 + 'px';
}

var myChart = echarts.init(runningChart);
var colors = ['#D5FF45', '#4FA8F9', '#6EC71E', '#F56E6A', '#FFCE47', '#988772'];

function echart(edate, distance, duration, speed, pace, steps, cal) {
    option = {
        color: colors,

        tooltip: {
            trigger: 'axis',
            formatter: function(params, ticket, callback) {
                var res = '2016年11月' + params[0].name + '日<br>';
                for (var i = 0; i < params.length; i++) {
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + '：' + params[i].data.name + '<br/>';
                }
                return res;
            }
        },
        grid: {
            left: '30px',
            right: 0,
            top: '60px',
            bottom: '20px',
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        /*title: {
            text: '10月跑量',
            x: 'left'
        },*/
        legend: {
            selected: {
                '时速': false,
                '步数': false,
                '热量': false
            },
            x: 'center',
            y: 'top',
            data: ['距离', '步数', '时间', '时速', '配速',  '热量']
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: edate
        }],
        yAxis: [{
            type: 'value',
            name: '距离/公里',
            min: 0,
            max: 30,
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#000'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        }, {
            type: 'value',
            name: '时间',
            min: 0,
            max: 180,
            show: false,
            axisLine: {
                lineStyle: {
                    color: colors[1]
                }
            },
            axisLabel: {
                formatter: '{value}min'
            }
        }, {
            type: 'value',
            name: '时速',
            min: 0,
            max: 15,
            show: false,
            axisLine: {
                lineStyle: {
                    color: colors[2]
                }
            },
            axisLabel: {
                formatter: '{value}km'
            }
        }, {
            type: 'value',
            name: '配速',
            min: 0,
            max: 10,
            show: false,
            axisLine: {
                lineStyle: {
                    color: colors[3]
                }
            },
            axisLabel: {
                formatter: '{value}min/km'
            }
        }, {
            type: 'value',
            name: '步数',
            min: 0,
            max: 30000,
            show: false,
            axisLine: {
                lineStyle: {
                    color: colors[4]
                }
            },
            axisLabel: {
                formatter: '{value}steps'
            }
        }, {
            type: 'value',
            name: '热量',
            min: 0,
            max: 3000,
            show: false,
            axisLine: {
                lineStyle: {
                    color: colors[5]
                }
            },
            axisLabel: {
                formatter: '{value}cal'
            }
        }],
        series: [{
            name: '距离',
            type: 'bar',
            data: distance
        }, {
            name: '时间',
            type: 'line',
            yAxisIndex: 1,
            data: duration
        }, {
            name: '时速',
            type: 'line',
            yAxisIndex: 2,
            data: speed
        }, {
            name: '配速',
            type: 'line',
            yAxisIndex: 3,
            data: pace
        }, {
            name: '步数',
            type: 'bar',
            yAxisIndex: 4,
            data: steps
        }, {
            name: '热量',
            type: 'line',
            yAxisIndex: 5,
            data: cal
        }]
    };
    myChart.setOption(option);
}

var xhractivities = new XMLHttpRequest();
xhractivities.open('GET', 'http://api.fooleap.org/nike/activities?start=2016-11-01&end=2016-12-01', true);
xhractivities.send();
xhractivities.onreadystatechange = function() {
    if (xhractivities.readyState == 4 && xhractivities.status == 200) {
        var data = JSON.parse(xhractivities.responseText);
        var total = document.querySelectorAll('.running-total td');
        var duration = new Date(null);
        duration.setSeconds(data.aggregates.duration);
        var avgpace = new Date(null);
        avgpace.setSeconds(data.aggregates.pace * 60);
        total[0].innerHTML = data.aggregates.count;
        total[1].innerHTML = data.aggregates.distance.toFixed(2) + 'km';
        total[2].innerHTML = duration.toISOString().substr(11, 8);
        total[3].innerHTML = data.aggregates.speed.toFixed(2) + 'km';
        total[4].innerHTML = avgpace.getMinutes() + '\'' + avgpace.getSeconds() + '\"/km';
        total[5].innerHTML = data.aggregates.steps;
        total[6].innerHTML = parseInt(data.aggregates.calories);

        var max = document.querySelectorAll('.running-max td');
        var maxduration = new Date(null);
        maxduration.setSeconds(data.max.duration);
        var maxpace = new Date(null);
        maxpace.setSeconds(data.max.pace * 60);
        max[0].innerHTML = data.max.distance.toFixed(2) + 'km';
        max[1].innerHTML = maxduration.toISOString().substr(11, 8);
        max[2].innerHTML = data.max.speed.toFixed(2) + 'km';
        max[3].innerHTML = maxpace.getMinutes() + '\'' + maxpace.getSeconds() + '\"/km';
        max[4].innerHTML = data.max.steps;
        max[5].innerHTML = parseInt(data.max.calories);

        var act_date = data.output;
        var distance = [];
        var edate = [];
        var duration = [];
        var speed = [];
        var pace = [];
        var steps = [];
        var cal = [];
        for (var i = 0; i < act_date.length; i++) {
            edate[i] = {
                name: act_date[i],
                value: parseInt(act_date[i].slice(8))
            };
            distance[i] = {
                name: '无',
                value: 0
            };
            duration[i] = {
                name: '无',
                value: 0
            };
            speed[i] = {
                name: '无',
                value: 0
            };
            pace[i] = {
                name: '无',
                value: 0
            };
            steps[i] = {
                name: '无',
                value: 0
            };
            cal[i] = {
                name: '无',
                value: 0
            };
            for (var n = 0; n < data.activities.length; n++) {
                if (act_date[i] == data.activities[n].date) {
                    edate[i].value = parseInt(act_date[i].slice(8));
                    distance[i].value += parseFloat(data.activities[n].distance);
                    duration[i].value += parseFloat(data.activities[n].duration);
                    speed[i].value = speed[i].value == 0 ? data.activities[n].speed : (speed[i].value + parseFloat(data.activities[n].speed)) / 2;
                    pace[i].value = pace[i].value == 0 ? data.activities[n].pace : (pace[i].value + parseFloat(data.activities[n].pace)) / 2;
                    steps[i].value += data.activities[n].steps;
                    cal[i].value += data.activities[n].calories;
                    var date1 = new Date(null);
                    date1.setSeconds(duration[i].value * 60);
                    var date2 = new Date(null);
                    date2.setSeconds(pace[i].value * 60);

                    edate[i].name = act_date[i];
                    distance[i].name = distance[i].value + ' km';
                    duration[i].name = date1.toISOString().substr(11, 8);
                    speed[i].name = speed[i].value.toFixed(2) + ' km';
                    pace[i].name = date2.getMinutes() + '\'' + date2.getSeconds() + '\"' + '/km';
                    steps[i].name = steps[i].value + ' steps';
                    cal[i].name = cal[i].value + ' cal';

                }
            }
            duration[i].value = duration[i].value.toFixed(2);
            speed[i].value = speed[i].value.toFixed(2);
            pace[i].value = parseFloat(pace[i].value).toFixed(2);
        }
        echart(edate, distance, duration, speed, pace, steps, cal);
        document.querySelector('.running-total').style.display = '';
        document.querySelector('#running').style.display = '';
        document.querySelector('.running-max').style.display = '';
    }
}
</script>-->
