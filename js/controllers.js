angular.module('myApp.controllers', [])
/**
 * *****************************************************注册控制器*****************************************************
 */
    .controller('registerCtrl', ['$scope', '$state', 'PTZXFace', function ($scope, $state, PTZXFace) {

    }])
    /**
     * ***********************************************登陆控制器************************************************************
     */
    .controller('loginCtrl', ['$scope', '$state', 'PTZXFace', function ($scope, $state, PTZXFace) {

    }])
    /**
     * ******************************************首页控制器*************************************************************
     */
    .controller('homeCtrl', ['$scope', '$state', 'PTZXFace', '$stateParams', '$location', '$window', function ($scope, $state, PTZXFace, $stateParams, $location, $window) {
        if ($location && $location.search().openid) {
            localStorage.setItem('openid', $location.search().openid);
        }
        if ($location && $location.search().userid) {
            localStorage.setItem('userid', $location.search().userid);
        }
        if ($location && $location.search().logname) {
            localStorage.setItem('logname', $location.search().logname);
        }
        $scope.troubleNew = function () {
            $state.go('trouble-submit');
        }
        $scope.troubleHistory = function () {
            $state.go('trouble-history');
        }

    }])
    /**
     * *********************************************上报控制器**********************************************************
     */
    .controller('troubleSubmitCtrl', ['$scope', '$state', 'PTZXFace', 'utils', '$window', function ($scope, $state, PTZXFace, utils, $window) {


        /**
         *下拉框部分
         */
        $scope.loader = {};
        $scope.troubleLogic = {};
        $scope.loader.preparedId = '';
        $scope.loader.category = [];
        $scope.loader.patrolIssueFacilityList = [];
        $scope.loader.patrolIssueTypeList = [];
        $scope.loader.patrolIssueMaterialList = [];
        $scope.loader.selectedPatrolIssueGroup = {};
        $scope.loader.selectedPatrolIssueFacility = {};
        $scope.loader.selectedPatrolIssueType = {};
        $scope.loader.selectedPatrolIssueMaterial = {};
        $scope.loader.showPatrolIssueMaterial = false;
        $scope.loader.troubleDesc = '';
        /**
         * 初始化一级
         */
        $scope.loader.refresh = function () {
            PTZXFace.getCategoryData().then(function (category) {
                console.log(category);
                if (category && category.length > 0) {
                    console.log('初始化一级');
                    $scope.loader.category = category;
                    $scope.loader.selectedPatrolIssueGroup = category[0];
                    $scope.loader.initGroup(category[0]);
                }
            }, function (e) {
                $window.alert(e);
            })
        }
        /**
         * 初始化第二级
         * @param patrolIssueGroup
         */
        $scope.loader.initGroup = function (patrolIssueGroup) {
            console.log('初始化二级');
            if (patrolIssueGroup && patrolIssueGroup.children && patrolIssueGroup.children.length > 0) {
                $scope.loader.patrolIssueFacilityList = patrolIssueGroup.children
                $scope.loader.selectedPatrolIssueFacility = patrolIssueGroup.children[0];
                $scope.loader.initFacility($scope.loader.selectedPatrolIssueFacility);
            }

        }
        /**
         * 初始化第三级
         * @param patrolIssueFacility
         */
        $scope.loader.initFacility = function (patrolIssueFacility) {
            console.log('初始化三级');
            if (patrolIssueFacility && patrolIssueFacility.children && patrolIssueFacility.children.type && patrolIssueFacility.children.type.length > 0) {
                $scope.loader.patrolIssueTypeList = patrolIssueFacility.children.type;
                $scope.loader.selectedPatrolIssueType = patrolIssueFacility.children.type[0];
            }
            if (patrolIssueFacility && patrolIssueFacility.children && patrolIssueFacility.children.material && patrolIssueFacility.children.material.length > 0) {
                $scope.loader.patrolIssueMaterialList = patrolIssueFacility.children.material;
                $scope.loader.selectedPatrolIssueMaterial = patrolIssueFacility.children.material[0];
                $scope.loader.showPatrolIssueMaterial = true;
            } else {
                $scope.loader.showPatrolIssueMaterial = false;
            }
        }
        /**
         * 一级变化
         * @param patrolIssueGroup
         */
        $scope.loader.patrolIssueGroupChange = function (patrolIssueGroup) {
            try {
                if (patrolIssueGroup) {
                    $scope.loader.initGroup(patrolIssueGroup);
                } else {
                    $scope.loader.initGroup($scope.loader.selectedPatrolIssueGroup);
                }
            } catch (e) {
                console.log(e.message);
            }
        }
        /**
         * 二级变化
         * @param patrolIssueFacility
         */
        $scope.loader.patrolIssueFacilityChange = function (patrolIssueFacility) {
            try {
                if (patrolIssueFacility) {
                    $scope.loader.initFacility(patrolIssueFacility);
                } else {
                    $scope.loader.initFacility($scope.loader.selectedPatrolIssueFacility);
                }
            } catch (e) {
                console.log(e.message);
            }
        }
        /**
         * 三级变化
         * @param patrolIssueMaterial
         */
        $scope.loader.patrolIssueMaterialChange = function (patrolIssueMaterial) {
            console.log(patrolIssueMaterial);
        }
        /**
         * 三级变化
         * @param patrolIssueType
         */
        $scope.loader.patrolIssueTypeChange = function (patrolIssueType) {
            console.log(patrolIssueType);
        }
        //初始化数据
        PTZXFace.randomGUID().then(function (randomGUID) {
            $scope.loader.preparedId = randomGUID;
            console.log('preparedId:' + $scope.loader.preparedId);
            $scope.loader.refresh();
        }, function (e) {
            $window.alert('获取随机串失败:' + e);
        });
        /**
         * ***********以下开始为图片上传部分***********
         */
        $scope.upload = {};
        $scope.upload.imageItems = [];
        $scope.upload.currentImage = '';
        $scope.upload.uploadMediaId = '';
        $scope.upload.uploadCount = 0;
        $scope.upload.remove = function (item) {
            try {
                if (item && item.index && inten.index >= 0 && item.index < $scope.upload.imageItems.length) {
                    $scope.upload.imageItems.remove(item.index);
                }
            } catch (e) {
                $window.alert(e.message || e);
            }
        }
        /**
         * 添加图片
         * @param item
         */
        $scope.upload.addImage = function (item) {
            try {
                $scope.upload.imageItems.push(item);
                alert($scope.upload.imageItems.length);
            } catch (e) {
                $window.alert(e.name + ':' + e.message);
            }
        }
        /**
         * 从微信获取图片
         */
        $scope.upload.getImage = function () {
            if ($scope.upload.uploadCount < 5) {
                $scope.$broadcast('getImage');
            } else {
                $window.alert('最对只能上传5张图片.');
            }

        }
        /**
         * 从微信获取图片完毕
         */
        $scope.upload.getImageComplete = function () {
            $scope.upload.uploadCount++;
            utils.$ionicLoading.show({
                template: '正在上传,请稍后...'
            });
        }
        /**
         * 图片上传到微信服务器完毕，等待下载
         */
        $scope.upload.uploadImageComplete = function () {
            utils.$ionicLoading.hide();
            //下载完成
            PTZXFace.downloadMedia($scope.loader.preparedId, $scope.upload.uploadMediaId).then(function (media) {
                var item = {
                    index: $scope.upload.imageItems.length > 0 ? $scope.upload.imageItems.length - 1 : 0,
                    id: media.attachId,
                    url: media.url
                };
                $window.alert('图片:' + item.url);
                $scope.upload.addImage(item);
            }, function (e) {
                $window.alert(e);
            })
        }
        /**
         * 检查数据
         */
        $scope.troubleLogic.checkData = function (params) {
            if (!params.lng || !params.lat || !params.location) {
                $window.alert('请先获取当前位置.');
                return false;
            }
            if (!params.issueDesc) {
                $window.alert('请输入病害信息.');
                return false;
            }
            return true;
        }
        /**
         *上报
         */
        $scope.troubleLogic.finish = function () {
            var point = $scope.BDMap.troubleLocation.split(',');
            var lng = '';
            var lat = '';
            if (point.length == 2) {
                lng = point[0];
                lat = point[1];
            }
            var logname = localStorage.getItem('logname') || '';
            var userid = localStorage.getItem('userid') || '';
            var params = {
                reporter: logname,
                lng: lng,
                lat: lat,
                location: $scope.BDMap.troubleAddress,
                reportTime: utils.formatDate(new Date()),
                reporterId: userid,
                issueDesc: $scope.loader.troubleDesc,
                id: $scope.preparedId,
                remark: $scope.loader.selectedPatrolIssueFacility.name,
                issueType: $scope.loader.selectedPatrolIssueType.name,
                issueStatus: 'PRB_STA_01',
                type2: 'PRB_TYPE_4',
                issueTypeSub: $scope.loader.selectedPatrolIssueMaterial.name
            }
            $window.alert(params.reporter + '-' + params.reportTime);
            if (!$scope.troubleLogic.checkData(params)) {
                return;
            }
            utils.$ionicLoading.show({
                template: '正在处理,请稍后...'
            });
            PTZXFace.patrolIssueAdd(params).then(function (patrolIssue) {
                console.log(patrolIssue);
                var timeout = utils.$timeout(function () {
                    utils.$ionicLoading.hide();
                    $state.go('home');
                }, 1000).then(function () {
                    utils.$timeout.cancel(timeout);
                });
            }, function (e) {
                $window.alert(e);
            });
        }
        /**
         * ***********以下开始获取位置信息***********
         */
        $scope.BDMap = {};
        $scope.BDMap.troubleLocation = '';
        $scope.BDMap.troubleAddress = '';
        $scope.BDMap.troubleAddressExtra = '';
        $scope.BDMap.showMap = function () {
            utils.$ionicModal.fromTemplateUrl('templates/minMap.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.BDMap.modal = modal;
                modal.show();
                utils.$ionicLoading.show({
                    template: '正在获取位置信息...'
                });
            }, function (e) {
                $window.alert(e.message || e);
            })
        }
        $scope.BDMap.mapReady = function () {
            utils.$ionicLoading.hide();
        }
        $scope.BDMap.closeMap = function () {
            if ($scope.BDMap.modal) {
                $scope.BDMap.modal.hide();
                $scope.BDMap.modal.remove();
            }
        }
    }])
    /**
     * *********************************************上报历史控制器*****************************************************
     */
    .controller('troubleHistoryCtrl', ['$scope', '$state', 'PTZXFace', function ($scope, $state, PTZXFace) {
        $scope.historyLogic = {};
        $scope.historyLogic.troubleList = [];
        /**
         * 查看详细信息
         * @param trouble
         */
        $scope.historyLogic.showDetails = function (trouble) {
            $state.go('trouble', {trouble: trouble});
        }
        /**
         * 初始化页面
         */
        $scope.historyLogic.init = function () {

        }
    }])
    /**
     * ********************************************************上报详情****************************************
     */
    .controller('troubleCtrl', ['$scope', '$state', 'PTZXFace', 'utils', '$stateParams', '$window', function ($scope, $state, PTZXFace, utils, $stateParams, $window) {
        $scope.troubleLogic = {};
        $scope.troubleLogic.init = function () {
            //获取参数
            $scope.trouble = $stateParams.trouble;
            //如果获取不到参数，返回列表页
            try {
                if (!$scope.trouble) {
                    var currenttrouble = JSON.parse(localStorage.getItem('currenttrouble'));
                    if (currenttrouble) {
                        $scope.trouble = currenttrouble;
                    } else {
                        $state.go('trouble-history');
                    }
                }
            } catch (e) {
                $window.alert(e.name + ':' + e.message);
                return;
            }
        }
        //返回列表
        $scope.troubleLogic.goBack = function () {
            utils.$ionicHistory.goBack();
        }
        /**
         * 显示工作流
         */
        $scope.troubleLogic.showWorkFlow = function () {
            utils.$ionicModal.fromTemplateUrl('templates/troubleFlow.html', {scope: $scope}).then(function (modal) {
                $scope.modal = modal;
                modal.show();
            }, function (e) {
                $window.alert(e.name + ':' + e.message);
            });
        }
        /**
         * 关闭工作流页面
         */
        $scope.troubleLogic.closeWorkFlow = function () {
            $scope.modal.hide();
            $scope.modal.remove();
        }
    }]);
