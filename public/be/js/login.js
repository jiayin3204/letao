$(function(){
    $('.login_in').click(function(){
        var formdata = $('.login-wrap').serialize();
        login(formdata)
    })
})
function login(formdata){
    $.ajax({
    type:'post',
    url:'/employee/employeeLogin',
    data:formdata,
    success:function(data){
        if(data.error == 1000){

        }
        if(data.success){
            location.href = 'index.html';
        }
    }
})
}
