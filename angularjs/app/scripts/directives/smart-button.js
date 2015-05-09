'use strict';

/**
 * @ngdoc directive
 * @name smartbuttonApp.directive:smartbutton
 * @description
 * # The smart button will provide an UX for triggering and responding to a task.
 */
angular.module('smartbuttonApp')
  .directive('smartButton', function () {
    return {
      template: '<a class="btn btn-lg ' +
                    'btn-success smartbutton" ' +
                    'ng-class="{\'btn-success\':!error, \'btn-danger\':error}" '+
                    'ng-disabled="activated" ' +
                    ' ng-click="trigger()">{{ buttonLabel }}</a>',
      restrict: 'E',
      replace: true,
      scope: {
        activeLabel: '@',       // (Optional) A string that’s used as the button’s label while the asynchronous task is being run.
        allowRetry: '@',        // (Optional) Adding this attribute to the element indicates that it can only be pressed once.
        completeLabel: '@',     // (Optional) A string that’s used as the button’s label after the asynchronous task has completed successfully.
        failureLabel: '@',      // (Optional) A string that’s used as the button’s label after the asynchronous task has failed.
        label: '@',             // A string that’s used as the button’s label during an idle state.
        activate: '@'           // This should specify a function or method that performs an asynchronous task and returns a promise that will be fulfilled on completion.
      }, 
      controller: function($scope, $element, $attrs){
        // Additional scope variables
        // allowRetry: Determine if the user is allowed to retry the task.
        //      (Optional) Having this attribute present will allow the user to retry performing the task after it has completed or failed.
        var retry = $attrs.allowRetry !== undefined;
        // Add template suporting variables to scope.
        $scope.activated = false;
        $scope.buttonLabel = $scope.label;
        $scope.error = false;
        // Define controller supporting variables.
        var done = false; // Has the task been completed?
        var result; // Store the promise to complete the task
        // Define click behavior
        $scope.trigger = function(){
            // Cancel subsequent clicks after the user is already done.
            if(($scope.error || done) && !retry){
                return;
            }
            // Set button status to active.
            $scope.activated = true;
            $scope.buttonLabel = $scope.activeLabel || $scope.label;
            $scope.error = false;
            // Trigger the task to complete.
            result = $scope.$emit($attrs.activate);
            // Handle the result of the task.

            $scope.$on($attrs.activate + '.success', function(){
                $scope.buttonLabel = $scope.completeLabel || $scope.label;
                done = true;
            });
            $scope.$on($attrs.activate + '.error', function(){
                $scope.buttonLabel = $scope.failureLabel || $scope.label;
                $scope.error = true;
                done = false;
            });
            $scope.$on($attrs.activate + '.done', function(){
                $scope.activated = false;
            });
        };
      },
      link: function postLink() {
        // Unused
      }
    };
  });
