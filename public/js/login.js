/*
    登录功能
*/
define(['jquery','cookie'], function ($) {
    $('#loginForm').on('submit', function () {
        var formData = $(this).serialize();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: formData,
            success: function (info) {
                if(info.code == 200) {
                    // cookie 只能字符串类型
                    $.cookie('loginfo', JSON.stringify(info.result), {path: '/'});
                    location.href = '/';
                }
            }
        });
        return false;
    });
});