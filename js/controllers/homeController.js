angular.module('controllers').controller('HomeController', function ($scope, dataService, utils, $timeout, sensorsConstants) {
    var _getSensorData = function () {
        dataService.last().success(function (response) {
            $scope.sensorData = utils.exists(response) && _.isArray(response) ? _.first(response) : response;
        });
        $timeout(_getSensorData, sensorsConstants.refreshTime);
    };

    _getSensorData();
});