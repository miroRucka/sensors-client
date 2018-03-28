angular.module('controllers').controller('NTController', function (dataService) {
    var vm = this;

    var isNtActive = function () {
        vm.nt = false;
        dataService.nt().success(function () {
            vm.nt = true;
        });
    };

    vm.isNtActive = isNtActive;
    isNtActive();
});