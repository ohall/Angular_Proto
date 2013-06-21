'use strict';

var app = angular.module('StudentAssessmentApp', []);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/',{
      templateUrl:'views/login.html',
      controller: 'LoginCtrl'
       })
      .when('/sri', {
        templateUrl: 'views/sriTrials.html',
        controller: 'QuizCtrl'
      })
      .when('/src', {
            templateUrl: 'views/srcTrials.html',
            controller: 'QuizCtrl'
      })
      .when('/goodbye',{
      templateUrl:'views/goodbye.html',
      controller: 'GoodByeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    //$locationProvider.html5Mode(true);
  });