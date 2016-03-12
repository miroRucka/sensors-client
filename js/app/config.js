var module = angular.module('sensors');
module.config(function ($translateProvider, blockUIConfig) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'l10n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('sk');
    $translateProvider.useSanitizeValueStrategy(null);
    blockUIConfig.autoBlock = true;
    blockUIConfig.templateUrl = 'templates/loader.html';

});
module.constant("sensorsConstants", {
    refreshTime: 30000,
    headers: {
        'Accept-Type': 'application/json',
        'Authorization': 'c3VzbGlrOmJ1Ym8=',
    }
});