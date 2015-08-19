(function (module) {

    module.service('Notify', function (/*$mdToast*/) {


        // Implementations

        function show(params) {
            var messageContent = params.template ? _.template(params.template)({data: params.data}) : params.content;
            var delay = params.delay || 10000;
            /*var toast = $mdToast.simple()
              .content(messageContent)
              .position('top right')
              .hideDelay(delay);

            if (params.type) {
                toast.theme(params.type);
            }

            $mdToast.show(toast);*/

            console.log(messageContent);
        }


        // Export

        return {
            show: show
        };
    });

})(angular.module('application'));
