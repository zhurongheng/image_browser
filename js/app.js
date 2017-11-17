angular.module('myApp', ['ionic', 'myApp.controllers', 'myApp.services'])


    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        $stateProvider
            .state('login', {
                url: '/login',
                cache: false,
                templateUrl: "templates/login.html",
                controller: 'loginCtrl'
            })
            .state('register', {
                url: '/register',
                cache: false,
                templateUrl: "templates/register.html",
                controller: 'registerCtrl'
            })
            .state('home', {
                url: '/home',
                cache: false,
                templateUrl: "templates/home.html",
                controller: 'homeCtrl'
            }).state('trouble-submit', {
                url: '/trouble-submit',
                cache: false,
                templateUrl: "templates/trouble-submit.html",
                controller: 'troubleSubmitCtrl'
        }).state('trouble-history', {
                url: '/trouble-history',
                cache: false,
                templateUrl: "templates/trouble-history.html",
                controller: 'troubleHistoryCtrl'
        }).state('trouble', {
            url: '/trouble',
            data:{trouble:null},
            cache: false,
            templateUrl: "templates/trouble.html",
            controller: 'troubleCtrl'
        }).state('test', {
            url: '/test',
            cache: false,
            templateUrl: "templates/minMap.html",
            controller: 'testCtrl'
        })
        $urlRouterProvider.otherwise('/home');

    });
