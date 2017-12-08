var myScroll = new IScroll('#wrapper');
mui('.mui-scroll-wrapper').scroll({
	scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});

// 请求后台数据
// 定义函数
function first() {
	// 发送ajax请求
	$.ajax({
		url: '/category/queryTopCategory',
		type: 'get',
		data: {},
		success: function (data) {
			// 绑定数据
			var firsttemplate = template("first_Template", data);

			// 将数据追加到ul中
			$(".left ul").html(firsttemplate);

			// 获取默认的二级分类的id
			var firstId = data.rows[0].id;
			second(firstId);
		}
	})
}
first();

// 二级分类渲染
// 首先声明函数
function second(id) {
	// 发送ajax请求
	$.ajax({
		type: 'get',
		url: '/category/querySecondCategory',
		data: {
			id: id
		},
		success: function (data) {
			console.log(data);
			var secondData = template("second_Template", data);
			$('.right').html(secondData);
		}
	});
}
// 点击a切换active类名
$('.left ul').on('click', 'a', function () {
	// console.log(1);
	$('.left ul').find("a").removeClass('active');
	$(this).addClass('active');
	// 获取一级的id
	var firstId = $(this).attr('data-id');
	second(firstId);
})

