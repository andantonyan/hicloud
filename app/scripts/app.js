var app = angular.module('hiCloud', [
    'ui.bootstrap',
    'ngRoute',
    'ui.router',
    'sails.io',
    'ngLodash'
]);

//Controllers
app.controller('MainCtrl', MainController);
app.controller('HomeCtrl', HomeController);
app.controller('HeaderCtrl', HeaderController);
app.controller('LoginCtrl', LoginController);
app.controller('RegisterCtrl', RegisterController);
app.controller('DashboardCtrl', DashboardController);
app.controller('CreateAppCtrl', CreateAppController);
app.controller('ShowAppsCtrl', ShowAppsController);
app.controller('AccountSettingsCtrl', AccountSettingsController);

//Services
app.factory('localService', LocalServiceFactory);
app.factory('appService', AppServiceFactory);
app.factory('userService', UserServiceFactory);
app.factory('authService', AuthServiceFactory);

//Directives

//Filters
app.filter('dots', function () {
    return function(input, len) {
        if (input) {
            return input.substring(0, len - 1) + (input.length > len - 1 ? '...' : '');
        }
    }
});

//Values

//Interceptors
app.factory('authInterceptor', AuthInterceptor);
app.factory('authInterceptorSocket', AuthInterceptorSocket);

//Constants

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $sailsSocketProvider) {
	$httpProvider.interceptors.push('authInterceptor');
    $sailsSocketProvider.interceptors.push('authInterceptorSocket');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/build/views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/build/views/auth/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'login'
		})
		.state('registr', {
			url: '/register',
			templateUrl: '/build/views/auth/register.html',
			controller: 'RegisterCtrl',
			controllerAs: 'register'
		})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/build/views/dashboard/index.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard'
		});

	$urlRouterProvider.otherwise('/home');
});