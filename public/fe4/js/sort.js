// 菜单区域滚动
var myScroll = new IScroll('#list-left');

// 一级菜单渲染
// 技术: 模板引擎 ajax 
// 思路: 1.当页面打开 是否能看到已经请求来的数据

// 步骤: 
// 1. 声明一个函数--不限次数的发起ajax请求
var getFirstCategory = function () {
  // 2. 发起ajax请求 获取数据--查看接口文档
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    data: {},
    success: function (data) {
      // console.log(data);
      // 3.  把数据渲染到页面上-- 模板引擎
      // 3.1 写模板(在html中)
      // 3.2 引入模板库(在html中)
      // 3.3 绑定数据
      var firstData = template('first-template', data);
      // 3.4 把绑定好的内容添加到ul中
      $('.list-left ul').html(firstData);

      // 功能: 当页面加载进来 就要去加载一级分类"运动馆"下的二级分类的内容
      //  1.获取一级分类的id  ==  data.rows[0].id
      var firstId = data.rows[0].id;
      // 2. 把一级分类的id 传参给getSecondCategory方法
      getSecondCategory(firstId);
    }
  })

}

getFirstCategory();

// 二级分类联动渲染
// 步骤: 
// 1.声明一个函数 原因是要随着用户的点击 去请求二级的分类
var getSecondCategory = function (id) {
  // 2.发起ajax请求 原因是为了把二级分类显示到页面上
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategory',
    data: {
      id: id
    },
    success: function (data) {
      console.log(data);
      // 3.调用模板引擎的方法 方便去渲染页面
      var secondData = template('second-template', data);
      // 4.把绑定好的数据插入到页面上
      $('.list-right').html(secondData);
    }
  })
}

// 点击一级分类 动态渲染二级分类
// 步骤:
// 1.获取元素注册事件(非常重要)
$('.list-left ul').on('click','a',function(){
  // 2.切换类名
  $('.list-left ul').find('a').removeClass('active');
  $(this).addClass('active')
  // 3.获取一级分类id
  var firstId = $(this).attr('data-id');
  // 4.调用getSecondCategory获取二级分类数据
  getSecondCategory(firstId);
})











