angular.module('controllers').controller('HomeController', function ($scope, dataService, utils, $timeout, sensorsConstants, pressureChart, humidityChart, temperatureChart, $filter, trend, sensorsConstants) {

        var vm = this;
        var timeoutPromise;
        var stompClient = Stomp.client("ws://" + sensorsConstants.messaging.url + "/stomp", "v11.stomp");
        stompClient.connect(atob(sensorsConstants.messaging.user), atob(sensorsConstants.messaging.pass), function () {
            console.log('successful connect...');
        });
        stompClient.debug = function (str) {
        };

        /**charts**/
        var _defaultChart = function (height) {
            return {
                options: {
                    chart: {
                        height: height
                    }
                },
                title: 'sensors...',
                loading: true
            };
        };
        vm.chartPressureConfig = _defaultChart(150);
        vm.chartHumidityConfig = _defaultChart(150);
        vm.chartTemperatureConfig = _defaultChart(194);
        var ok = function (chartData) {
            var dataPressure = [];
            var dataHumidity = [];
            var dataTemperature = {
                series: [[], [], [], []]
            };
            var cat = [];
            var sorted = _.sortBy(chartData, function (item) {
                return item.timestamp;
            });
            _.each(sorted, function (item) {
                dataPressure.push(item.pressure);
                dataHumidity.push(item.humidity);
                _.each(item.temperature, function (temp, index) {
                    dataTemperature.series[index].push(temp.value);
                });
                //dataTemperature.series[3].push(item.light);
                cat.push($filter('date')(new Date(item.timestamp), 'HH:mm'));
            });
            vm.chartPressureConfig = pressureChart(dataPressure, cat);
            vm.chartHumidityConfig = humidityChart(dataHumidity, cat);
            vm.chartTemperatureConfig = temperatureChart(dataTemperature, cat);
            vm.trendHumidity = trend.computeTrend(dataHumidity);
            vm.trendPressure = trend.computeTrend(dataPressure);
        };


        var _getSensorData = function () {
            vm.loading = true;
            dataService.last().success(function (response) {
                vm.sensorData = utils.exists(response) && _.isArray(response) ? _.first(response) : response;
                vm.loading = false;
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
        };

        vm.sendMessage = function () {
            console.log('sending message ...');
            stompClient.send("/queue/test", {}, "I thought I was in a transaction!");
        };

        $scope.$on('$destroy', function (event, data) {
            stompClient.disconnect(function () {
                console.log('disconnecting from stomp server ...');
            });
        });

    }
);