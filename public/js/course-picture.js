
/**
 * 课程封面图模块
 */

define(['jquery', 'utils', 'template', 'uploadify', 'jcrop', 'form'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/course/add');

    var picture = $('#picture'),
        cs_id = utils.qs('cs_id'),
        html;

    // 查询
    $.ajax({
        url: '/api/course/picture',
        data: {cs_id: cs_id},
        type: 'get',
        success: function (info) {
            if(info.code == 200) {
                // 模板引擎
                html = template('tpl', info.result);
                // 添加DOM
                picture.html(html);

                // 
                var preview = $('.preview img'),
                    jcrop_api;

                // 图片裁切
                function imageCrop() {
                    // 保证只有一个实例
                    if(jcrop_api) jcrop_api.destroy();

                    // 图片裁切
                    preview.Jcrop({
                        boxWidth: 400,
                        aspectRatio: 2
                    }, function () {
                        jcrop_api = this;

                        // 计算初始位置
                        var width = this.ui.stage.width,
                            height = this.ui.stage.height;

                        // 计算选区大小
                        var x1 = 0,
                            y1 = (height - width / 2) / 2,
                            x2 = width,
                            y2 = width / 2;

                        this.newSelection();
                        this.setSelect([x1, y1, x2, y2]);

                        // 缩略图
                        thumbnail = this.initComponent('Thumbnailer', {
                            width: 240,
                            height: 120,
                            thumb: '.thumb'
                        });

                        $('.jcrop-thumb').css({
                            left: 0,
                            top: 0
                        });
                    });
                }

                // 获取裁切尺寸
                preview.on('cropmove cropend',function(e, s, c) {
                    $('[name="x"]').val(c.x);
                    $('[name="y"]').val(c.y);
                    $('[name="w"]').val(c.w);
                    $('[name="h"]').val(c.h);
                });

                // 
                $('#crop').on('click', function () {
                    var _this = $(this),
                        status = _this.attr('data-status');

                    if(status == 'crop') {
                        _this.val('保存图片').attr('data-status', 'save');

                        imageCrop();

                        return;
                    }

                    // 保存
                    $('#coords').ajaxSubmit({
                        url: '/api/course/update/picture',
                        type: 'post',
                        success: function (info) {
                            if(info.code == 200) {
                                location.href = '/course/lesson?cs_id=' + info.result.cs_id;
                            }
                        }
                    });
                });

                // 上传头像
                $('#upfile').uploadify({
                    buttonText: '上传图片',
                    buttonClass: 'btn btn-success btn-sm',
                    width: '82',
                    height: 'auto',
                    fileObjName: 'cs_cover_original',
                    formData: {cs_id: cs_id},
                    itemTemplate: '<span></span>',
                    uploader: '/api/uploader/cover',
                    fileSizeLimit: '2MB',
                    fileTypeExts: '*.jpg; *.gif; *.png',
                    swf: '/public/assets/jquery-uploadify/uploadify.swf',
                    onUploadSuccess: function (file, data) {

                        var data = JSON.parse(data);

                        if(data.code == 200) {

                            $('.preview img').attr('src', data.result.path);

                            // 裁切
                            imageCrop();

                            // 更改按钮状态
                            $('#crop').prop('disabled', false)
                            .val('保存图片')
                            .attr('data-status', 'save');
                        }
                    }
                });
            }
        }
    });
});