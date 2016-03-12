angular.module('controllers').controller('HomeController', function ($scope, dataService, utils, $timeout, sensorsConstants, pressureChart,humidityChart, $filter) {

    var vm = this;
    var timeoutPromise;

    /**charts**/
    var getNotEmptyLength = function (chartData) {
        return utils.exists(chartData) ? _.filter(chartData, function (item) {
            return utils.exists(item.pressure)
        }).length : 0;
    };
    var _defaultChart = function () {
        return {
            options: {
                chart: {
                    height: 150
                }
            },
            title: 'sensors...',
            loading: true
        };
    };
    var _MAX_ITEM = 20;
    vm.chartPressureConfig = _defaultChart();
    vm.chartHumidityConfig = _defaultChart();
    var ok = function (chartData) {
        var chartDataLength = getNotEmptyLength(chartData);
        var dataPressure = [];
        var dataHumidity = [];
        var cat = [];
        var mod = chartDataLength > _MAX_ITEM ? (chartDataLength / _MAX_ITEM) : 0;
        mod = Math.round(mod);
        var sorted = _.sortBy(chartData, function (item) {
            return item.timestamp;
        });
        _.each(sorted, function (item, index) {
            var canPush = mod === 0 || (index % mod) == 0;
            if (canPush && utils.exists(item.pressure) && item.pressure !== 0) {
                dataPressure.push(item.pressure);
                dataHumidity.push(item.humidity);
                cat.push($filter('date')(new Date(item.timestamp), 'HH:mm'));
            }
        });
        vm.chartPressureConfig = pressureChart(dataPressure, cat);
        vm.chartHumidityConfig = humidityChart(dataHumidity, cat);
    };


    var _getSensorData = function () {
        dataService.last().success(function (response) {
            vm.sensorData = utils.exists(response) && _.isArray(response) ? _.first(response) : response;
        });
        timeoutPromise = $timeout(_getSensorData, sensorsConstants.refreshTime);
    };

    _getSensorData();
    dataService.last12hours().success(ok);

    vm.reload = function () {
        if (utils.exists(timeoutPromise)) {
            $timeout.cancel(timeoutPromise);
        }
        _getSensorData();
        dataService.last12hours().success(ok);
    }
});