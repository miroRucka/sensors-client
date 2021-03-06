'use strict';

/**
 * Config for the router
 */
angular.module('sensors')
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeController as home'
        });
        $stateProvider.state('point', {
            url: '/home/:pointId',
            templateUrl: 'templates/home.html',
            controller: 'HomeController as home'
        });
        $stateProvider.state('outside', {
            url: '/outside',
            templateUrl: 'templates/outside.html',
            controller: 'OutsideController as ctrl'
        });
        $stateProvider.state('nt', {
            url: '/nt',
            templateUrl: 'templates/nt.html',
            controller: 'NTController as ctrl'
        });
    });
