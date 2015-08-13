(function (module) {
    'use strict';

    module.controller('LoginController', LoginController);

    function LoginController($state, Auth, Util) {
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
                  var originalPageInfo = Util.decodeState($state.params.from);

                  if (originalPageInfo) {
                      $state.go(originalPageInfo.state.name, originalPageInfo.params, {reload: true});
                  }
                  else {
                      $state.go('home');
                  }
                })
                .finally(function () {
                    vm.spinner.active = false;
                });
        }

    }

})(angular.module('application'));