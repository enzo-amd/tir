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


})();