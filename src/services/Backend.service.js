(function (module) {

    module.service('Backend', function ($q, $injector, $state, Notify) {

        // Implementations

        function call(/*[context,] methodName, arguments...*/) {
            var args = _.slice(arguments);
            var methodName = args.shift();
            var methodFunc = methodName ? _.get(Backendless, methodName) : Backendless;
            var methodNameParts = methodName ? methodName.split('.') : [];
            var context = methodNameParts.length > 1 ? _.get(Backendless, _.initial(methodNameParts).join('.')) : Backendless;

            return $q(function (resolve, reject) {
                var async = new Backendless.Async(
                    function (response) {
                        resolve(response);
                    },
                    function (error) {
                        console.warn(methodName + ' error', error);

                        reject(error);

                        Notify.show({
                            template: '[<%- data.code %>] <%- data.message %>',
                            type: 'error',
                            data: error
                        });

                        if (error.code === 3064) {
                            var Auth = $injector.get('Auth');

                            Auth.logout();
                        }
                    }
                );

                args.push(async);

                methodFunc.apply(context, args);
            });
        }


        // Export

        return {
            call: call
        };
    });

})(angular.module('application'));
