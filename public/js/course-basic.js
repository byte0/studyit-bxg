/*
    课程基本信息
*/
define(['jquery','utils','template','ckeditor','validate','form','st'],function($,utils,template,CKEDITOR){
    utils.setMenu('/course/add');

    var cs_id = utils.qs('cs_id');
    $.ajax({
        url : '/api/course/basic',
        type : 'get',
        data : {cs_id :cs_id},
        success : function(data){
            var html = template('basicTpl',data.result);
            $('#basic').html(html);

            CKEDITOR.replace('ckeditor');
            
            // 处理表单提交
            $('#basicForm').validate({
                sendForm : false,
                valid : function(){
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    $(this).ajaxSubmit({
                        url : '/api/course/update/basic',
                        type : 'post',
                        success : function(data){
                            if(data.code == 200){
                                location.href = '/course/picture?cs_id='+data.result.cs_id;
                            }
                        }
                    });
                }

            });

        }
    });
    // 加载子分类
    $('#basic').on('change','#top',function(){
        var cg_id = $(this).val();
        $.ajax({
            url : '/api/category/child',
            type : 'get',
            data : {cg_id : cg_id},
            success : function(data){
                if(data.code == 200){
                    var tpl = '{{each list as item}}<option value="{{item.cg_id}}">{{item.cg_name}}</option>{{/each}}';
                    var render = template.compile(tpl);
                    var html = render({list : data.result});
                    console.log(html);
                    $('#child').html(html);
                }
            }
        });
    });
});