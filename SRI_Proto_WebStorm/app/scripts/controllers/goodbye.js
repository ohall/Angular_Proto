/**
 * Created with JetBrains WebStorm.
 * User: oakley
 * Date: 6/4/13
 * Time: 6:12 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('SRIProtoWebStormApp')
    .controller('GoodByeCtrl', function ($scope) {


});

function GoodByeCtrl($scope, $routeParams) {
    $scope.goodbyeID = $routeParams.goodbyeID;
}