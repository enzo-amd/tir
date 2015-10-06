(function (module) {

    module.service('Util', function ($injector) {


        // Implementations

        function getStateInheritedAccessRules(state) {
            var $state = $injector.get('$state');

            state = state || $state.current;

            var meta = _.transform(state.name.split('.'), function (meta, stateNamePart) {
                meta.stateName = (meta.stateName ? meta.stateName + '.' : '') + stateNamePart;

                var state = $state.get(meta.stateName);
                var access = state && state.access;

                access && _.assign(meta.access, access);
            }, {
                stateName: '',
                access: {}
            });

            return meta.access;
        }

        /**
         * Converts current state and it's parameters to the such string: @games_slug.rewards?slug=smoke-arcanoid
         * @returns {string}
         */
        function encodeState(state, stateParams) {
            if (!state) {
                var $state = $injector.get('$state');

                state = $state.current;
                stateParams = $state.params;
            }

            var encodedState = '@' + state.name;

            var query = _(stateParams)
              .omit(_.isUndefined)
              .map(function (value, key) {
                  return encodeURIComponent(key) + '=' + encodeURIComponent(value);
              })
              .join('&');

            if (query) {
                encodedState = encodedState + '?' + query;
            }

            return encodedState;
        }

        /**
         * Decodes state and state parameters from the string like @games_slug.rewards?slug=smoke-arcanoid
         * @param {string} encodedState
         * @returns {Object|null}
         */
        function decodeState(encodedState) {
            var $state = $injector.get('$state');
            var stateInfo = null;

            if (encodedState) {

                if (_.startsWith(encodedState, '@')) {
                    var elements = encodedState.split('?');
                    var stateName = _.trimLeft(elements.shift(), '@');
                    var state = $state.get(stateName);

                    if (state) {
                        var params = elements.length && _(elements[0].split('&'))
                            .map(function (queryParam) {
                                return queryParam.split('=');
                            })
                            .zipObject()
                            .value() || {};

                        stateInfo = {
                            state: state,
                            params: params
                        };
                    }
                }
            }

            return stateInfo;
        }

        function serializeQueryParams(params) {
            var result = '';

            if (_.isObject(params)) {
                params = _.pick(params, angular.isDefined);

                result = $.param(params);

                if (result) {
                    result = '?' + result;
                }
            }

            return result;
        }



        // Export

        return {
            getStateInheritedAccessRules: getStateInheritedAccessRules,

            encodeState: encodeState,
            decodeState: decodeState,

            serializeQueryParams: serializeQueryParams
        };
    });

})(angular.module('application'));
