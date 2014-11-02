var app = angular.module('hiCloud', [
    'ui.bootstrap',
    'ngRoute',
    'ui.router',
    'sails.io'
]);

//Controllers
app.controller('MainCtrl', MainController);
app.controller('HomeCtrl', HomeController);
app.controller('HeaderCtrl', HeaderController);
app.controller('LoginCtrl', LoginController);
app.controller('RegisterCtrl', RegisterController);
app.controller('DashboardCtrl', DashboardController);
app.controller('CreateAppCtrl', CreateAppController);

//Services
app.factory('localService', LocalServiceFactory);
app.factory('appService', AppServiceFactory);
app.factory('auth', AuthFactory);

//Directives

//Filters

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