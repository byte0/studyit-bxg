
/**
 * 分类列表模块
 */

define(['jquery', 'utils', 'template','st'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/category/list');

    // 查看所有分类
    $.ajax({
        url: '/api/category',
        type: 'post',
        success: function (info) {
            if(info.code == 200) {
                // 模板引擎
                var html = template('tpl', {list: info.result});
                // 添加DOM
                $('#categoryList').html(html);
            }
        }
    });
});