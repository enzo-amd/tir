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


        $urlRouterProvider.otherwise('/notfound');

        $stateProvider
            .state('login', {
                url: '/login', templateUrl: 'modules/login/templates/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
        ;
    }

    function run($rootScope, $state, $stateParams) {

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
        });
    }


})();