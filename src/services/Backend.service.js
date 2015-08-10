(function (module) {

    module.service('Backend', [
        'Cookies',
        '$http',
        '$q',
        function (Cookies, $http, $q) {
            var APP_ID, APP_TYPE, SECRET, VER;
            APP_ID = 'E6F0499F-1DBA-2433-FF0B-5B5B86D38700';
            SECRET = '85FE93BF-B03A-9159-FFE0-180BD9BA5F00';
            VER = 'v1';
            APP_TYPE = 'REST';
            this.userToken = Cookies.get('user-token');
            this.isAuthorized = function() {
                return this.userToken != null;
            };
            this.clearUserToken = function() {
                this.userToken = null;
                return Cookies.del('user-token');
            };
            this.makeRequest = function(url, data, method) {
                var headers, options;
                headers = {
                    'application-id': APP_ID,
                    'secret-key': SECRET,
                    'application-type': APP_TYPE,
                    'Content-Type': 'application/json'
                };
                if (this.userToken) {
                    headers['user-token'] = this.userToken;
                }
                method = method != null ? method : 'POST';
                options = {
                    method: method,
                    url: "https://api.backendless.com/" + VER + "/" + url,
                    headers: headers
                };
                if (method === 'GET') {
                    options.params = data;
                } else {
                    options.data = data;
                }
                return $http(options);
            };
            this.register = function(email, password) {
                var deferred;
                deferred = $q.defer();
                this.makeRequest('users/register', {
                    email: email,
                    password: password
                }).success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status) {
                        return deferred.reject(data);
                    };
                })(this));
                return deferred.promise;
            };
            this.login = function(email, password) {
                var deferred;
                deferred = $q.defer();
                this.makeRequest('users/login', {
                    login: email,
                    password: password
                }).success((function(_this) {
                    return function(data, status) {
                        _this.userToken = data['user-token'];
                        Cookies.set('user-token', _this.userToken, 30);
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status) {
                        return deferred.reject(data);
                    };
                })(this));
                return deferred.promise;
            };
            return this;
        }
    ]);

})(angular.module('app'));
