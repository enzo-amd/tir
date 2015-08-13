(function (module) {

    module.service('Tirs', function ($q, Notify) {

        var state = {
            tir: null,
            tirs: null
        };


        // Implementations

        var Classes = {
            Tirs: function Tirs(args) {
                args = args || {};
                this._private_relations = [];
                this._private_geoRelations = [];
                this._private_dates = [
                    "created",
                    "updated"];
                this.___class = "Tirs";

                this.ownerId = args.ownerId || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                this.created = args.created || new Date();

                this.updated = args.updated || new Date();

                this.title = args.title || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                this.name = args.name || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                var storage = Backendless.Persistence.of(Tirs);

                this.save = function (async) {
                    delete this._private_relations;
                    delete this._private_geoRelations;
                    delete this._private_dates;
                    storage.save(this, async);
                };

                this.remove = function (async) {
                    var result = storage.remove(this, async);
                    this.objectId = null;
                    return result;
                };

            }
        };


        function getTirs() {
            return $q(function (resolve, reject) {
                var success = function (response) {
                    console.info('getTirs', response);

                    state.tirs = response.data;

                    resolve(state.tirs);
                };
                var error = function (error) {
                    console.warn('getTirs error', error);

                    reject(error);

                    Notify.show({
                        template: '[<%- data.code %>] <%- data.message %>',
                        type: 'error',
                        data: error
                    });
                };

                if (state.tirs) {
                    resolve(state.tirs);
                }
                else {
                    Backendless.Persistence.of( Classes.Tirs ).find( new Backendless.Async(success, error) );
                }
            });
        }


        // Export

        return {
            Classes: Classes,
            state: state,

            getTirs: getTirs
        };
    });

})(angular.module('application'));
