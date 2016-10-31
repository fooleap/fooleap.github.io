---
layout: post
title: "月跑量再次破百"
description: "在即将过去的这个月，我的跑量再次突破 100 公里，上次跑量破百，似乎要追溯到刚失恋不久的 2012 年 9 月份，跑步治疗失恋，这似乎是阿甘里面的桥段。当然，我这次跑量再破一百，并非又失恋。"
date: 2016-10-31 18:30:00+0800
category: life
tags: ["跑步", "日出"]
js: true
scripts: ["http://echarts.baidu.com/dist/echarts.common.min.js"]
---

在即将过去的这个月，我的跑量再次突破 100 公里，上次跑量破百，似乎要追溯到[刚失恋不久的 2012 年 9 月份](/running-notes-in-september.html)，跑步治疗失恋，这似乎是《阿甘正传》里面的桥段。当然，我这次月跑量再破一百，并非又失恋。

| 次数 | 总距离 | 总时间 | 平均速度 | 平均配速 | 总步数 | 总热量 |
|:----:|:------:|:------:|:--------:|:--------:|:------:|:------:|
|      |        |        |          |          |        |        |
|----
{: class="running-total" style="display:none"}

<div id="running" style="width:640px;height:427px;"></div>

<!--<script>
var myChart = echarts.init(document.getElementById('running'));

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
                '速度': false,
                '步数': false,
                '热量': false
            },
            x: 'center',
            y: 'top',
            data: ['距离', '步数', '时间', '速度', '配速',  '热量']
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
            max: 10,
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
            max: 60,
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
            name: '速度',
            min: 0,
            max: 15,
            show: false,
            axisLine: {
                lineStyle: {
                    color: colors[2]
                }
            },
            axisLabel: {
                formatter: '{value}km/h'
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
            max: 10000,
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
            max: 1000,
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
            name: '速度',
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
xhractivities.open('GET', 'http://api.fooleap.org/nike/activities?start=2016-10-01&end=2016-11-01', true);
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
        total[1].innerHTML = data.aggregates.distance.toFixed(2);
        total[2].innerHTML = duration.toISOString().substr(11, 8);
        total[3].innerHTML = data.aggregates.speed.toFixed(2);
        total[4].innerHTML = avgpace.getMinutes() + '\'' + avgpace.getSeconds() + '\"';
        total[5].innerHTML = data.aggregates.steps;
        total[6].innerHTML = parseInt(data.aggregates.calories);
        document.querySelector('.running-total').style.display = '';

        var act_date = data.output;
        var distance = [];
        var edate = [];
        var duration = [];
        var speed = [];
        var pace = [];
        var steps = [];
        var cal = [];
        for (var i = 0; i < act_date.length; i++) {
            edate[i] = {};
            distance[i] = {};
            duration[i] = {};
            speed[i] = {};
            pace[i] = {};
            steps[i] = {};
            cal[i] = {};
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
                    duration[i].name = date1.getMinutes() + '\'' + date1.getSeconds() + '\"';
                    speed[i].name = speed[i].value.toFixed(2) + ' km/h';
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
    }
}
</script>-->