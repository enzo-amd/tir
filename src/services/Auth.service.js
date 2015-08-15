/**
 * Created by YuraVika on 13.08.2015.
 */

(function (module) {

    module.service('Auth', function ($q, $state, Notify, Backend) {

        var state = {
            user: null
        };


        // Implementations

        function login(userCredentials) {
            var promise = Backend.call('UserService.login', userCredentials.email, userCredentials.password, true);

            promise.then(function (user) {
                console.info('login', user);

                Notify.show({
                    template: 'Добро пожаловать, <%- data.name %>!',
                    type: 'success',
                    data: user
                });
            });

            return promise;
        }

        function logout() {
            var promise = Backend.call('UserService.logout');

            promise.then(function () {
                console.info('logout');

                $state.go('login');
            });

            return promise;
        }

        function userTokenIsValid() {
            var success = function (data) {
                console.log('userTokenIsValid', data);
            };
            var error = function (data) {
                console.log('error', data);
            };

            Backendless.UserService.isValidLogin(new Backendless.Async(success, error));
        }

        function isLoggedIn() {
            var user = state.user = state.user || Backendless.LocalCache.get('current-user');

            return !!user;
        }

        function showLogin(params) {
            $state.go('login', params);
        }



        // Export

        return {
            state: state,

            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            showLogin: showLogin
        };
    });

})(angular.module('application'));
