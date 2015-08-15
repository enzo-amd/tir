/**
 * Created by YuraVika on 16.08.2015.
 */

(function (module) {

    console.log('a');

    module.directive('mainMenu', function () {
        return {
            templateUrl: 'modules/main-menu/tpl/main-menu.view.html',
            scope: {},
            controller: function ($scope, $element) {



            }
        };
    });

})(angular.module('application'));
