/**
 * this is module for rest api
 */
angular.module('services').service('dataService', function ($http, sensorsConstants) {
    var _last = function _last() {
        return $http({
            method: 'GET',
            url: 'api/sensors/last',
            headers: sensorsConstants.headers
        });
    };
    var _today = function _today() {
        return $http({
            method: 'GET',
            url: 'api/sensors/today',
            headers: sensorsConstants.headers
        });
    };
    var _12hours = function _12hours() {
        return $http({
            method: 'GET',
            url: 'api/sensors/last/12hour',
            headers: sensorsConstants.headers
        });
    };
    return {
        last: _last,
        last12hours: _12hours,
        today: _today
    }
});