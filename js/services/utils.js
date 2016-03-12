angular.module('services').service('utils', ['$window', function ($window) {
    var _exists = function (input) {
        return !_.isUndefined(input) && !_.isNull(input);
    };
    return {
        exists: _exists
    }
}]);
