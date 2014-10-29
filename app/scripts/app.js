var app = angular.module('hiCloud', [
    'ui.bootstrap',
    'ngRoute',
    'ui.router',
    'ngSails'
]);

//Controllers
app.controller('MainCtrl', MainController);
app.controller('HomeCtrl', HomeController);

//Services
app.factory('localService', LocalServiceFactory);
app.factory('auth', AuthFactory);
app.factory('currentUser', CurrentUserFactory);

//Directives

//Filters

//Values

//Interceptors
app.factory('authInterceptor', AuthInterceptor);
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

//Constants
app.constant('accessLevels', AccessLevelsConstant);


app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/build/views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		});

	$urlRouterProvider.otherwise('/home');
});