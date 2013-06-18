'use strict';

var app = angular.module('SRIProtoWebStormApp', []);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/',{
      templateUrl:'views/login.html',
      controller: 'GoodByeCtrl'
       })
      .when('/main', {
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