---
layout: post
title: "11 月跑步笔记"
description: ""
date: 2016-12-01 18:00:00 +0800
category: life
tags: ["跑步", "潮汕"]
js: true
scripts: ["http://echarts.baidu.com/dist/echarts.common.min.js"]
---

11 月份，无疑是我跑步以来跑量最多的一个月，比破百的 10 月份还要高出 50 公里。配速也有一定的提高，总体的平均配速终于比 Nike+ 上我这个年龄段的跑者要快一些。

因接近年底，工作比较忙，晚上时常加班，于是晨跑变得多了，夜跑变少了。天气转凉的月份里，跑步越来越舒服，到月末十几二十度左右的温度，有点风，跑步出汗后就没感觉到很热。天气凉了还有一点变化，早上是睡觉的好时间，到下旬总是自己一个人跑。


| 次数 | 总距离 | 总时间 | 平均时速 | 平均配速 | 总步数 | 总热量 |
|:----:|:------:|:------:|:--------:|:--------:|:------:|:------:|
|      |        |        |          |          |        |        |
|----
{: class="running-total" style="display:none"}

<div id="running" style="width:640px;height:427px;display: none"></div>


| 距离 | 时间 | 时速 | 配速 | 步数 | 热量 |
|:----:|:----:|:----:|:----:|:----:|:----:|
|      |      |      |      |      |      |
|----
{: class="running-max" style="display:none"}

**本文历史**

* 2016 年 11 月 01 日 完成初稿

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
                var res = '2016年10月' + params[0].name + '日<br>';
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
