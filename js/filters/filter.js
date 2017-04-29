angular.module('filters').filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});
angular.module('filters').filter('percentage', function ($window, utils) {
    return function (input, decimals, suffix) {
        decimals = angular.isNumber(decimals) ? decimals : 3;
        suffix = utils.exists(suffix) ? suffix : '%';
        if ($window.isNaN(input)) {
            return '';
        }
        return Math.round(input * Math.pow(10, decimals + 2)) / Math.pow(10, decimals) + suffix
    };
});
angular.module('filters').filter('hPa', function (utils) {
    return function (input) {
        return utils.exists(input) && _.isNumber(input) ? input / 100 : input;
    };
});
angular.module('filters').filter('digits', function (utils) {
    return function (input, decimals) {
        decimals = angular.isNumber(decimals) ? decimals : 2;
        return utils.exists(input) ? input.toFixed(decimals) : input;
    };
});