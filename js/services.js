angular.module('myApp.services', [])
/**
 * **********************************************************配套中心接口***********************************************
 */
    .factory('PTZXFace', ['$q', '$http', '$timeout', function ($q, $http, $timeout) {
        var PTZXFace = {
            /**
             *获取种类组列表(设施位置,第一类)
             */
            patrolIssueGroupList: function () {
                var defer = $q.defer();
                var server = $http({
                    url: '/patrol/patrol-ajax/json/patrolIssueGroupList.xview?doType=999',
                    method: 'GET',
                    params: null
                });
                server.success(function (data) {
                    if (data.status = 'Y') {
                        defer.resolve(data.patrolIssueGroupList);
                    } else {
                        defer.reject(data.msg);
                    }
                });
                server.error(function (e) {
                    if (e && e.message) {
                        defer.reject(e.message);
                    } else {
                        defer.reject('请求错误!');
                    }
                });
                return defer.promise;
            },
            /**
             * 获取设施列表（设施位置第二类）
             */
            patrolIssueFacilityList: function () {
                var defer = $q.defer();
                var server = $http({
                    url: '/patrol/patrol-ajax/json/patrolIssueFacilityList.xview?doType=600',
                    method: 'GET',
                    params: null
                });
                server.success(function (data) {
                    if (data.status = 'Y') {
                        defer.resolve(data.patrolIssueFacilityList);
                    } else {
                        defer.reject(data.msg);
                    }
                });
                server.error(function (e) {
                    if (e && e.message) {
                        defer.reject(e.message);
                    } else {
                        defer.reject('请求错误!');
                    }
                });
                return defer.promise;
            },
            /**
             * 获取材质列表（设施材质）
             */
            patrolIssueMaterialList: function () {
                var defer = $q.defer();
                var server = $http({
                    url: '/patrol/patrol-ajax/json/patrolIssueMaterialList.xview?doType=999',
                    method: 'GET',
                    params: null
                });
                server.success(function (data) {
                    if (data.status = 'Y') {
                        defer.resolve(data.patrolIssueMaterialList);
                    } else {
                        defer.reject(data.msg);
                    }
                });
                server.error(function (e) {
                    if (e && e.message) {
                        defer.reject(e.message);
                    } else {
                        defer.reject('请求错误!');
                    }
                });
                return defer.promise;
            },
            /**
             * 获取类型列表（病害种类）
             */
            patrolIssueTypeList: function () {
                var defer = $q.defer();
                var server = $http({
                    url: '/patrol/patrol-ajax/json/patrolIssueTypeList.xview?doType=999&start=0&range=100',
                    method: 'GET',
                    params: null
                });
                server.success(function (data) {
                    if (data.status = 'Y') {
                        defer.resolve(data.patrolIssueTypeList);
                    } else {
                        defer.reject(data.msg);
                    }
                });
                server.error(function (e) {
                    if (e && e.message) {
                        defer.reject(e.message);
                    } else {
                        defer.reject('请求错误!');
                    }
                });
                return defer.promise;
            },
            /**
             * 下载微信图片
             * @param mstId
             * @param mediaId
             * @returns {promise|d|*}
             */
            downloadMedia: function (mstId, mediaId) {
                var defer = $q.defer();
                var server = $http({
                    url: '/patrol/wx/serve.xview?doType=222&categoryId=ATT_APP_patrol_ATTACH',
                    method: 'GET',
                    params: {mstId: mstId, mediaId: mediaId}
                });
                server.success(function (data) {
                    if (data.status = 'Y') {
                        defer.resolve(data.media);
                    } else {
                        defer.reject(data.msg);
                    }
                });
                server.error(function (e) {
                    if (e && e.message) {
                        defer.reject(e.message);
                    } else {
                        defer.reject('请求错误!');
                    }
                });
                return defer.promise;
            },
            /**
             * 提交上报
             * @param params
             * Reporter   上传者名称
             *Lng  经度
             *Lat  纬度
             *Location  位置
             *type2   使用默认值  PRB_TYPE_1
             *reportTime 上传时间
             *issueDesc  问题描述
             *id     一个随机不重复码 取UUID值
             *remark  设施位置
             *issueType   种类
             *issueStatus  使用默认值  PRB_STA_01
             *issueTypeSub  材质
             * @returns {promise|d|*}
             */
            patrolIssueAdd: function (params) {
                var defer = $q.defer();
                var server = $http({
                    url: '/patrol/patrol-ajax/json/patrolIssueAdd.xview?doType=1&parentId=&seq=10000',
                    method: 'GET',
                    params: params
                });
                server.success(function (data) {
                    if (data.status = 'Y') {
                        defer.resolve(data.patrolIssue);
                    } else {
                        defer.reject(data.msg);
                    }
                });
                server.error(function (e) {
                    if (e && e.message) {
                        defer.reject(e.message);
                    } else {
                        defer.reject('请求错误!');
                    }
                });
                return defer.promise;
            },
            /**
             * 获取一个随机串
             * @returns {promise|d|*}
             */
            randomGUID: function () {
                var defer = $q.defer();
                var server = $http({
                    url: '/patrol/wx/serve.xview?doType=999',
                    method: 'GET',
                    params: null
                });
                server.success(function (data) {
                    if (data.status = 'Y') {
                        defer.resolve(data.randomGUID);
                    } else {
                        defer.reject(data.msg);
                    }
                });
                server.error(function (e) {
                    if (e && e.message) {
                        defer.reject(e.message);
                    } else {
                        defer.reject('请求错误!');
                    }
                });
                return defer.promise;
            },
            /**
             * 用户登录
             * @returns {promise|d|*}
             */
            userValidate: function (logName, password) {
                var defer = $q.defer();
                var server = $http({
                    url: '/cas/userValidate.jsp',
                    method: 'GET',
                    params: {logName: logName, password: password}
                });
                server.success(function (data) {
                    if (data.status = 'Y') {
                        try {
                            var account = JSON.parse(data.account);
                            defer.resolve(account);
                        } catch (e) {
                            defer.reject('解析数据失败:' + e.name + ',' + e.message);
                        }
                    } else {
                        defer.reject(data.msg);
                    }
                });
                server.error(function (e) {
                    if (e && e.message) {
                        defer.reject(e.message);
                    } else {
                        defer.reject('请求错误!');
                    }
                });
                return defer.promise;
            }
        };
        /**
         * 静态变量,存储数据
         */
        var storage = {
            categoryData: {
                validate: function () {
                    /*console.log('**********************************')
                    console.log(this.patrolIssueGroupList.length);
                    console.log(this.patrolIssueFacilityList.length);
                    console.log(this.patrolIssueMaterialList.length);
                    console.log(this.patrolIssueTypeList.length);
                    console.log('**********************************')*/
                    return this.patrolIssueGroupList.length > 0 &&
                        this.patrolIssueFacilityList.length > 0 &&
                        this.patrolIssueMaterialList.length > 0 &&
                        this.patrolIssueTypeList.length > 0;
                },
                initData: function () {
                    var isTimeOut = false;
                    console.log('开始查询数据,12秒超时...');
                    var timeout = $timeout(function () {
                        isTimeOut = true;
                    }, 1200).then(function () {
                        $timeout.cancel(timeout);
                    }, function (e) {
                        alert(e.message || e);
                    });
                    var defer = $q.defer();
                    var ret_defer = $q.defer();
                    var promise = defer.promise;
                    PTZXFace.patrolIssueTypeList().then(function (patrolIssueTypeList) {
                        storage.categoryData.patrolIssueTypeList = patrolIssueTypeList;
                        console.log('取到病害');
                        if (storage.categoryData.validate()) {
                            console.log('数据读取完成');
                            defer.resolve({});
                        }
                        if (isTimeOut) {
                            defer.reject('获取数据超时!');
                        }
                    }, function (e) {
                        defer.reject(e);
                    })
                    PTZXFace.patrolIssueMaterialList().then(function (patrolIssueMaterialList) {
                        storage.categoryData.patrolIssueMaterialList = patrolIssueMaterialList;
                        console.log('取到材质');
                        if (storage.categoryData.validate()) {
                            console.log('数据读取完成');
                            defer.resolve({});
                        }
                        if (isTimeOut) {
                            defer.reject('获取数据超时!');
                        }
                    }, function (e) {
                        defer.reject(e);
                    });
                    PTZXFace.patrolIssueFacilityList().then(function (patrolIssueFacilityList) {
                        storage.categoryData.patrolIssueFacilityList = patrolIssueFacilityList;
                        console.log('取到设施');
                        if (storage.categoryData.validate()) {
                            console.log('数据读取完成');
                            defer.resolve({});
                        }
                        if (isTimeOut) {
                            defer.reject('获取数据超时!');
                        }
                    });
                    PTZXFace.patrolIssueGroupList().then(function (patrolIssueGroupList) {
                        storage.categoryData.patrolIssueGroupList = patrolIssueGroupList;
                        console.log('取到第一类');
                        if (storage.categoryData.validate()) {
                            console.log('数据读取完成');
                            defer.resolve({});
                        }
                        if (isTimeOut) {
                            defer.reject('获取数据超时!');
                        }
                    }, function (e) {
                        defer.reject(e);
                    })
                    promise.then(function () {
                        try {
                            //1、初始化设施位置
                            (function () {
                                for (var i = 0; i < storage.categoryData.patrolIssueGroupList.length; i++) {
                                    var children = new Array();
                                    for (var j = 0; j < storage.categoryData.patrolIssueFacilityList.length; j++) {
                                        if (storage.categoryData.patrolIssueFacilityList[j].parentId == storage.categoryData.patrolIssueGroupList[i].id) {
                                            children.push(storage.categoryData.patrolIssueFacilityList[j]);
                                        }
                                    }
                                    storage.categoryData.patrolIssueGroupList[i].children = children;
                                }
                            })();
                            //2、初始化病害种类,属于2子类
                            (function () {
                                for (var i = 0; i < storage.categoryData.patrolIssueFacilityList.length; i++) {
                                    var children = new Array();
                                    for (var j = 0; j < storage.categoryData.patrolIssueTypeList.length; j++) {
                                        if (storage.categoryData.patrolIssueTypeList[j].parentId == storage.categoryData.patrolIssueFacilityList[i].id) {
                                            children.push(storage.categoryData.patrolIssueTypeList[j]);
                                        }
                                    }
                                    storage.categoryData.patrolIssueFacilityList[i].children = {
                                        material: [],
                                        type: children
                                    };
                                }
                            })();

                            //3、初始化设施材质，属于2子类
                            (function () {
                                for (var i = 0; i < storage.categoryData.patrolIssueFacilityList.length; i++) {
                                    var children = new Array();
                                    for (var j = 0; j < storage.categoryData.patrolIssueMaterialList.length; j++) {
                                        if (storage.categoryData.patrolIssueMaterialList[j].parentId == storage.categoryData.patrolIssueFacilityList[i].id) {
                                            children.push(storage.categoryData.patrolIssueMaterialList[j]);
                                        }
                                    }
                                    storage.categoryData.patrolIssueFacilityList[i].children = {
                                        material: children,
                                        type: storage.categoryData.patrolIssueFacilityList[i].children.type
                                    };
                                }
                                ret_defer.resolve({});
                            })();
                        } catch (e) {
                            ret_defer.reject(e.message);
                        }
                    }, function (e) {
                        ret_defer.reject(e);
                    });
                    return ret_defer.promise;
                },
                patrolIssueGroupList: [],
                patrolIssueFacilityList: [],
                patrolIssueTypeList: [],
                patrolIssueMaterialList: []
            }
        };
        PTZXFace.getCategoryData = function () {
            console.log('开始初始化数据');
            var defer = $q.defer();
            if (storage &&
                storage.categoryData &&
                typeof(storage.categoryData.validate) == 'function' &&
                storage.categoryData.validate()) {
                console.log('从内存取数据');
                defer.resolve(storage.categoryData.patrolIssueGroupList);
            } else {
                console.log('从后台取数据');
                storage.categoryData.initData().then(function () {
                    defer.resolve(storage.categoryData.patrolIssueGroupList);
                }, function (e) {
                    defer.reject(e);
                });
            }
            return defer.promise;
        }
        return PTZXFace;
    }]).factory('utils', ['$ionicModal', '$ionicLoading', '$timeout','$ionicHistory', function ($ionicModal, $ionicLoading, $timeout,$ionicHistory) {
    return {
        $ionicLoading: $ionicLoading,
        $ionicModal: $ionicModal,
        $timeout: $timeout,
        $ionicHistory:$ionicHistory,
        formatDate: function (date, format) {
            try {
                format = format || 'yyyy-MM-dd';
                format = format.replace('yyyy', date.getFullYear());
                format = format.replace('MM', this.fillZero(date.getMonth() + 1));
                format = format.replace('dd', this.fillZero(date.getDate()));
                format = format.replace('HH', this.fillZero(date.getHours()));
                format = format.replace('mm', this.fillZero(date.getMinutes()));
                format = format.replace('ss', this.fillZero(date.getSeconds()));
                return format;
            } catch (e) {
                return '';
                console.log(e);
            }
        }
    };
}]);