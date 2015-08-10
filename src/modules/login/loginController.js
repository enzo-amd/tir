(function (module) {
    'use strict';

    module.controller('LoginController', LoginController);

    LoginController.$inject = ['$location'/*, 'AuthenticationService', 'FlashService'*/];
    function LoginController($location/*, AuthenticationService, FlashService*/) {
        var vm = this;

        vm.login = login;

        /*(function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();*/

        function login() {
            vm.dataLoading = true;

            console.log('auth');

            /*AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });*/
        }
    }

})(angular.module('app'));