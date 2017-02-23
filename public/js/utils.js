/*
    工具方法
*/
define(['jquery'],function($){
    return {
        setMenu : function(path){
            $('.navs a[href="'+path+'"]')
            .addClass('active')
            .closest('ul').show();
        },
        qs : function(key){
            var search = location.search.slice(1);
            search = search.split('&');
            var obj = {};
            for (var i = 0; i < search.length; i++) {
                var temp = search[i].split('=');
                obj[temp[0]] = temp[1];
            }
            return obj[key];
        }
    }
});