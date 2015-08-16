/**
 * Created by YuraVika on 16.08.2015.
 */

(function (module) {

    module.controller('MainToolbarController', function ($rootScope) {
        var vm = this;

        _.assign(vm, {
           toggleMainMenu:  toggleMainMenu
        });


        // Implementations

        function toggleMainMenu(state) {
            $rootScope.$emit('mainMenu.toggle', state);
        }

    });


})(angular.module('application'));