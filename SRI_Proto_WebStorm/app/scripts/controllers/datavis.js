/**
 * Created with JetBrains WebStorm.
 * User: oakley
 * Date: 6/6/13
 * Time: 4:40 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module('SRIProtoWebStormApp')
    .controller('DataVisCtrl', function ($scope) {

    });


function DataVisCtrl($scope, $routeParams) {
    $scope.datavisID = $routeParams.datavisID;
}