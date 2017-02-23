// 通用配置
require.config({
    baseUrl : '/public',
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths : {
        jquery : 'assets/jquery/jquery',
        cookie : 'assets/jquery-cookie/jquery.cookie',
        validate : 'assets/jquery-validate/jquery-validate',
        uploadify : 'assets/jquery-uploadify/jquery.uploadify',
        form : 'assets/jquery-form/jquery.form',
        region : 'assets/jquery-region/jquery.region',
        jcrop : 'assets/jquery-jcrop/js/Jcrop',
        bootstrap : 'assets/bootstrap/js/bootstrap',
        datepicker : 'assets/bootstrap-datepicker/js/bootstrap-datepicker',
        language : 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        template : 'assets/artTemplate/template',
        nprogress : 'assets/nprogress/nprogress',
        echarts : 'assets/echarts/echarts.min',
        ckeditor : 'assets/ckeditor/ckeditor',
        utils : 'js/utils',
        st : 'js/state'
    },
    shim : {
        bootstrap : {
            deps : ['jquery']
        },
        validate : {
            deps : ['jquery']
        },
        language : {
            deps : ['jquery','datepicker']
        },
        ckeditor : {
            exports : 'CKEDITOR'
        },
        uploadify : {
            deps : ['jquery']
        },
        jcrop : {
            deps : ['jquery']
        }
    }
});