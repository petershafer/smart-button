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
    var hello = function(){
        return $timeout(function(){ }, 1000);
    };
    var world = function(){
        var defer = $q.defer();
        $timeout(function(){
            defer.reject();
        }, 1000);
        return defer.promise;
    };
    $rootScope.$on('hello', function(){
      hello().then(function(){
        $rootScope.$broadcast('hello.success');
      }).catch(function(){
        $rootScope.$broadcast('hello.error');
      }).finally(function(){
        $rootScope.$broadcast('hello.done');
      });
    });
    $rootScope.$on('world', function(){
      world().then(function(){
        $rootScope.$broadcast('world.success');
      }).catch(function(){
        $rootScope.$broadcast('world.error');
      }).finally(function(){
        $rootScope.$broadcast('world.done');
      });
    });
  });
