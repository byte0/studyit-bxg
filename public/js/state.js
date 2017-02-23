/*
    加载状态
*/
define(['jquery','nprogress'],function($,nprogress){
    // 设置全局状态
    nprogress.start();
    nprogress.done();
    
    // loading
    $(document).ajaxStart(function () {
        $('.overlay').show();
    }).ajaxStop(function () {
        setTimeout(function () {
            $('.overlay').hide();
        }, 200);
    });
});