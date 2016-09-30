/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('failure_chance', {
                //parent: 'secure',
                url: '/failure_chance',
                templateUrl: 'views/first-card.html',
                controller: 'SampleCtrl'
            })
            .state('temperatures', {
                //parent: 'secure',
                url: '/temperatures',
                templateUrl: 'views/second-card.html',
                controller: 'SampleCtrl2'
            })
            .state('critical', {
                //parent: 'secure',
                url: '/critical',
                templateUrl: 'views/third-card.html',
                controller: 'SampleCtrl3'
            });


        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/first');
            $state.go('failure_chance');
        });

    }]);
});
