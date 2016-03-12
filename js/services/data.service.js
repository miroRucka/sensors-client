/**
 * this is module for rest api
 */
angular.module('services').service('dataService', ['$http', function ($http) {
    var _timeLapseFindMonth = function _timeLapseFindMonth(pointId) {
        return $http({
            method: 'GET',
            url: '/api/time-lapse-month/?pointId=' + pointId
        });
    };
    return {
        timeLapseFindMonth: _timeLapseFindMonth
    }
}]);