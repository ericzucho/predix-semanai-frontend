define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCtrl2', ['$scope', '$http', function($scope, $http) {
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
                url: 'http://localhost:12121/engines/' + engineNumber,
                headers: {

                }
            }).
            success(function(data){
                $scope.minY = 9999999;
                $scope.maxY = 0;
                data.forEach(getMinAndMax);
                $scope.maxY =  Math.round($scope.maxY + 1000)*100/100 ;
                $scope.minY =  Math.round($scope.minY- 1000)*100/100 ;
                if ($scope.minY < 0){
                    $scope.minY = 0;
                }
                $scope.engineData = data;
                console.log($scope.data);
                console.log('Successful call');
            });
        };
        fillEnginesDropdown($scope,$http);
        getDataForEngine($scope,$http,700101);
        document.getElementById('enginesDropdown').addEventListener('dropdown_content_value_changed', function(e) {
            var selectedEngine = e.detail;
            $scope.selectedEngine = selectedEngine.textValue;
            console.log($scope.currentESN);
            getDataForEngine($scope, $http, $scope.selectedEngine);
        });
        function getMinAndMax(element, index, array) {
            //console.log(element[1]);
            if (element[1] > $scope.maxY){
                $scope.maxY = element[1];
            }
            if (element[1] < $scope.minY){
                $scope.minY = element[1];
            }
        }
    }]);
});
