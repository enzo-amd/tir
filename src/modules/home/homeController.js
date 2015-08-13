(function (module) {
    'use strict';

    module.controller('HomeController', HomeController);

    function HomeController() {
        var vm = this;


        // Pass fields to the View
        _.assign(vm, {
            spinner: {
                active: false
            }
        });


        // Pass methods to the View
        _.assign(vm, {

        });



        // Implementations



    }

})(angular.module('application'));