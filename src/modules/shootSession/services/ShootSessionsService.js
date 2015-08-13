(function (module) {

    module.service('ShootSessions', function () {


        var Classes = {
            ShootSessions: function ShootSessions(args) {
                args = args || {};
                this._private_relations = [
                    "tir",
                    "operator"];
                this._private_geoRelations = [];
                this._private_dates = [
                    "startDate",
                    "endDate",
                    "created",
                    "updated"];
                this.___class = "ShootSessions";

                this.gun = args.gun || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 256) - 1)));

                this.startDate = args.startDate || new Date();

                this.endDate = args.endDate || new Date();

                this.shots = args.shots || Number(Math.abs(Math.floor(Math.random() * Math.pow(10, 5) - 1)));

                this.price = args.price || Number(Math.abs(Math.floor(Math.random() * Math.pow(10, 5) - 1)));

                this.ownerId = args.ownerId || String(Math.abs(Math.floor(Math.random() * Math.pow(10, 500) - 1)));

                this.won = args.won || false;

                this.duration = args.duration || Number(Math.abs(Math.floor(Math.random() * Math.pow(10, 5) - 1)));

                this.hits = args.hits || Number(Math.abs(Math.floor(Math.random() * Math.pow(10, 5) - 1)));

                this.created = args.created || new Date();

                this.updated = args.updated || new Date();

                this.tir = args.tir || null;

                this.operator = args.operator || null;

                var storage = Backendless.Persistence.of(ShootSessions);

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

                this.getTir = function () {
                    if (this.tir == null)
                        storage.loadRelations(this, ['tir']);

                    return this.tir;
                };

                this.getOperator = function () {
                    if (this.operator == null)
                        storage.loadRelations(this, ['operator']);

                    return this.operator;
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
