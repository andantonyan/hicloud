var app = angular.module('hiCloud', [
    'ui.bootstrap',
    'ngRoute',
    'ui.router',
    'ngSails'
]);

//Controllers
app.controller('MainCtrl', MainController);

//Services
app.service('testService', TestService);

//Directives

//Filters

//Values

//Interceptor

app.config(function($stateProvider, $urlRouterProvider) {
    
});