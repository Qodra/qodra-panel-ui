'use strict';

var authentication = angular.module('Authentication', []);
angular.module('Home', []);

var app = angular.module('qodra-app', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngResource',
    'ngCookies'
]);
app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'partials/authentication/login.tpl.html',
            hideMenus: true
        })
         .when('/videos',{
                templateUrl: 'partials/videos.tpl.html',
                controller: 'VideosController'
        })
        .when('/manual_tag',{
                templateUrl: 'partials/manual_tag.tpl.html',
                controller: 'ManualTagController'
        })
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'partials/home/home.tpl.html'
        })
         .otherwise({ redirectTo: '/login' });
}]);

app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            $rootScope.hideMenus = next['hideMenus'];
        });
        
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $rootScope.hideMenus = next['hideMenus'];
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
}]);

app.factory("Videos", function($resource) {
  return $resource("data/videos.json");
});

app.factory("Tags", function($resource) {
  return $resource("data/tags.json",{}, {
       query: { method: "GET", isArray: false }
  });
});