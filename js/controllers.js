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
    .controller('homeCtrl', ['$scope', '$state', 'PTZXFace', function ($scope, $state, PTZXFace) {
        $scope.troubleNew = function () {
            $state.go('trouble-submit');
        }
        $scope.troubleHistory = function () {

        }
        $scope.selectedItem = {};
        $scope.itemList = [
            {id: 0, name: '零'},
            {id: 1, name: '一'},
            {id: 2, name: '三'}
        ];
        $scope.selectedItem = $scope.itemList[0];
        /*$scope.itemChange=function(item){
            console.log('item change:');
            console.log(item);
        }*/
    }])
    /**
     * *********************************************上报控制器**********************************************************
     */
    .controller('troubleSubmitCtrl', ['$scope', '$state', 'PTZXFace', '$window','$ionicActionSheet','$ionicModal', function ($scope, $state, PTZXFace, $window,$ionicActionSheet,$ionicModal) {
        /**
         *下拉框部分
         */
        $scope.loader = {};
        $scope.loader.category = [];
        $scope.loader.patrolIssueFacilityList = [];
        $scope.loader.patrolIssueTypeList = [];
        $scope.loader.patrolIssueMaterialList = [];
        $scope.loader.selectedPatrolIssueGroup = {};
        $scope.loader.selectedPatrolIssueFacility = {};
        $scope.loader.selectedPatrolIssueType = {};
        $scope.loader.selectedPatrolIssueMaterial = {};
        $scope.loader.showPatrolIssueMaterial = false;
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
        $scope.loader.refresh();
        /**
         * ***********以下开始为图片上传部分***********
         */
        $scope.upload = {};
        $scope.upload.items = [
            {
                index: 0,
                src: ''
            }
        ];
        $scope.upload.remove = function (item) {
                if(item&&item.index&&item.index<$scope.upload.items){
                    $scope.upload.items.remove(item.index);
                }
        }
        $scope.upload.showActions=function ($event) {
            console.log($event.target);
            $ionicActionSheet.show({
                buttons: [
                    { text: '移除' },
                ],
               /* destructiveText: 'Delete',*/
                titleText: '请选择操作',
                cancelText: '取消',
                buttonClicked: function(index) {
                    return true;
                }
            });
        }
        /**
         * ***********以下开始获取位置信息***********
         */
        $scope.BDMap={};
        $scope.BDMap.troubleAddress='';
        $scope.BDMap.showMap=function(){
            $ionicModal.fromTemplateUrl('templates/minMap.html',{
                scope:$scope
            }).then(function(modal){
                $scope.BDMap.modal=modal;
                modal.show();
            },function (e) {
                console.log(e.message||e);
            })
        }
        $scope.BDMap.closeMap=function(){
            if($scope.BDMap.modal){
                $scope.BDMap.modal.hide();
                $scope.BDMap.modal.remove();
            }
        }
    }])
    /**
     * *********************************************上报历史控制器*****************************************************
     */
    .controller('troubleHistoryCtrl', ['$scope', '$state', 'PTZXFace', function ($scope, $state, PTZXFace) {

    }]);
