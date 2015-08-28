(function (module) {
  'use strict';

  module.controller('LoginController', LoginController);

  function LoginController($rootScope, $state, Auth, Util, Tirs) {
    var vm = this;


    var userCredentials = {
      email: 'user1@mail.com',
      password: '123456789'
    };

    var logoutPromise = Auth.logout();


    // Pass fields to the View
    _.assign(vm, {
      userCredentials: userCredentials,
      tirsState: Tirs.state
    });


    // Pass methods to the View
    _.assign(vm, {
      login: login
    });


    // Initialize

    (function () {
      $rootScope.$emit('spinner', true);

      logoutPromise.then(function () {
        return Tirs.getTirs()
          .then(function (tirs) {
            Tirs.state.tir = Tirs.state.tir || tirs[0];
          });
      })
        .finally(function () {
          $rootScope.$emit('spinner', false);
        });
    })();


    // Implementations

    function login() {
      $rootScope.$emit('spinner', true);

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
          $rootScope.$emit('spinner', false);
        });
    }

  }

})(angular.module('application'));