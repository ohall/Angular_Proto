/**
 * Created with JetBrains WebStorm.
 * User: oakley
 * Date: 6/10/13
 * Time: 11:36 AM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

angular.module('SRIProtoWebStormApp')
    .controller('LoginCtrl', function ($scope,$routeParams,$location) {
        $scope.loginID = $routeParams.loginID;

        $scope.userName='';
        $scope.password='';


        $scope.ok = function(){

            if($scope.userName == '' || $scope.password == ''){
                alert("Username and Password required");
            }else{
                $location.path('main');
            }
        }

        $scope.quit = function(){

        }

    });
