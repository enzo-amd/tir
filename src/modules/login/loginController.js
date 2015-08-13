(function (module) {
    'use strict';

    module.controller('LoginController', LoginController);

    function LoginController(Auth) {
        var vm = this;


        var userCredentials = {
            email: 'user1@mail.com',
            password: '123456789'
        };


        // Pass fields to the View
        _.assign(vm, {
            userCredentials: userCredentials,
            spinner: {
                active: false
            }
        });


        // Pass methods to the View
        _.assign(vm, {
            login: login
        });



        // Implementations

        function login() {
            vm.spinner.active = true;

            console.log('auth');

            Auth.login(vm.userCredentials)
                .then(function pass() {

                })
                .finally(function () {
                    vm.spinner.active = false;
                });
        }

    }

})(angular.module('application'));