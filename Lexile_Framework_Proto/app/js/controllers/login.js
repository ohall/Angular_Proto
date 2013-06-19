/**
 * Created with JetBrains WebStorm.
 * User: oakley
 * Date: 6/10/13
 * Time: 11:36 AM
 * To change this template use File | Settings | File Templates.
 */
"use strict";

angular.module('StudentAssessmentApp')
    .controller('LoginCtrl', function ($scope, $routeParams, $location) {
        $scope.loginID = $routeParams.loginID;

        /**
         * Student user name
         * @type {string}
         */
        $scope.userName = '';

        /**
         * Student password
         * @type {string}
         */
        $scope.password = '';


        /**
         * Mocked for front end only
         * If username and password not entered pop alert
         * Else proceed to main assessment
         */
        $scope.ok = function(){
            if ($scope.userName === '' || $scope.password === '') {
                alert("Username and Password required");
            } else {
                $location.path('trials');
            }
        };

        /**
         * Navigate to goodbye view on quit
         */
        $scope.quit = function(){
            $location.path('goodbye');
        };

    });
