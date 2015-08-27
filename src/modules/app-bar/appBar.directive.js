/**
 * Created by Yury.Sergunin on 27.08.2015.
 */

(function (module) {

  module.directive('appBar', function () {
    return {
      templateUrl: 'modules/app-bar/tpl/app-bar.view.html',
      scope: {},
      controller: function ($scope, $element, $rootScope, Auth) {

        // Pass fields to the $scope
        _.assign($scope, {

        });

        // Pass methods to the $scope
        _.assign($scope, {
          isLoggedIn: Auth.isLoggedIn,
          logout: logout
        });


        // Implementations

        function logout() {
          Auth.logout();
        }
      }
    };
  });

})(angular.module('application'));
