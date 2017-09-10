/**
 * this is module for rest api
 */
angular.module('services').service('dataService', function ($http, sensorsConstants) {
    var _last = function _last(pointId) {
        return $http({
            method: 'GET',
            url: 'api/sensors/' + pointId + '/last',
            headers: sensorsConstants.headers
        });
    };
    var _today = function _today(pointId) {
        return $http({
            method: 'GET',
            url: 'api/sensors/' + pointId + 'today',
            headers: sensorsConstants.headers
        });
    };
    var _12hours = function _12hours(pointId) {
        return $http({
            method: 'GET',
            url: 'api/sensors/' + pointId + '/last/12hour',
            headers: sensorsConstants.headers
        });
    };
    var _readPhoto = function (photoId) {
        return $http({
            method: 'GET',
            url: '/api/sensors/photo/' + photoId,
            headers: sensorsConstants.headers
        });
    };
    var _lastPhotoInfo = function (pointId) {
        return $http({
            method: 'GET',
            url: '/api/sensors/photo/' + pointId + '/last',
            headers: sensorsConstants.headers
        });
    };
    return {
        last: _last,
        last12hours: _12hours,
        today: _today,
        readPhoto: _readPhoto,
        lastPhotoInfo: _lastPhotoInfo
    }
});