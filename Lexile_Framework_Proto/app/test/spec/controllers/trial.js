'use strict';

describe('MainCtrl', function() {


    it('should create "trialIndex" equal to "0"',
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
                ctrl = $controller("MainCtrl", {$scope: scope });

            expect(scope.trialIndex).toBe(0);
        }));


    it('should create "getTrials" with length greater than "2"',
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
                ctrl = $controller("MainCtrl", {$scope: scope });

            expect(scope.getTrials.length).toBeGreaterThan(2);
        }));


    it('should create "selectedIndex" equal to "-1"',
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
                ctrl = $controller("MainCtrl", {$scope: scope });

            expect(scope.selectedIndex).toBe(-1);
        }));


    it('should create "questionText" equal to "getTrials[trialIndex].question"',
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new(),
                ctrl = $controller("MainCtrl", {$scope: scope });

            expect(scope.questionText).toBe(scope.getTrials[scope.trialIndex].question);
            console.log(scope.getTrials[scope.trialIndex].question);
        }));



    beforeEach(angular.mock.module('SRIProtoWebStormApp'));

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        this.scope = $rootScope.$new();
        $controller('MainCtrl', {
            $scope: this.scope
        });
        console.log("Unit Testing getTrials.js");
    }));
});