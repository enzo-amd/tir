(function (module) {

    module.service('Sessions', function (AppState, ModalService) {


        // Implementations

        function open(params) {
            var gun = params.gun;
            var session = _.find(AppState.state.sessions, {gun: gun});

            if (!session) {
                session = AppState.newSession({
                    gun: gun
                });
            }

            // Just provide a template url, a controller and call 'showModal'.
            ModalService.showModal({
                templateUrl: 'modules/session/tpl/session-modal.view.html',
                controller: 'SessionModalController',
                inputs: {
                    session: session
                }
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                //modal.element.modal();
                //modal.close.then(function(result) {
                //    $scope.message = result ? "You said Yes" : "You said No";
                //});

                mui.overlay('on', {
                    keyboard: true,
                    static: false,
                    onclose: function () {
                        modal.controller.close();
                    }
                }, modal.element[0]);
            });


            return session;
        }


        // Export

        return {
            open: open
        };
    });

})(angular.module('application'));
