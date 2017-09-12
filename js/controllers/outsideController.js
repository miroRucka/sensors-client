angular.module('controllers').controller('OutsideController', function (dataService, utils, $timeout, sensorsConstants) {

        var vm = this;
        var timeoutPromise;

        var _getSensorData = function () {
            vm.loading = true;
            dataService.last(sensorsConstants.points[0].id).success(function (response) {
                vm.sensorData = utils.exists(response) && _.isArray(response) ? _.first(response) : response;
                vm.loading = false;
            });
            timeoutPromise = $timeout(_getSensorData, sensorsConstants.refreshTime);
        };

        _getSensorData();

        vm.reload = function () {
            if (utils.exists(timeoutPromise)) {
                $timeout.cancel(timeoutPromise);
            }
            _getSensorData();
        }
    }
);