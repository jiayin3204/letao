$(function(){
    historyList();

// 点击搜索的时候,保存历史记录
$('.search').on('click','button',function(){
    var value = $('#search_input').val();
    saveHistory(value);
})
// 点击清空记录的时候清空所有的本地记录
$('#clear-all').live('click',function(){
    localStorage.clear();
    historyList();
});


// 点击删除按钮删除记录
$('.copy').on('click','i',function(){
    console.log(111);
    delHistory($(this).siblings('span').html());
    historyList();
    window.location.reload();
});

// 点击搜索按钮跳转页面
$(".search").on('click','button',function(){
    location.href ='./searchList.html?key='+$(this).siblings('input').val();
    $(this).siblings('input').val("");
})
// 点击搜索历史中的关键词会跳转
$(".copy ul").on('click','span',function(){
    location.href ='./searchList.html?key='+$(this).html();
    $(this).siblings('input').val("");
})

})


// 历史搜索记录都在locaStrorage中,在本地存储中可以存数组和对象
// 存在本地的数据都会转成字符串   所以在获取本地数据的时候转成json对象 
//  在存数据的时候以json字符串的形式保存
// 获取历史搜索记录
function getHistory(){
    // 在获取历史记录的时候,如果没有那么就获取一个空数组式的字符串
    return JSON.parse(localStorage.getItem('History') || '[]');
}
// 保存历史记录
// 传入参数是用户查找过的历史记录
function saveHistory(value){
    // 定义一个空数组保存数据,在获取历史记录的时候肯定是从一个空数组添加的,所以调用的函数就是一个数组
    var arr = getHistory();
    // 判断这个数组中是否有数据
    // 遍历数组   each方法中需要数组的名,index是索引,item是元素
    $.each(arr,function(index,item){
        if(item == value){
            // 如果数组中传入的参数,那么数组中有一条记录就好,删除item那条,将新的加进来
            arr.splice(index,1);
        }
    })
    // 将历史记录追加到数组中
    // 现在的arr是一个真的数组,将历史记录保存到数组中,然后将数组保存到本地,保存到本地的时候转成字符串.
    // 如果不转成字符串那么再次获取数据的时候只会获取到字符串而不是数组形式的字符串
    arr.push(value);

    localStorage.setItem('History',JSON.stringify(arr));
}
// 删除历史记录
// 删除历史记录也需要参入参数,传想要删掉的数据
function delHistory(value){
    // 获取历史记录  这时获取到的是真数组,因为getHistory中已经转为数组了
    var arr = getHistory();
    // 循环遍历数组
    $.each(arr,function(index,item){
        // 判断传的参数在数组中是否存在
        if(value == item){
            arr.splice(index,1);
        }
    })
    // 将删完的数据重新保存到本地
    localStorage.setItem('History',JSON.stringify(arr));

}

// 将保存到本地的历史记录全部展示在页面上
function historyList(){
    // 创建对象将数据传到页面的模板引擎中
    var data = {
        list : getHistory()
    }
    var historyTemplate = template('tem',data);

    // 在div中添加模板
    $('.dv').html(historyTemplate);
}


