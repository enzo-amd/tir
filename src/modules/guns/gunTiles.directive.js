/**
 * Created by Yury.Sergunin on 28.08.2015.
 */

(function (module) {

  module.directive('gunTiles', function () {
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

      }
    };
  });

})(angular.module('application'));
