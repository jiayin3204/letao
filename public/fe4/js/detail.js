$(function () {
  // 调用getProductDetail 需要参数id
  var url = new URLSearchParams(location.search);
  var id = url.get("id");
  // console.log(id);
  getProductDetail(id);
})

var getProductDetail = function (id) {
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    success: function (data) {
      // console.log(data);
      var productDetail = template('detail-template', data);
      $(".mui-content").html(productDetail);
      var size = data.size;//'40-50'
      // console.log(size);
      var sizeArr = size.split("-");// ["40","50"]
      // console.log(sizeArr);
      var start = sizeArr[0]; //40
      var end = sizeArr[1];//50
      var sizeData = {
        start: start,
        end: end
      }
      var sizeData = template("size-template", sizeData);
      $('.product-size').append(sizeData);
      // 轮播图
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
    }
  })
}