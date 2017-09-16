angular.module('controllers').controller('HomeController', function ($scope, $stateParams, dataService, utils, $timeout, sensorsConstants, pressureChart, humidityChart, temperatureChart, $filter, trend) {
        var photoUploadedDestination = '/topic/photo-uploaded';

        var vm = this;
        var timeoutPromise;
        var stompClient = Stomp.client("ws://" + sensorsConstants.messaging.url + "/stomp", "v11.stomp");
        stompClient.connect(atob(sensorsConstants.messaging.user), atob(sensorsConstants.messaging.pass), function () {
            console.log('successful connect...');
            stompClient.subscribe(photoUploadedDestination, function (data) {
                var message = JSON.parse(data.body);
                if (data.body && message.locationId !== _getDefaultPointId()) {
                    console.log('not for me!');
                    return;
                }
                $scope.$apply(function () {
                    console.log('photo uploaded', data);
                    vm.lastPhoto = '/sensors/photo/' + message._id
                })
            });
        });
        stompClient.debug = function (str) {
        };

        var _getDefaultPointId = function () {
            if (!utils.exists($stateParams.pointId)) {
                return sensorsConstants.points[0].id;
            }
            return $stateParams.pointId;
        };

        (function _getLastPhotoData() {
            dataService.lastPhotoInfo(_getDefaultPointId()).success(function (response) {
                vm.lastPhoto = '/sensors/photo/' + response._id;
            });
        })();

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
                if (item.humidity < 100) {
                    dataPressure.push(item.pressure);
                    dataHumidity.push(item.humidity);
                    _.each(item.temperature, function (temp, index) {
                        dataTemperature.series[index].push(temp.value);
                    });
                    //dataTemperature.series[3].push(item.light);
                    cat.push($filter('date')(new Date(item.timestamp), 'HH:mm'));
                }
            });
            vm.chartPressureConfig = pressureChart(dataPressure, cat);
            vm.chartHumidityConfig = humidityChart(dataHumidity, cat);
            vm.chartTemperatureConfig = temperatureChart(dataTemperature, cat);
            vm.trendHumidity = trend.computeTrend(dataHumidity);
            vm.trendPressure = trend.computeTrend(dataPressure);
        };


        var _getSensorData = function () {
            vm.loading = true;
            dataService.last(_getDefaultPointId()).success(function (response) {
                vm.sensorData = utils.exists(response) && _.isArray(response) ? _.first(response) : response;
                vm.loading = false;
            });
            timeoutPromise = $timeout(_getSensorData, sensorsConstants.refreshTime);
        };

        _getSensorData();
        dataService.last12hours(_getDefaultPointId()).success(ok);

        vm.reload = function () {
            if (utils.exists(timeoutPromise)) {
                $timeout.cancel(timeoutPromise);
            }
            _getSensorData();
            dataService.last12hours(_getDefaultPointId()).success(ok);
        };

        vm.sendMessage = function () {
            var message = JSON.stringify({
                pointId: _getDefaultPointId()
            });
            console.log("message is: ", message);
            stompClient.send("/topic/take-photo", {}, message);
        };

        $scope.$on('$destroy', function () {
            if (timeoutPromise) {
                $timeout.cancel(timeoutPromise);
            }
            stompClient.unsubscribe(photoUploadedDestination);
            stompClient.disconnect(function () {
                console.log('disconnecting from stomp server ...');
            });
        });
    }
);