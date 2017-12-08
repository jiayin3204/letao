$(function () {
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


	// 获取地址栏里key的值,在search页面传过来的值
	var url = new URLSearchParams(location.search);
	var value = url.get("key");
	console.log(url);
	getItemList();

	// 搜索栏显示传过来的key
	$(".search-box input").val(value);

	// 点击价格升序降序  字体变色
	var priceFlag = true;
	$('.lt-order [data-type="price"]').on('click', function () {
		$('.lt-order a').removeClass('active');
		$(this).addClass('active');
		if (priceFlag) {
			getItemList(1, 4, value, 2);
			priceFlag = false;
			$(this).children('span').removeClass('fa-angle-down');
			$(this).children('span').addClass('fa-angle-up');
		} else {
			getItemList(1, 4, value, 1);
			priceFlag = true;
			$(this).children('span').removeClass('fa-angle-up');
			$(this).children('span').addClass('fa-angle-down');

		}
	})
	// 点击销量排序
	var numFlag = true;
	$('.lt-order [data-type="num"]').on('click', function () {
		$('.lt-order a').removeClass('active');
		$(this).addClass('active');
		if (numFlag) {
			getItemList(1, 4, value, null,2);
			numFlag = false;
			$(this).find('span').removeClass('fa-angle-down');
			$(this).find('span').addClass('fa-angle-up');
		} else {
			getItemList(1, 4, value, null,1);
			numFlag = true;
			$(this).find('span').removeClass('fa-angle-up');
			$(this).find('span').addClass('fa-angle-down');

		}

	})


	// 获取到id然后根据id跳转到详情页
	$('.item').live('click',function(){
		var id = $(this).attr('data-id');
		location.href = './product.html?id='+id;
	});
})

// 获取列表展示
function getItemList(page, pagesize, value, price, num, brandid) {

	$.ajax({
		type: 'get',
		url: '/product/queryProduct',
		data: {
			proName: value || '',
			brandId: brandid || 1,
			price: price || '',
			num: num || '',
			page: page || 1,
			pageSize: pagesize || 4
		},
		success: function (data) {
			console.log(data);
			var dataTemplate = template('listTemplate', data);
			$('.lt-search-result').html(dataTemplate);
		}
	});
}
