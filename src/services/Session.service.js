(function (module) {

    module.service('Sessions', function (AppState) {


        // Implementations

        function open(params) {
            var gun = params.gun;
            var session = _.find(AppState.state.sessions, {gun: gun});

            if (!session) {
                session = AppState.newSession({
                    gun: gun
                });
            }


            return session;
        }


        // Export

        return {
            open: open
        };
    });

})(angular.module('application'));
