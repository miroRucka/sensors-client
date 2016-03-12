angular.module('services').factory('chartConfig', function (utils) {
    //this config is awful, but what can i do?
    return function (options) {
        var result = {
            options: {
                chart: {
                    type: 'spline',
                    zoomType: null,
                    backgroundColor: '#ffffff'
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                loading: {
                    labelStyle: 'display:none'
                }
            },
            series: [],
            title: {
                text: undefined
            },
            yAxis: {
                showEmpty: false
            },
            xAxis: {
                labels: {
                    rotation: -45
                },
                title: {
                    text: 'Čas'
                },
                type: 'datetime'
            },
            loading: false,
            hasData: function () {
                return utils.exists(this.series) && !_.isEmpty(this.series) && utils.exists(_.first(this.series).data) && _.first(this.series).data.length > 0;
            }
        };
        _.extend(result.options, options.options);
        _.extend(result.series, options.series);
        _.extend(result.xAxis, options.xAxis);
        _.extend(result.yAxis, options.yAxis);
        return result;
    };
});

angular.module('services').factory('temperatureChart', function (chartConfig) {
    return function (data, cat) {
        return chartConfig({
            options: {
                tooltip: {
                    formatter: function () {
                        return 'Teplota <b>' + this.y +
                            '</b><br/>v čase <b>' + this.x + '</b>';
                    },
                    followTouchMove: false,
                    followPointer: false
                }
            },
            series: [{
                color: "#23b7e5",
                type: "area",
                id: "series-0",
                data: data
            }],
            yAxis: {
                title: {
                    text: 'Teplota °C'
                }
            },
            xAxis: {
                categories: cat
            }
        });
    };
});

angular.module('services').factory('pressureChart', function (chartConfig, $filter) {
    return function (data, cat) {
        return chartConfig({
            options: {
                tooltip: {
                    formatter: function () {
                        return "Tlak <b>" + $filter('digits')(this.y) +
                            "</b><br/>v čase <b>" + this.x + "</b>";
                    },
                    followTouchMove: false,
                    followPointer: false
                },
                chart: {
                    height: 150
                }
            },
            series: [{
                color: "#fbbd08",
                type: "area",
                id: "series-0",
                fillOpacity: 0.1,
                lineWidth: 1,
                marker: {
                    radius: 2
                },
                data: data,
            }],
            yAxis: {
                title: {
                    text: undefined
                },
                min: 970
            },
            xAxis: {
                categories: cat,
                title: {
                    text: undefined
                },
                labels: {
                    enabled: false
                }
            }
        });
    };
});

angular.module('services').factory('humidityChart', function (chartConfig, $filter) {
    return function (data, cat) {
        return chartConfig({
            options: {
                tooltip: {
                    formatter: function () {
                        return "Vlhkosť <b>" + $filter('digits')(this.y) +
                            "</b><br/>v čase <b>" + this.x + "</b>";
                    },
                    followTouchMove: false,
                    followPointer: false
                },
                chart: {
                    height: 150
                }
            },
            series: [{
                color: "#fbbd08",
                type: "area",
                id: "series-0",
                fillOpacity: 0.1,
                lineWidth: 1,
                marker: {
                    radius: 2
                },
                data: data,
            }],
            yAxis: {
                title: {
                    text: undefined
                }
            },
            xAxis: {
                categories: cat,
                title: {
                    text: undefined
                },
                labels: {
                    enabled: false
                }
            }
        });
    };
});