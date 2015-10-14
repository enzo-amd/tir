(function (module) {

    module.controller('SessionModalController', function ($scope, close, session) {
        var self = this;


        // Export the controller's API
        _.assign(self, {
            close: doClose
        });


        // Export API to the $scope
        _.assign($scope, {
            session: session,

            close: doClose
        });


        // Implementations

        function doClose(result) {
            console.log('close');

            close(result);
        }


        // Watchers

        $scope.$on('$destroy', function () {
            console.log('$destroy');
        });

    });

})(angular.module('application'));
