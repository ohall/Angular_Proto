'use strict';

angular.module('SRIProtoWebStormApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/goodbye',{
            templateUrl:'views/goodbye.html',
            controller: 'GoodByeCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
