/**
 * Created by Yury.Sergunin on 28.08.2015.
 */

(function (module) {

  module.directive('gunListItem', function () {
    return {
      templateUrl: 'modules/guns/tpl/gun-list-item.view.html',
      scope: {
        gun: '=gunListItem'
      },
      controller: function ($scope, Guns) {

        // Pass fields to the $scope
        _.assign($scope, {

        });

        // Pass methods to the $scope
        _.assign($scope, {

        });


        // Initialize


        // Implementations

      }
    };
  });

})(angular.module('application'));
