/*
    添加课程
*/
define(['jquery','utils','validate','form','st'],function($,utils){

    utils.setMenu('/course/add');

    $('#addForm').validate({
        sendForm : false,
        valid : function(){
            $(this).ajaxSubmit({
                url : '/api/course/create',
                type : 'post',
                success : function(data){
                    if(data.code == 200){
                        location.href = '/course/basic?cs_id=' + data.result.cs_id;
                    }
                }
            });
        }
    });

});