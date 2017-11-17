angular.module('myApp')
/**
 * 动态设置图片选择滚动条高度
 */
    .directive('imageScroll', function ($compile) {
        return {
            restrict: 'AE',
            link: function (scope, element, attr, ctrl) {
                element[0].style.height = '100%';
            }
        };
    })
    .directive('imageScrollItem', function ($compile) {
        return {
            restrict: 'AE',
            link: function (scope, element, attr, ctrl) {
                element[0].style.height ='160px';
                element[0].style.width = (window.innerWidth - 32) + 'px';
            }
        };
    })
    /**
     * 百度地图组件
     */
    .directive('minMap', function ($compile) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                location:'=',
                mapReady: '&',
                closeMap: '&'
            },
            link: function (scope, element, attr, ctrl) {
                var options = {
                    width: 140,
                    height: 80,
                    elementSuper: element[0],
                    title: '<b>位置信息</b>',
                    mapReady: function () {
                        scope.$apply(function () {
                            if (typeof(scope.mapReady) == 'function') {
                                scope.mapReady();
                            }
                        });
                    },
                    result: function (info) {
                        scope.$apply(function () {
                            scope.ngModel = info.address;
                            scope.location =info.location;
                        })
                    },
                    closeMap: function () {
                        scope.$apply(function () {
                            if (typeof(scope.closeMap) == 'function') {
                                scope.closeMap();
                            }
                        });
                    }
                }
                $map.minMap().build(options);
            }
        };
    })
    /**
     * 微信图片相关组件
     */
    .directive('imageUpload', function ($compile) {
        return {
            restrict: 'AE',
            scope: {
                currentImage: '=',
                uploadImage: '=',
                getImageComplete: '&',
                uploadImageComplete: '&'
            },
            link: function (scope, element, attr, ctrl) {
                element = $(element)[0];
                var instance;
                var options = {
                    onBuild: function (inst) {
                        instance = inst;
                    },
                    getImageComplete: function (localIds) {
                        if (localIds && localIds.length > 0) {
                            scope.$apply(function () {
                                scope.currentImage = localIds[0];
                            });
                            scope.$apply(function () {
                                scope.getImageComplete();
                            });
                        }
                    },
                    uploadImageComplete: function (serverId) {
                        if (serverId) {
                            scope.$apply(function () {
                                scope.uploadImage = serverId;
                            });
                            scope.$apply(function () {
                                scope.uploadImageComplete();
                            });
                        }
                    }
                    //接下来处理，图片移除
                }
                $(element).imageUpload().build(options);
                //接下来，监听图片选择和上传
                scope.$on('getImage',function (e) {
                    console.log(e);
                    instance.getImage();
                })
            }
        };
    });