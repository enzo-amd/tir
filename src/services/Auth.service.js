/**
 * Created by YuraVika on 13.08.2015.
 */

(function (module) {

    module.service('Auth', function ($q, $state, Notify) {

        var state = {
            user: null
        };


        // Implementations

        function login(userCredentials) {
            return $q(function (resolve, reject) {
                var userLoggedIn = function (user) {
                    console.info('login', user);

                    state.user = user;

                    resolve(user);

                    Notify.show({
                        template: 'Добро пожаловать, <%- data.name %>!',
                        type: 'success',
                        data: user
                    });
                };
                var gotError = function (error) {
                    console.warn('login error', error);

                    reject(error);

                    Notify.show({
                        template: '[<%- data.code %>] <%- data.message %>',
                        type: 'error',
                        data: error
                    });
                };

                Backendless.UserService.login(userCredentials.email, userCredentials.password, true, new Backendless.Async(userLoggedIn, gotError));
            });
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
            isLoggedIn: isLoggedIn,
            showLogin: showLogin
        };
    });

})(angular.module('application'));
