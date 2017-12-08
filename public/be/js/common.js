// 获取面包按钮
// 点击按钮左边栏消失
$(".btn").click(function(){
    $(".nav").hide(300);
    $(this).click(function(){
        $(".nav").show(300);
    });
});
// 侧边栏
$(".leftsidebar_box dt").css({ "background-color": "#223233" });
$(".leftsidebar_box dt img").attr("src", "images/left/select_xl01.png");
$(function () {
    $(".leftsidebar_box dd").hide();
    $(".leftsidebar_box dt").click(function () {
        $(".leftsidebar_box dt").css({ "background-color": "#223233" })
        $(this).css({ "background-color": "#223233" });
        $(this).parent().find('dd').removeClass("menu_chioce");
        $(".leftsidebar_box dt img").attr("src", "images/left/select_xl01.png");
        $(this).parent().find('img').attr("src", "images/left/select_xl.png");
        $(".menu_chioce").slideUp();
        $(this).parent().find('dd').slideToggle();
        $(this).parent().find('dd').addClass("menu_chioce");
    });
})