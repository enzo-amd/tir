(function (module) {

    module.controller('SessionModalController', function ($scope, close, session) {
        var self = this;

        var sessionModalModes = {
            price: 0,
            done: 1
        };

        var prices = [
            100,
            200,
            300,
            400,
            500
        ];


        // Export the controller's API
        _.assign(self, {
            close: doClose
        });


        // Export API to the $scope
        _.assign($scope, {
            close: doClose,

            session: session,

            sessionModalModes: sessionModalModes,
            sessionModalMode: sessionModalModes.price,

            prices: prices,

            setPrice: setPrice
        });


        // Implementations

        function doClose(result) {
            console.log('close', result);

            close(result);
        }

        function setPrice(price) {
            session.price = price;

            doClose(true);
        }


        // Watchers

        $scope.$on('$destroy', function () {
            console.log('$destroy');
        });

    });

})(angular.module('application'));
