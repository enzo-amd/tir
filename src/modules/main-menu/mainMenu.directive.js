/**
 * Created by YuraVika on 16.08.2015.
 */

(function (module) {

    module.directive('mainMenu', function () {
        return {
            templateUrl: 'modules/main-menu/tpl/main-menu.view.html',
            scope: {},
            controller: function ($scope, $element, $rootScope, Auth) {

                // Pass fields to the $scope
                _.assign($scope, {

                });

                // Pass methods to the $scope
                _.assign($scope, {
                    toggle: toggle,
                    logout: logout
                });


                // Implementations

                function toggle(state) {
                    /*var mdSidenav = $mdSidenav('main-menu');

                    state = _.isUndefined(state) ? !mdSidenav.isOpen() : !!state;

                    var method = state ? 'open' : 'close';

                    mdSidenav[method]();*/
                }

                function logout() {
                    Auth.logout().then(function () {
                        toggle(false);
                    });
                }


                // Watchers

                $rootScope.$on('mainMenu.toggle', function (event, state) {
                    toggle(state);
                });
            }
        };
    });

})(angular.module('application'));
