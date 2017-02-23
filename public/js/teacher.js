/*
    添加老师
*/
define(['jquery','utils','template','datepicker','language','validate','form','st'],function($,utils,template){
    // 设置导航
    utils.setMenu('/teacher/list');
    // 获取id
    var tc_id = utils.qs('tc_id');

    if(tc_id){
        // 编辑
        $.ajax({
            url : '/api/teacher/edit',
            type : 'get',
            data : {tc_id : tc_id},
            success : function(data){
                data.result.title = '编辑讲师';
                var html = template('teacherTpl',data.result);
                $('#teacher').html(html);
                checkForm('/api/teacher/modify');
            }
        });
    }else{
        // 添加
        var html = template('teacherTpl',{title : '添加讲师',tc_gender : 0});
        $('#teacher').html(html);
        // 验证表单
        checkForm('/api/teacher/add');
    }

    function checkForm(url){
        $('#teacherForm').validate({
            // onkeyup : true,
            sendForm : false,
            // onBlur : true,
            valid : function(){
                $(this).ajaxSubmit({
                    url : url,
                    type : 'post',
                    success : function(data){
                        console.log(data);
                    }
                });
            },
            eachInvalidField : function(){
                $(this).closest('.form-group')
                .removeClass('has-success')
                .addClass('has-error');
            },
            description : {
                tcName : {
                    required : '用户名不能为空'
                },
                tcPass : {
                    required : '密码不能为空',
                    pattern : '密码只能是6位数字'
                },
                tcJoindate : {
                    required : '入职时间不能为空'
                }
            }
        });
    }

    
});