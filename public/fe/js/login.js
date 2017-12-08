// 获取拼接的用户名和密码



$('.login').on('click', function () {
	var formdata = $('.form').serialize();
	console.log(formdata);
	getlogin(formdata);
})

function getlogin(formdata) {
	$.ajax({
		type: 'post',
		url: '/user/login',
		data: formdata,
		success: function (data) {
			if (data.error == 403) {
				mui.toast(data.message);
			}
			var loginUrl = new URLSearchParams(location.search);
			var url = loginUrl.get('URL');
			console.log(url);
			location.href = url || './index.html';
		}
	});
}
