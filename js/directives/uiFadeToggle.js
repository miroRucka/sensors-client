angular.module('directives').directive('uiFadeToggle', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.uiFadeToggle, function (val, oldVal) {
                if (val === oldVal) return; // Skip inital call
                // console.log('change');
                element[val ? 'fadeIn' : 'fadeOut'](500);
            });
        }
    }
});