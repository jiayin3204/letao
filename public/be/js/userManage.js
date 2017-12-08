$(function () {
	userManage(1, 5);
	// 点击启用和禁用按钮
	$('tbody').on('click','a',function(){
		var id = $(this).attr('data-id');
		var isDelete = $(this).hasClass('danger')?1:0;
		danger(id,isDelete);
		userManage(1,5);
	})

})

// 页面展示
function userManage(page, pageSize) {
	$.ajax({
		type: 'get',
		url: '/user/queryUser',
		data: {
			page: page,
			pageSize: pageSize
		},
		success: function (data) {
			// console.log(data);
			var userTemplate = template('user_template', data);
			$('tbody').html(userTemplate);
			// 分页
			var options = {
				bootstrapMajorVersion: 1,    //版本
				currentPage: data.page,    //当前页数
				numberOfPages: 10,    //最多显示Page页
				totalPages: Math.ceil(data.total / data.size),    //所有数据可以显示的页数
				onPageClicked: function (e, originalEvent, type, page) {
				}
			}
			$("#page").bootstrapPaginator(options);
		}
	})
}
// 启用与禁用
function danger(id,isDelete){
	$.ajax({
		type:'post',
		url:'/user/updateUser',
		data:{
			id:id,
			isDelete:isDelete
		},
		success:function(data){
			
		}
	})
}