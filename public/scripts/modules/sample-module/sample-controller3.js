define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCtrl3', ['$scope', '$http', function($scope, $http) {

        function getCriticalEngines($scope,$http,engineNumber) {
            $http({
                method: 'GET',
                url: 'http://localhost:12121/engines/critical',
                headers: {

                }
            }).
            success(function(data){
                $scope.engineData = data;
                console.log($scope.engineData);
            });
        };
        getCriticalEngines($scope,$http);
    }]);
});
