angular.module('services').service('points', function () {
    var allPointIds = []

    return {
        setPointIds: function (pointIds) {
            allPointIds = pointIds;
        },
        getPointIds: function () {
            return allPointIds;
        }
    }
});
