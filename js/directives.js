angular.module('myApp')
/**
 * 动态设置图片选择滚动条高度
 */
    .directive('imageScroll', function($compile) {
    return {
        restrict: 'AE',
        link: function(scope, element, attr, ctrl) {
           element[0].style.height=(window.innerHeight-508)+'px';
        }
    };
}).directive('minMap', function($compile) {
    return {
        restrict: 'AE',
        require:'ngModel',
        scope:{
            ngModel:'=',
            closeMap:'&'
        },
        link: function(scope, element, attr, ctrl) {
            var div=document.createElement('div');
            div.style.width=window.innerWidth;
            div.style.height=window.innerHeight-44+'px';
            console.log('w:'+window.innerWidth);
            console.log('h:'+window.innerHeight)
            element[0].appendChild(div);
            var options = {
                width:140,
                height:80,
                title: '<b>位置信息</b>',
                result: function (info) {
                    console.log(info);
                    scope.$apply(function () {
                        scope.ngModel=info;
                    })
                },
                closeMap:function(){
                    scope.$apply(function () {
                        if(typeof(scope.closeMap)=='function'){
                            scope.closeMap();
                        }
                    });
                }
            }
            $map.minMap(div).build(options);
        }
    };
});