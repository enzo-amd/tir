(function () {
    'use strict';

    angular.module('templates', []);

    angular.module('app', [
        'ngRoute',
        'ngCookies',
        //'ui.bootstrap',
        //'ngAnimate',
        'ngMaterial',
        'templates'
    ])
        .config(config)
        .run(run);
    /*.controller(function () {

     });*/


    config.$inject = ['$routeProvider', '$locationProvider', '$mdIconProvider'];
    function config($routeProvider, $locationProvider, $mdIconProvider) {

        $mdIconProvider
          //.iconSet('social', 'img/icons/sets/social-icons.svg', 24)
          .iconSet('social', './bower_components/angular-material/demos/icon/demoSvgIconSets/assets/core-icons.svg', 24)
          .defaultIconSet('./bower_components/angular-material/demos/icon/demoSvgIconSets/assets/core-icons.svg', 24);

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'modules/login/templates/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }


})();