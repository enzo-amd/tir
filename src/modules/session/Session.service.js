(function (module) {

    module.service('Sessions', function (AppState, ModalService) {


        // Implementations

        function open(params) {
            var gun = params.gun;
            var session = _.find(AppState.state.sessions, {gun: gun});
            var isNewSession = false;

            if (!session) {
                isNewSession = true;
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

                var closed = false;
                var overlay = true;

                mui.overlay('on', {
                    keyboard: true,
                    static: false,
                    onclose: function () {
                        overlay = false;

                        !closed && modal.controller.close(false);
                    }
                }, modal.element[0]);

                modal.close.then(function (result) {
                    closed = true;
                    overlay && mui.overlay('off');

                    if (isNewSession) {
                        if (!result) {
                            AppState.cancelSession(session);
                        }
                    }

                    console.log('closed with result:', result);
                });
            });


            return session;
        }


        // Export

        return {
            open: open
        };
    });

})(angular.module('application'));
