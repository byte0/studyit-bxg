
/**
 * 课程列表模块
 */

define(['jquery', 'utils', 'template','st'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/course/list');

    var course = $('#course'),
        html;

    $.ajax({
        url: '/api/course',
        type: 'get',
        success: function (info) {
            console.log(info);
            if(info.code == 200) {
                // 模板引擎
                html = template('courseTpl', {list: info.result});
                // 添加DOM
                course.append(html);
            }
        }
    });
});