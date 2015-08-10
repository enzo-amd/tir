(function (module) {

    module.directive('shootSessionList', function () {
        return {
            scope: {},
            controller: function ($scope, $element, ShootSessions) {
                console.log(ShootSessions);


            },
            template: '<div>Hello!</div>'
        };
    });

})(angular.module('app'));
