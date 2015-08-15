angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("modules/home/templates/home.view.html","<md-content class=\"md-padding\">\n    <h3>Welcome Home</h3>\n</md-content>");
$templateCache.put("modules/login/templates/login.view.html","<div flex layout=\"row\" layout-align=\"center center\" layout-margin>\n    <div flex-sm=\"100\" flex-gt-sm=\"90\" flex-gt-md=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\">\n        <md-content class=\"md-padding\">\n            <div flex-sm=\"100\" flex-gt-sm=\"80\" layout-sm=\"column\">\n                <h3>Авторизация в системе</h3>\n\n                <treasure-overlay-spinner active=\'vm.spinner.active\'>\n                    <form name=\"loginForm\" data-ng-submit=\"vm.login()\">\n\n                        <md-input-container flex>\n                            <label>Адрес электронной почты:</label>\n                            <input type=\"email\" ng-model=\"vm.userCredentials.email\" required>\n                        </md-input-container>\n\n                        <md-input-container flex>\n                            <label>Пароль:</label>\n                            <input type=\"password\" ng-model=\"vm.userCredentials.password\" required>\n                        </md-input-container>\n\n                        <md-input-container>\n                            <md-select ng-model=\"vm.tirsState.tir\" placeholder=\"Тир\">\n                                <md-option ng-value=\"tir\" ng-repeat=\"tir in vm.tirsState.tirs\">{{ tir.title }}</md-option>\n                            </md-select>\n                        </md-input-container>\n\n                        <md-button type=\"submit\" class=\"md-primary\"\n                                   ng-class=\"{\'md-raised md-hue-1\': loginForm.$valid }\"\n                                   aria-label=\"Submit Login\">Войти\n                        </md-button>\n\n                    </form>\n                </treasure-overlay-spinner>\n\n            </div>\n        </md-content>\n    </div>\n</div>");}]);