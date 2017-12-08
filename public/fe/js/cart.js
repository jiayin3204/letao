$(function () {
	// var myScroll = new IScroll('#wrapper');
	mui('#wrapper').scroll({
		scrollY: true, //是否竖向滚动
		scrollX: false, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: true, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
		bounce: true //是否启用回弹
	});


	// 获取在地址栏传来的数据
	var url = new URLSearchParams(location.search);
	var id = url.get('id');
	getCart();

	// 删除购物车
	$('.content').on('click', '.mui-btn-red', function () {
		var id = $(this).attr('data-id');
		delCart(id);
		getCart();
		window.location.reload();
	})
	// 编辑购物车
	$('.content').on('click', '.mui-btn-blue', function () {

	})
})

function getCart() {
	$.ajax({
		type: 'get',
		url: '/cart/queryCart',
		data: {},
		success: function (data) {
			console.log(data);
			if (data.error == 400) {
				location.href = 'login.html?URL=' + location.href;
			}
			var cartTemplates = template('cartTemplate', { list: data });
			$('.content ul').html(cartTemplates);
		}
	});
}

// 删除购物车
function delCart(id) {
	$.ajax({
		type: 'get',
		url: '/cart/deleteCart',
		data: {
			id: id
		},
		success: function (data) {
			console.log(data);
		}
	})
}

// 修改购物车
function updataCart(id, size, num) {
	$.ajax({
		type: 'post',
		url: "/cart/updateCart",
		data: {
			id: id,
			size: size,
			num: num
		},
		success: function (data) {
			console.log(data);
		}
	})
}