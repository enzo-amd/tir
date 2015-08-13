/**
 * Created by YuraVika on 13.08.2015.
 */

(function (module) {

    module.service('Auth', function ($q, $mdToast) {

        // Implementations

        function login(userCredentials) {
            var promise = $q(function (resolve, reject) {
                var userLoggedIn = function (user) {
                    console.info('login', user);

                    resolve(user);
                };
                var gotError = function (error) {
                    console.warn('login error', error);

                    reject(error);
                };

                Backendless.UserService.login(userCredentials.email, userCredentials.password, false, new Backendless.Async(userLoggedIn, gotError));
            });

            var message = {
                template: null,
                type: null,
                data: null
            };

            promise
                .then(function (user) {
                    _.assign(message, {
                        template: 'Добро пожаловать, <%- data.name %>!',
                        type: 'success',
                        data: user
                    });
                })
                .catch(function (error) {
                    _.assign(message, {
                        template: '[<%- data.code %>] <%- data.message %>',
                        type: 'error',
                        data: error
                    });
                })
                .finally(function () {
                    var messageContent = _.template(message.template)({data: message.data});

                    $mdToast.show(
                        $mdToast.simple()
                            .content(messageContent)
                            .position('top right')
                            .theme(message.type)
                            .hideDelay(30000)
                    );
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

        function isAuthentificated() {
            return Backendless.LocalCache.get('current-user');
        }



        // Export

        return {
            login: login
        };
    });

})(angular.module('application'));
