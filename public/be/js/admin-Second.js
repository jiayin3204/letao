$(function(){
    getSecondList();

    
    // 添加二级分类
    $('.modal-footer').on('click','.btn-primary',function(){
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:{
                brandName:brandName,
                categoryId:categoryId,
                brandLogo:brandLogo
            },
            success:function(data){
                console.log(data);
            }
        })
    })
})
// 二级分类列表展示
function getSecondList(page,pageSize){
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data: {
            page:page || 1,
            pageSize:pageSize || 5
        },
        success:function(data){
            console.log(data);
            var second_template = template('secondTemplate',data);
            $('tbody').html(second_template);

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

// 获取一级分类
function firstList(page,pageSize){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:page||1,
            pageSize:pageSize||5
        },
        success:function(data){
            console.log(data);
        }
    })
}

