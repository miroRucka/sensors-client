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
            controller: 'HomeController'
        });
    });
