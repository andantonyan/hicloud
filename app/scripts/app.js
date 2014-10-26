var app = angular.module('hiCloud', [
    'ui.bootstrap',
    'ngRoute',
    'ui.router',
    'ngSails'
]);

//Controllers
app.controller('MainCtrl', MainController);

//Services
app.factory('testService', testService);

//Directives

//Filters

//Values

//Interceptor

app.config(function($stateProvider, $urlRouterProvider) {
    
});