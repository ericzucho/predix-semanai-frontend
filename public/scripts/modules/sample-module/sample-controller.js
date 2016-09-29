define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCtrl', ['$scope', '$http', function($scope, $http) {
        function fillEnginesDropdown($scope,$http) {
            $http({
                method: 'GET',
                url: 'http://localhost:12121/engines/list',
                headers: {

                }
            }).
            success(function(data){
                $scope.engines = data;
                console.log($scope.data);
                console.log('Successful call');
            });
        };

        function getDataForEngine($scope,$http,engineNumber) {
            $http({
                method: 'GET',
                url: 'http://localhost:12121/engineTable/' + engineNumber,
                headers: {

                }
            }).
            success(function(data){
                $scope.engineData = data;
                console.log($scope.engineData);
                console.log('Successful call');
            });
        };
        fillEnginesDropdown($scope,$http);
        getDataForEngine($scope,$http,700101);
        document.getElementById('enginesDropdown').addEventListener('dropdown_content_value_changed', function(e) {
            var selectedEngine = e.detail;
            $scope.selectedEngine = selectedEngine.textValue;
            console.log($scope.currentESN);
            $scope.engineData = [];
            getDataForEngine($scope, $http, $scope.selectedEngine);
        });



    }]);
});
