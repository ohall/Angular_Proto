/**
 * Created with JetBrains WebStorm.
 * User: oakley
 * Date: 6/11/13
 * Time: 11:10 AM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

describe('LoginCtrl', function() {

    it('should create "userName" equal to ""',
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
                ctrl = $controller("LoginCtrl", {$scope: scope });

            expect(scope.userName).toBe("");
        }));

    it('should create "password" equal to ""',
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
                ctrl = $controller("LoginCtrl", {$scope: scope });

            expect(scope.password).toBe("");
       }));


    beforeEach(angular.mock.module('SRIProtoWebStormApp'));

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        this.scope = $rootScope.$new();
        $controller('LoginCtrl', {
            $scope: this.scope
        });
        console.log("Unit Testing login.js")
    }));

});