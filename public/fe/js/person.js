$(function () {
	getPerson();
	// 点击退出登录
	$('.login').on('click',function(){
		loginout();
	})
})
function getPerson() {
	$.ajax({
		type: 'get',
		url: '/user/queryUserMessage',
		data: {},
		success: function (data) {
			console.log(data);
			if(data.error == 400){
				location.href = './login.html?URL='+location.href;
			}
			var personTemplate = template('personTemplate',data);
			$('.mui-media').html(personTemplate);
		}
	})
}

// 退出登录
function loginout(){
	$.ajax({
		type:'get',
		url:'/user/logout',
		data:{},
		success:function(data){
		if(data.success = true){
			location.href = './login.html?URL='+location.href;
		}
		}
	})
}