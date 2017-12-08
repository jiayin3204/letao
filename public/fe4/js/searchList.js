$(function () {
  // 传入参数 --在传入proname的时候 怎么来获取url里的参数
  // URLSearchParams();是一个内置对象 通过这个对象的方法可以获取到url中的参数
  var url = new URLSearchParams(location.search);
  var proname = url.get('key');
  // console.log(value);
  // 当页面进入的时候，要请求数据
  getSearchResult(1, 4, proname);

  // 1.当页面载入之后 要把搜索词 设置给 搜索输入框
  $('.search-box input').val(proname);
  var priceFlag = true;
  var numFlag = true;
  // 2.当点击价格按钮的时候 让该按钮变成红色 然后使得商品列表按照价格排序(降序 升序)--接下来的排序是商品整体排序
  $('.lt-order [data-type="price"]').on('click', function () {
    $(".lt-order a").removeClass('active');
    $(this).addClass('active');
    if (priceFlag) {
      // 降序
      getSearchResult(1, 10, proname, 2);
      priceFlag = false;
      $(this).find('span').removeClass("fa-angle-up");
      $(this).find('span').addClass("fa-angle-down");
    } else {
      // 升序
      getSearchResult(1, 10, proname, 1);
      priceFlag = true;
      $(this).find('span').addClass("fa-angle-up");
      $(this).find('span').removeClass("fa-angle-down");
    }

  })
  // 3.当点击销量按钮的时候 让该按钮变成红色 然后使得商品列表按照库存
  $('.lt-order [data-type="num"]').on('click', function () {

    $(".lt-order a").removeClass('active');
    $(this).addClass('active');
    if (priceFlag) {
      // 降序
      getSearchResult(1, 10, proname, null, 2);
      priceFlag = false;
      $(this).find('span').removeClass("fa-angle-up");
      $(this).find('span').addClass("fa-angle-down");
    } else {
      // 升序
      getSearchResult(1, 10, proname, null, 1);
      priceFlag = true;
      $(this).find('span').addClass("fa-angle-up");
      $(this).find('span').removeClass("fa-angle-down");
    }

  })
  // 4.当点击立即购买 跳转到商品详情页
  $(".lt-search-result").on("click","button",function(){
    var id = $(this).attr('data-id');
    location.href = "./detail.html?id="+id;
  })
})

var getSearchResult = function (pageNum, pagesize, proname, price, num, brandid) {


  // var url = location.search;
  // console.log(url);
  // getSearchResult(1,4,proname);
  // 发起ajax请求
  $.ajax({
    type: 'get',
    url: '/product/queryProduct',
    data: {
      page: pageNum || 1,
      pageSize: pagesize || 4,
      proName: proname || '',
      brandId: brandid || '',
      price: price || '',
      num: num || ''
    },
    success: function (data) {
      console.log(data);
      var searchResultList = template('result-template', data);
      $(".lt-search-result").html(searchResultList);
    }
  })
}