angular.module('controllers').controller('OutsideController', function (dataService, utils, $timeout, sensorsConstants, pressureChart, humidityChart, temperatureChart, $filter, trend) {

        var vm = this;
        var timeoutPromise;

        var _getSensorData = function () {
            vm.loading = true;
            dataService.last().success(function (response) {
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
            dataService.last12hours().success(ok);
        }
    }
);