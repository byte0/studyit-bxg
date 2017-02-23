/**
 * 课时模块
 */
define(['jquery', '../utils', 'template', 'form'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/course/create');

    var lesson = $('#lesson'),
        chapterModal = $('#chapterModal'),
        cs_id = utils.qs('cs_id'),
        html;

    // 查看课程
    $.ajax({
        url: '/api/course/lesson',
        type: 'get',
        data: {cs_id: cs_id},
        success: function (info) {
            if(info.code == 200) {
                // 模板引擎
                html = template('lessonTpl', info.result);
                // 添加DOM
                lesson.html(html);
            }
        }
    });

    // 添加课时
    lesson.on('click', '.add', function () {
        var _this = $(this);
        // 构造数据
        var info = {
            title: '添加课时',
            action: '/api/course/chapter/add',
            ct_cs_id: cs_id
        }

        // 模板引擎
        html = template('modalTpl', info);
        // 添加DOM
        chapterModal.find('.modal-content').html(html);
        // 显示模态框
        chapterModal.modal();

        // 表单类型（编辑）
        chapterModal.find('form').attr('data-type', 'add');
    })

    // 编辑课时
    lesson.on('click', '.edit', function () {
        var _this = $(this),
            ct_id = _this.parent().attr('data-id');

        $.ajax({
            url: '/api/course/chapter/edit',
            type: 'get',
            data: {ct_id: ct_id},
            success: function (info) {
                if(info.code == 200) {
                    // 标题
                    info.result.title = '编辑课时';
                    // 请求地址
                    info.result.action = '/api/course/chapter/modify';
                    // 模板引擎
                    html = template('modalTpl', info.result);
                    // 添加DOM
                    chapterModal.find('.modal-content').html(html);
                    // 显示模态框
                    chapterModal.modal();
                    // 表单类型（编辑）
                    chapterModal.find('form').attr('data-type', 'edit');
                }
            }
        });
    });

    // 表单处理
    chapterModal.on('submit', 'form', function () {
        var _this = $(this),
            // 获取表单类型（添加/编辑）
            type = _this.attr('data-type'),
            // 是否免费
            is_free = _this.find('.is_free')[0].checked ? 1 : 0,

            ct_name = $('[name="ct_name"]').val(),

            ct_minutes = $('[name="ct_minutes"]').val(),

            ct_seconds = $('[name="ct_seconds"]').val();

        _this.ajaxSubmit({
            type: 'post',
            data: {ct_is_free: is_free},
            success: function (info) {
                if(info.code == 200) {
                    chapterModal.modal('hide');

                    if(type == 'add') {
                        html = template('listTpl', {});

                        console.log(html);
                    }
                }
            }
        });

        return false;
    });
});