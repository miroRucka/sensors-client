angular.module('controllers').controller('MenuController', function (sensorsConstants) {
    var vm = this;
    vm.points = sensorsConstants.points;
});