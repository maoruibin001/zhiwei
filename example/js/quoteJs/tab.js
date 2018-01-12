;(function($){
    $.fn.tab = function(options){
        var defaults = {
            //各种参数，各种属性
            currentClass:'current',
            tabNav:'.tab-nav>li',
            tabContent:'.tab-content>div'
        };
       options = $.extend(defaults,options);
        this.each(function(){
            //各种功能  //可以理解成功能代码
            var _this = $(this);
            _this.find(options.tabNav).click(function(){
                $(this).addClass(options.currentClass).siblings().removeClass(options.currentClass);
                var index = $(this).index();
                _this.find(options.tabContent).eq(index).show().siblings().hide();
            });
        });
        return this;
    }
})(jQuery);