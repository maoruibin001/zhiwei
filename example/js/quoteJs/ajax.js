;(function($){
    // console.log('23432432423242424')
    $.ajaxFun = function(obj) {
        obj.url='http://192.168.0.117:8080/CDMJServer/AgentController/'+obj.url;
        //console.log(obj);
        var deferred = $.Deferred();// 新建一个deferred对象
        $.ajax({
            url:obj.url||'',
            data: obj.data || {},
            dataType: obj.dataType || 'JSONP',
            type: obj.type || 'get',
            jsonp:obj.jsonp||'jsoncallback'
        }).success(function (data) {
            //console.log(data);
            deferred.resolve(data);// 改变deferred对象的执行状态为成功
        }).error(function (err) {
            deferred.reject('接口出错，请重试');
        });
        return deferred.fail(function (err) {
            //console.log(err)
        });
    }
})(jQuery);