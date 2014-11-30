'use strict';

/**
 * @ngdoc function
 * @name smartbuttonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartbuttonApp
 */
angular.module('smartbuttonApp')
  .controller('MainCtrl', function ($scope, $timeout, $q) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.hello = function(world){
        console.log("loading....");
        return $timeout(function(){
            console.log(world)
            console.log("....all done");
        }, 1000)
    }
    $scope.world = function(){
        var defer = $q.defer();
        $timeout(function(){
            defer.reject();
        }, 1000)
        return defer.promise;
    }
  });
