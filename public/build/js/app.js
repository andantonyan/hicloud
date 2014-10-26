"use strict";
var MainController = function MainController($scope, testService) {
  this.scope = $scope;
  this.testService = testService;
};
($traceurRuntime.createClass)(MainController, {init: function() {
    var self = this;
    this.testService.getData().then(function(data) {
      self.scope.sails = data;
    }).catch(console.log);
  }}, {});
var TestService = function TestService($q, $sails) {
  this.q = $q;
  this.sails = $sails;
};
($traceurRuntime.createClass)(TestService, {getData: function() {
    var deferred = this.q.defer();
    this.sails.get('/test').success(function(data) {
      deferred.resolve(data);
    }).error(function(error) {
      deferred.reject(new Error('error when trying to get data: ' + error));
    });
    return deferred.promise;
  }}, {});
var testService = function($q, $sails) {
  return new TestService($q, $sails);
};
var app = angular.module('hiCloud', ['ui.bootstrap', 'ngRoute', 'ui.router', 'ngSails']);
app.controller('MainCtrl', MainController);
app.factory('testService', testService);
app.config(function($stateProvider, $urlRouterProvider) {});
