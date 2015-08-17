(function () {
    'use strict';

    angular.module('templates', []);

    angular.module('application', [
        'ngRoute',
        'ui.router',
        //'ui.bootstrap',
        //'ngAnimate',
        'ngMaterial',
        'treasure-overlay-spinner',
        'templates'
    ])
        .config(config)
        .run(run);
    /*.controller(function () {

     });*/


    function config($stateProvider, $locationProvider, $urlRouterProvider, $mdIconProvider, $mdThemingProvider) {

        $mdIconProvider
          //.iconSet('social', 'img/icons/sets/social-icons.svg', 24)
          .iconSet('social', './bower_components/angular-material/demos/icon/demoSvgIconSets/assets/core-icons.svg', 24)
          .defaultIconSet('./bower_components/angular-material/demos/icon/demoSvgIconSets/assets/core-icons.svg', 24);

        $mdThemingProvider.theme('success');
        $mdThemingProvider.theme('error');


        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', {
                url: '/', templateUrl: 'modules/home/templates/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                access: {
                    loginRequired: true
                }
            })
            .state('login', {
                url: '/login?from', templateUrl: 'modules/login/templates/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
        ;


        // attach http interceptor
        //$httpProvider.interceptors.push(['$q', function($q) {
        //    return {
        //        response: function(response) {
        //            console.log(response);
        //
        //            // response.status === 200
        //            return response || $q.when(response);
        //        },
        //        responseError: function(rejection) {
        //            // Executed only when the XHR response
        //            // has an error status code
        //
        //            console.log(rejection);
        //
        //            if (rejection.status == 401) {
        //
        //                // The interceptor "blocks" the error;
        //                // and the success callback will be executed.
        //
        //                rejection.data = {stauts: 401, descr: 'unauthorized'};
        //                return rejection.data;
        //            }
        //
        //            // $q.reject creates a promise that is resolved as
        //            // rejected with the specified reason.
        //            // In this case the error callback will be executed.
        //
        //            return $q.reject(rejection);
        //        }
        //    }
        //}]);

        //$locationProvider.html5Mode(true);
    }
    config.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider", "$mdIconProvider", "$mdThemingProvider"];

    function run($rootScope, $state, $stateParams, Util, Auth) {

        /**
         * Init Backendless
         */
        (function () {
            var APPLICATION_ID = 'D2B53F5F-CED5-27D8-FFCE-93A8FB63E000',
                SECRET_KEY = '82714740-213B-F349-FF36-B80FFE6C5300',
                VERSION = 'v1'; //default application version;

            Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
        })();


        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeStart', toState);

            var access = Util.getStateInheritedAccessRules(toState);

            if (access.loginRequired && !Auth.isLoggedIn()) {
                event.preventDefault();

                Auth.showLogin({from: Util.encodeState(toState, toParams)});
            }
        });
    }
    run.$inject = ["$rootScope", "$state", "$stateParams", "Util", "Auth"];


})();
/**
 * Created by YuraVika on 13.08.2015.
 */

(function (module) {

    module.service('Auth', ["$q", "$state", "Notify", "Backend", function ($q, $state, Notify, Backend) {

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
            var promise = isLoggedIn() ? Backend.call('UserService.logout') : $q.when(true);

            promise.then(function () {
                console.info('logout');

                state.user = null;

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
    }]);

})(angular.module('application'));

(function (module) {

    module.service('Backend', ["$q", "$injector", "$state", "Notify", function ($q, $injector, $state, Notify) {

        // Implementations

        function call(/*[context,] methodName, arguments...*/) {
            var args = _.slice(arguments);
            var methodName = args.shift();
            var methodFunc = methodName ? _.get(Backendless, methodName) : Backendless;
            var methodNameParts = methodName ? methodName.split('.') : [];
            var context = methodNameParts.length > 1 ? _.get(Backendless, _.initial(methodNameParts).join('.')) : Backendless;

            return $q(function (resolve, reject) {
                var async = new Backendless.Async(
                    function (response) {
                        resolve(response);
                    },
                    function (error) {
                        console.warn(methodName + ' error', error);

                        reject(error);

                        Notify.show({
                            template: '[<%- data.code %>] <%- data.message %>',
                            type: 'error',
                            data: error
                        });

                        if (error.code === 3064) {
                            var Auth = $injector.get('Auth');

                            Auth.logout();
                        }
                    }
                );

                args.push(async);

                methodFunc.apply(context, args);
            });
        }


        // Export

        return {
            call: call
        };
    }]);

})(angular.module('application'));

(function (module) {

    module.service('Notify', ["$mdToast", function ($mdToast) {


        // Implementations

        function show(params) {
            var messageContent = params.template ? _.template(params.template)({data: params.data}) : params.content;
            var delay = params.delay || 10000;
            var toast = $mdToast.simple()
              .content(messageContent)
              .position('top right')
              .hideDelay(delay);

            if (params.type) {
                toast.theme(params.type);
            }

            $mdToast.show(toast);
        }


        // Export

        return {
            show: show
        };
    }]);

})(angular.module('application'));

(function (module) {

    module.service('Tirs', ["$q", "Notify", function ($q, Notify) {

        var state = {
            tir: null,
            tirs: null
        };


        // Implementations

        var Classes = {
            Tirs: function Tirs(args) {
                args = args || {};
                this._private_relations = [];
                this._private_geoRelations = [];
                this._private_dates = [
                    "created",
                    "updated"];
                this.___class = "Tirs";

                this.ownerId = args.ownerId || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                this.created = args.created || new Date();

                this.updated = args.updated || new Date();

                this.title = args.title || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                this.name = args.name || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                var storage = Backendless.Persistence.of(Tirs);

                this.save = function (async) {
                    delete this._private_relations;
                    delete this._private_geoRelations;
                    delete this._private_dates;
                    storage.save(this, async);
                };

                this.remove = function (async) {
                    var result = storage.remove(this, async);
                    this.objectId = null;
                    return result;
                };

            }
        };


        function getTirs() {
            return $q(function (resolve, reject) {
                var success = function (response) {
                    console.info('getTirs', response);

                    state.tirs = response.data;

                    resolve(state.tirs);
                };
                var error = function (error) {
                    console.warn('getTirs error', error);

                    reject(error);

                    Notify.show({
                        template: '[<%- data.code %>] <%- data.message %>',
                        type: 'error',
                        data: error
                    });
                };

                if (state.tirs) {
                    resolve(state.tirs);
                }
                else {
                    Backendless.Persistence.of( Classes.Tirs ).find( new Backendless.Async(success, error) );
                }
            });
        }


        // Export

        return {
            Classes: Classes,
            state: state,

            getTirs: getTirs
        };
    }]);

})(angular.module('application'));

(function (module) {

    module.service('Util', ["$injector", function ($injector) {


        // Implementations

        function getStateInheritedAccessRules(state) {
            var $state = $injector.get('$state');

            state = state || $state.current;

            var meta = _.transform(state.name.split('.'), function (meta, stateNamePart) {
                meta.stateName = (meta.stateName ? meta.stateName + '.' : '') + stateNamePart;

                var state = $state.get(meta.stateName);
                var access = state && state.access;

                access && _.assign(meta.access, access);
            }, {
                stateName: '',
                access: {}
            });

            return meta.access;
        }

        /**
         * Converts current state and it's parameters to the such string: @games_slug.rewards?slug=smoke-arcanoid
         * @returns {string}
         */
        function encodeState(state, stateParams) {
            if (!state) {
                var $state = $injector.get('$state');

                state = $state.current;
                stateParams = $state.params;
            }

            var encodedState = '@' + state.name;

            var query = _(stateParams)
              .omit(_.isUndefined)
              .map(function (value, key) {
                  return encodeURIComponent(key) + '=' + encodeURIComponent(value);
              })
              .join('&');

            if (query) {
                encodedState = encodedState + '?' + query;
            }

            return encodedState;
        }

        /**
         * Decodes state and state parameters from the string like @games_slug.rewards?slug=smoke-arcanoid
         * @param {string} encodedState
         * @returns {Object|null}
         */
        function decodeState(encodedState) {
            var $state = $injector.get('$state');
            var stateInfo = null;

            if (encodedState) {

                if (_.startsWith(encodedState, '@')) {
                    var elements = encodedState.split('?');
                    var stateName = _.trimLeft(elements.shift(), '@');
                    var state = $state.get(stateName);

                    if (state) {
                        var params = elements.length && _(elements[0].split('&'))
                            .map(function (queryParam) {
                                return queryParam.split('=');
                            })
                            .zipObject()
                            .value() || {};

                        stateInfo = {
                            state: state,
                            params: params
                        };
                    }
                }
            }

            return stateInfo;
        }

        function serializeQueryParams(params) {
            var result = '';

            if (_.isObject(params)) {
                params = _.pick(params, angular.isDefined);

                result = $.param(params);

                if (result) {
                    result = '?' + result;
                }
            }

            return result;
        }



        // Export

        return {
            getStateInheritedAccessRules: getStateInheritedAccessRules,

            encodeState: encodeState,
            decodeState: decodeState,

            serializeQueryParams: serializeQueryParams
        };
    }]);

})(angular.module('application'));

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
(function (module) {
    'use strict';

    module.controller('LoginController', LoginController);

    function LoginController($state, Auth, Util, Tirs) {
        var vm = this;


        var userCredentials = {
            email: 'user1@mail.com',
            password: '123456789'
        };

        var logoutPromise = Auth.logout();


        // Pass fields to the View
        _.assign(vm, {
            userCredentials: userCredentials,
            tirsState: Tirs.state,

            spinner: {
                active: false
            }
        });


        // Pass methods to the View
        _.assign(vm, {
            login: login
        });


        // Initialize

        (function () {
            vm.spinner.active = true;

            logoutPromise.then(function () {
                return Tirs.getTirs()
                    .then(function (tirs) {
                        Tirs.state.tir = Tirs.state.tir || tirs[0];
                    });
            })
                .finally(function () {
                    vm.spinner.active = false;
                });
        })();


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
    LoginController.$inject = ["$state", "Auth", "Util", "Tirs"];

})(angular.module('application'));
/**
 * Created by YuraVika on 16.08.2015.
 */

(function (module) {

    module.directive('mainMenu', function () {
        return {
            templateUrl: 'modules/main-menu/tpl/main-menu.view.html',
            scope: {},
            controller: ["$scope", "$element", "$rootScope", "$mdSidenav", "Auth", function ($scope, $element, $rootScope, $mdSidenav, Auth) {

                // Pass fields to the $scope
                _.assign($scope, {

                });

                // Pass methods to the $scope
                _.assign($scope, {
                    toggle: toggle,
                    logout: logout
                });


                // Implementations

                function toggle(state) {
                    var mdSidenav = $mdSidenav('main-menu');

                    state = _.isUndefined(state) ? !mdSidenav.isOpen() : !!state;

                    var method = state ? 'open' : 'close';

                    mdSidenav[method]();
                }

                function logout() {
                    Auth.logout().then(function () {
                        toggle(false);
                    });
                }


                // Watchers

                $rootScope.$on('mainMenu.toggle', function (event, state) {
                    toggle(state);
                });
            }]
        };
    });

})(angular.module('application'));

/**
 * Created by YuraVika on 16.08.2015.
 */

(function (module) {

    module.controller('MainToolbarController', ["$rootScope", function ($rootScope) {
        var vm = this;

        _.assign(vm, {
           toggleMainMenu:  toggleMainMenu
        });


        // Implementations

        function toggleMainMenu(state) {
            $rootScope.$emit('mainMenu.toggle', state);
        }

    }]);


})(angular.module('application'));
//# sourceMappingURL=../../dist/javascripts/app.js.map