/**
 * Created by Yury.Sergunin on 28.08.2015.
 */

(function (module) {

    module.directive('gunTiles', function (AppState, Sessions) {
        return {
            templateUrl: 'modules/guns/tpl/gun-tiles.view.html',
            scope: {},
            controller: function ($scope, Guns) {

                // Pass fields to the $scope
                _.assign($scope, {
                    guns: null
                });

                // Pass methods to the $scope
                _.assign($scope, {
                    openGunSession: openGunSession
                });


                // Initialize

                fetchGuns();


                // Implementations

                function fetchGuns() {
                    Guns.getGuns()
                        .then(function (guns) {
                            $scope.guns = guns;
                        });
                }

                function openGunSession() {
                    var gun = this.gun;
                    var session = Sessions.open(gun);

                    console.log(session);
                }

            }
        };
    });

})(angular.module('application'));
