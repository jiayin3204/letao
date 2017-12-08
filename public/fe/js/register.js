$(function () {
	// 获取用户添加的信息
	$('.loginin').on('click', function () {
		// 获取所有的数据
		var formdata = $('.form').serialize();
		console.log(formdata);
		getregister(formdata);		
	})


})

// 注册
function getregister(data) {
	$.ajax({
		type: 'post',
		url: '/user/register',
		data:data,
		beforeSend:function(){
			// 验证用户名
			if($('[name="username"]').val() == ''){
				mui.toast('请输入用户名');
				return false;
			}
			// 验证手机号
			var reg = /^1[34578]\d{9}$/;
			if(reg.test($('[name="mobile"]').val())){
				mui.toast('请输入正确的手机号');
				return false;
			}
			// 验证密码
			if($('[name="password"]').val() == ''){
				mui.toast('请输入密码');
				return false;
			}
			// 验证验证码
			if($('[name="vCode"]').val() == ''){
				mui.toast('请输入验证码');
				return false;
			}
			// 验证新旧密码
			if($('[name="password"]').val() != $('[name="newpassword"]').val()){
				mui.toast('密码不一致');
				return false;
			}
		},
		success: function (data) {
			location.href = './login.html';
		}
	})
}
// 验证码
function getVcode(){
	$.ajax({
		type:'get',
		url:'/user/vCode',
		data:{},
		success:function(data){
			$('.p').val(data.vCode);
		}
	})
}
var flag = true;
$('.btn').click(function(){
	if(flag){
	var i = 60;
	flag = false;
	$('.text').css({"width":"40%"});
	$('.p').css('display','inline-block');
	$('.code').css('display','block');
	getVcode();
	$(this).html('60s');
		var timeId = setInterval(function(){
			i--;
			$('.btn').html(i+'s');
			if(i==0){
				clearInterval(timeId);
				$('.p').css('display','none');
				$('.text').css({"width":"70%"});
				$('.code').css('display','none');
				flag = true;
			}
		},1000);
	}
	
});