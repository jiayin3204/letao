// 在打开页面的时候就渲染出页面所以用加载事件
$(function () {

	var myScroll = new IScroll('#wrapper');
	mui('.mui-scroll-wrapper').scroll({
		scrollY: true, //是否竖向滚动
		scrollX: false, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: true, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
		bounce: true //是否启用回弹
	});

	// 获取id id是从地址栏中获取的
	var url = new URLSearchParams(location.search);
	var id = url.get("id");

	getProduct(id);

	// 选择尺码
	// 给点击的按钮添加样式
	$('.scroll').on('click', 'i', function () {
		$('.scroll i').removeClass('active');
		$(this).addClass('active');
	})

	// 获取数量

	if (!id) {
		mui.toast('没有商品');
		return false;
	}

	// 获取添加购物车按钮,传入id并添加
	$('.cart').live('click', function () {
		var id = $(this).attr('data-id');
		var num = mui(".mui-numbox").numbox().getValue();
		console.log(num);
		var size = $('.scroll .active').html();
		console.log(size);

		if (!id) {
			mui.toast('无商品');
			return false;
		}
		if (!num) {
			mui.toast('请选择数量');
			return false;
		}
		if (!size) {
			mui.toast('请选择尺码');
			return false;
		}
		getcart(id, size, num);
	})



})

// 获取后台数据
function getProduct(id) {
	$.ajax({
		type: 'get',
		url: '/product/queryProductDetail',
		data: {
			id: id
		},
		success: function (data) {
			console.log(data);
			var dataTemplate = template('productTemplate', data);
			$('.scroll').html(dataTemplate);

			// 获取尺码的模板  获取到字符串
			var size = data.size;
			// 截取字符串 获取到数组
			var sizeArr = size.split('-');
			// console.log(sizeArr);
			// 开始的尺码
			var start = sizeArr[0];
			var end = sizeArr[1];
			var sizeData = {
				start: start,
				end: end
			}
			var sizeTemplate = template('sizeTemplate', sizeData);
			$('.size').append(sizeTemplate);
			// 手动添加数字输入框的初始化
			mui(".mui-numbox").numbox();

			// 动态添加的元素在添加完成之后初始化
			var gallery = mui('.mui-slider');
			gallery.slider({
				interval: 0//自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
	});
}

function getcart(id, size, num) {
	$.ajax({
		type: 'post',
		url: '/cart/addCart',
		data: {
			id: id,
			size: size,
			num: num
		},
		success: function (data) {
			console.log(data);
			if (data.error == 400) {
				location.href = 'login.html?URL=' + location.href;
			}
			if (data.success = true) {
				location.href = './cart.html?id='+id+'&'+'size='+size+'$'+'num='+num;
			}
		}
	})
}


