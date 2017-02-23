/*
    讲师列表
*/
define(['jquery','template','utils','st'],function($,template,utils){
    // 设置列表选中
    utils.setMenu('/teacher/list');
    
    var teacherList = $('#teacherList'),
        teacherModal = $('#teacherModal'); 
        
    // 加载讲师列表
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function(data){
            var html = template('tpl',{list : data.result});
            teacherList.html(html);
        }
    });
    
    // 查看讲师信息
    $('#teacherList').on('click','.preview',function(){
        var id = $(this).closest('td').attr('data-id');
        $.ajax({
            url : '/api/teacher/view',
            type : 'get',
            data : {tc_id : id},
            dataType : 'json',
            success : function(data){
                var html = template('teacherTpl',data.result);
                teacherModal.find('table').html(html);
                teacherModal.modal();
            }
        });
    });
    // 注销和启用讲师
    $('#teacherList').on('click','.handle',function(){
        var id = $(this).closest('td').attr('data-id'),
            status = $(this).closest('td').attr('data-status');
            _this = $(this);
            _parent = $(this).closest('td');
        $.ajax({
            url : '/api/teacher/handle',
            type : 'post',
            data : {tc_id : id,tc_status:status},
            dataType : 'json',
            success : function(data){
                if(data.code == 200){
                    if(status == 0){
                        _this.text('启 用');
                    }else{
                        _this.text('注 销')
                    }
                }
                // 更新状态
                _parent.attr('data-status',data.result.tc_status);
            }
        });
    });
    // 编辑讲师信息

    
});