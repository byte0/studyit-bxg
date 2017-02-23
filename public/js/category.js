
/**
 * 添加分类模块
 */

define(['jquery', 'utils', 'template', 'form','st'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/category/list');

    // 获取分类id
    var cg_id = utils.qs('cg_id'),
        category = $('#category'),
        html;

    if(cg_id) { // 编辑
        $.ajax({
            url: '/api/category/edit',
            type: 'get',
            data: {cg_id: cg_id},
            success: function (info) {
                if(info.code == 200) {
                    // 标题
                    info.result.active = '编辑分类'
                    // 模板引擎
                    html = template('tpl', info.result);
                    // 添加DOM
                    category.html(html);
                }
            }
        });
    } else { // 添加
        $.ajax({
            url: '/api/category/top',
            type: 'get',
            success: function (info) {
                if(info.code == 200) {
                    // 模板引擎
                    html = template('tpl', {
                        active: '添加分类',
                        cg_order: 10,
                        cg_is_hide: 0,
                        top: info.result
                    });
                    // 添加DOM
                    category.html(html);
                }
            }
        });
    }
    // 提交表单数据
    category.on('submit', 'form', function () {

        var _this = $(this),
            msg = _this.attr('action').indexOf('add') == -1
                ? '修改成功！' : '添加成功！';
        _this.ajaxSubmit({
            type: 'post',
            success: function (info) {
                if(info.code == 200) {
                    location.reload();
                }
            }
        });
        return false;
    });
});