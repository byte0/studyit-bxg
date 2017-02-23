/*
    个人信息
*/
define(['jquery','template','ckeditor','region','datepicker','language','form','uploadify','st'],function($,template,CKEDITOR){
    
    var profile = $('#profile');
    // 查询个人信息
    $.ajax({
        url : '/api/teacher/profile',
        type : 'get',
        success : function(data){
            var html = template('profileForm',data.result);
            profile.html(html);

            $('.hometown').region({
                url : '/public/assets/jquery-region/region.json'
            });

            CKEDITOR.replace('ckeditor');

            // 文件上传
            $('#upfile').uploadify({
                swf : '/public/assets/jquery-uploadify/uploadify.swf',
                uploader : '/api/uploader/avatar',
                fileObjName : 'tc_avatar',
                width : 120,
                height : 120,
                buttonText : '',
                onUploadSuccess : function(file,data){
                    data = JSON.parse(data);
                    if(data.code == 200){
                        console.log(data.result.path);
                        $('.preview img').attr('src',data.result.path);
                    }
                }
            });
        }
    });

    profile.on('submit','form',function(){
        var p = $('#p').find('option:selected').text();
        var c = $('#c').find('option:selected').text();
        var d = $('#d').find('option:selected').text();
        $(this).ajaxSubmit({
            url : '/api/teacher/modify',
            type : 'post',
            data : {tc_hometown : p + '|' + c + '|' + d}
        });
        return false;
    });
    
});