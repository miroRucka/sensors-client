angular.module('services').service('trend', function (utils) {

    var _UP = "up";
    var _DOWN = "down";
    var _RIGHT = "right";

    var MIN_LENGHT = 7;
    var ACTUAL_SAMPLE = 2;

    var _computeTrend = function (data) {
        if (!(utils.exists(data) && _.isArray(data) && data.length > MIN_LENGHT)) {
            return '';
        }
        var length = data.length;
        var historyAvg = _avg(data.slice(length - MIN_LENGHT, length - ACTUAL_SAMPLE));
        var actualAvg = _avg(data.slice(length - ACTUAL_SAMPLE, length));

        var result = actualAvg - historyAvg;
        if (result > 1) {
            return _UP
        } else if (result < -1) {
            return _DOWN
        }
        return _RIGHT;
    };

    var _avg = function (data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += parseInt(data[i], 10);
        }
        return sum / data.length;
    };
    return {
        computeTrend: _computeTrend
    }
});
