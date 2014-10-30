var app = angular.module('hiCloud', [
    'ui.bootstrap',
    'ngRoute',
    'ui.router',
    'ngSails'
]);

//Controllers
app.controller('MainCtrl', MainController);
app.controller('HomeCtrl', HomeController);
app.controller('HeaderCtrl', HeaderController);
app.controller('LoginCtrl', LoginController);
app.controller('RegisterCtrl', RegisterController);

//Services
app.factory('localService', LocalServiceFactory);
app.factory('auth', AuthFactory);

//Directives

//Filters

//Values

//Interceptors
app.factory('authInterceptor', AuthInterceptor);
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

//Constants


app.config(function($stateProvider, $urlRouterProvider) {
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
		});

	$urlRouterProvider.otherwise('/home');
});