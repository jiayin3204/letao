// 基于准备好的dom，初始化echarts实例   柱状图
var myChartfang = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
    title:{
        text:'2017年注册人数'
    },
    tooltip: {},
    legend: {
        data: ['人数']
    },
    xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    color:['#666'],
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [2000, 2500, 3060, 1050, 1500, 2300],
        barWidth:40
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChartfang.setOption(option);

var myChartbing = echarts.init(document.getElementById('bing'));
// 饼图
options = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['nike','adidas','361','乔丹','李宁'],
    },
    color : ['skyblue','yellowgreen','greenyellow','#ccc','pink'],
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '60%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'nike'},
                {value:310, name:'adidas'},
                {value:234, name:'361'},
                {value:235, name:'乔丹'},
                {value:548, name:'李宁'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChartbing.setOption(options);