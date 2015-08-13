(function (module) {

    module.service('ShootSessions', function () {


        var Classes = {
            ShootSession: function ShootSession(args) {
                args = args || {};
                this._private_relations = [];
                this._private_geoRelations = [];
                this._private_dates = [
                    'updated',
                    'created'];
                this.___class = 'ShootSession';

                this.name = args.name || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                this.updated = args.updated || new Date();

                this.ownerId = args.ownerId || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                this.created = args.created || new Date();

                this.level = args.level || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                this.value = args.value || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 5) - 1)));

                this.policy = args.policy || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                var storage = Backendless.Persistence.of(ShootSession);

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


        return {
            Classes: Classes,

            login: function () {
                var userLoggedIn = function (user) {
                    console.log('login', user);
                };
                var gotError = function (error) {
                    console.log('login error', error);
                };

                Backendless.UserService.login('user1@mail.com', '123456789', false, new Backendless.Async(userLoggedIn, gotError));
            }
        };
    });

})(angular.module('application'));
