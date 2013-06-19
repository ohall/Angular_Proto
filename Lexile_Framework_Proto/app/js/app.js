'use strict';

var app = angular.module('StudentAssessmentApp', []);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/',{
      templateUrl:'views/login.html',
      controller: 'GoodByeCtrl'
       })
      .when('/trials', {
        templateUrl: 'views/sriTrials.html',
        controller: 'TrialCtrl'
      })
      .when('/goodbye',{
      templateUrl:'views/goodbye.html',
      controller: 'GoodByeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });