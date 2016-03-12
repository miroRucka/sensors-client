/**
 * this is module for rest api
 */
angular.module('services').service('dataService', ['$http', function ($http) {
    var _last = function _last() {
        return $http({
            method: 'GET',
            url: 'api/sensors/last',
            headers: {
                'Accept-Type': 'application/json',
                'Authorization': 'c3VzbGlrOmJ1Ym8=',
            }
        });
    };
    return {
        last: _last
    }
}]);