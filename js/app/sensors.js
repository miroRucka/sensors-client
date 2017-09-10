'use strict';
angular.module('controllers', []);
angular.module('directives', []);
angular.module('filters', []);
angular.module('services', []);

var _dependencies = function () {
    var result = [];
    //external
    result.push('pascalprecht.translate');
    result.push('highcharts-ng');
    result.push('ui.router');
    result.push('ui.utils');
    result.push('ui.jq');
    result.push('blockUI');
    //internal
    result.push('directives');
    result.push('filters');
    result.push('controllers');
    result.push('services');
    result.push('app.templates');
    return result;
};
angular.module('sensors', _dependencies());
angular.module('sensors').value("pointsIds", {});
angular.module('sensors').run(function ($http, sensorsConstants) {
    $http({
        method: 'GET',
        url: 'api/sensors/all-points',
        headers: sensorsConstants.headers
    }).then(function (result) {
        sensorsConstants.points = result.data;
    });
});
