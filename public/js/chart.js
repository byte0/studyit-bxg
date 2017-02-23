/*
    图表
*/
define(['jquery', 'echarts','st'], function ($,echarts) {
    // 设置导航
    // utils.setMenu('/');

    // 获取统计数据
    $.ajax({
        url: '/api/dashboard/',
        success: function (data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(data);
        }
    });

});