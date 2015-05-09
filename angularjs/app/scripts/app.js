'use strict';

/**
 * @ngdoc overview
 * @name smartbuttonApp
 * @description
 * # smartbuttonApp
 *
 * Main module of the application.
 */
angular
  .module('smartbuttonApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .run(function($rootScope, $timeout, $q){
    $rootScope.hello = function(){
        return $timeout(function(){ }, 1000);
    };
    $rootScope.world = function(){
        var defer = $q.defer();
        $timeout(function(){
            defer.reject();
        }, 1000);
        return defer.promise;
    };
  });
