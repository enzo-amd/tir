/**
 * Created by Yury.Sergunin on 28.08.2015.
 */

(function (module) {

    module.directive('gunTile', function () {
        return {
            templateUrl: 'modules/guns/tpl/gun-tile.view.html',
            scope: {
                gun: '=gunTile'
            },
            controller: function ($scope, Sessions) {

                // Pass fields to the $scope
                _.assign($scope, {});

                // Pass methods to the $scope
                _.assign($scope, {
                    openGunSession: openGunSession
                });


                // Initialize


                // Implementations

                function openGunSession() {
                    var gun = $scope.gun;
                    var session = Sessions.open(gun);

                    console.log(session);
                }

            }
        };
    });

})(angular.module('application'));
