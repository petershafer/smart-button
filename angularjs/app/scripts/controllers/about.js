'use strict';

/**
 * @ngdoc function
 * @name smartbuttonApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the smartbuttonApp
 */
angular.module('smartbuttonApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
