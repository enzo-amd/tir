/**
 * Created by Yury.Sergunin on 28.08.2015.
 */

(function (module) {

  module.directive('spinner', function () {
    return {
      scope: {
        isActive: '=?spinner'
      },
      controller: function ($scope, $rootScope) {

        var options = {
          overlay: {
            keyboard: false, // teardown when <esc> key is pressed (default: true)
            static: true, // maintain overlay when clicked (default: false)
            onclose: function() { // execute function when overlay is closed
              overlay = null;
              toggle(false);
            }
          }
        };

        var overlay = null;

        // Pass fields to the $scope
        _.assign($scope, {

        });

        // Pass methods to the $scope
        _.assign($scope, {

        });


        // Implementations

        function toggle(state) {
          if (state) {
            var $spinner = $(
              '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
              '   <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
              '</svg>'
            );

            $spinner.appendTo(document.body);

            overlay = mui.overlay('on', options.overlay, $spinner[0]);

            $(overlay).addClass('spinner-overlay');
          }
          else if (overlay) {
            mui.overlay('off');
            overlay = null;
          }

          $scope.isActive = !!state;
        }


        // Watchers

        $scope.$watch('isActive', function () {
          toggle($scope.isActive);
        });

        (function () {
          if (_.isUndefined($scope.isActive)) {
            console.log('set on');

            var off = $rootScope.$on('spinner', function (event, state) {
              console.trace('on', state);

              $scope.isActive = !!state;
            });

            $scope.$on('$destroy', function () {
              console.log('set off');

              off();
            });
          }
        })();

      }
    };
  });

})(angular.module('application'));
