'use strict';

angular.module('SRIProtoWebStormApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
/*
 .when('/goodbye',{
 templateUrl:'views/goodbye.html',
 controller: 'GoodByeCtrl'
 })
 */
      .when('/datavis',{
        templateUrl:'views/datavis.html',
        controller: 'DataVisCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
