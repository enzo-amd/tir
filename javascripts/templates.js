angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("modules/app-bar/tpl/app-bar.view.html","<a class=\"mui-pull-right mui-btn mui-btn-flat mui-btn-lg app-bar__icon-btn\" ng-click=\"logout()\" ng-if=\"isLoggedIn()\" title=\"Выйти\">\r\n    <i class=\"material-icons md-24\">close</i>\r\n</a>");
$templateCache.put("modules/guns/tpl/gun-list-item.view.html","<div class=\"-content\">\r\n    <div class=\"gun-list-item__pic gun-list-item__pic--{{ ::gun.name }}\">\r\n        <img class=\"gun-list-item__pic__img\" ng-src=\"images/weapons/{{ gun.image }}\" alt=\"{{ ::gun.title }}\"/>\r\n    </div>\r\n\r\n    <div class=\"gun-list-item__title\">\r\n        {{ ::gun.title }}\r\n    </div>\r\n</div>");
$templateCache.put("modules/guns/tpl/gun-list.view.html","<div ng-repeat=\"gun in guns track by gun.name\" class=\"gun-list-item\" gun-list-item=\"gun\"></div>");
$templateCache.put("modules/guns/tpl/gun-tile.view.html","<div class=\"gun-tile__inner mui-z1 aspect-ration-16-9\">\r\n    <div class=\"-content\">\r\n        <img class=\"gun-list-item__pic__img\" ng-src=\"images/weapons/{{ gun.image }}\" alt=\"{{ ::gun.title }}\"/>\r\n        <div>{{ gun.title }}</div>\r\n    </div>\r\n</div>");
$templateCache.put("modules/guns/tpl/gun-tiles.view.html","<div class=\"mui-row\">\r\n    <div ng-repeat=\"gun in guns track by gun.name\" class=\"mui-col-xs-12 mui-col-sm-6 mui-col-md-3 gun-tile\" gun-tile=\"gun\"></div>\r\n</div>");
$templateCache.put("modules/home/tpl/home.view.html","<md-content class=\"md-padding\">\r\n    <h3>Welcome Home</h3>\r\n\r\n    <!--<div class=\"mui-row\">\r\n        <div class=\"mui-col-xs-12 mui-col-sm-6 mui-col-md-3\" gun-list></div>\r\n        <div class=\"mui-col-xs-12 mui-col-sm-6 mui-col-md-3\">Цены</div>\r\n    </div>-->\r\n\r\n    <div gun-tiles></div>\r\n\r\n</md-content>");
$templateCache.put("modules/login/tpl/login.view.html","<!--<div flex layout=\"row\" layout-align=\"center center\" layout-margin>\r\n    <div flex-sm=\"100\" flex-gt-sm=\"90\" flex-gt-md=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\">\r\n        <md-content class=\"md-padding\">\r\n            <div flex-sm=\"100\" flex-gt-sm=\"80\" layout-sm=\"column\">\r\n                <h3>Авторизация в системе</h3>\r\n\r\n                <treasure-overlay-spinner active=\'vm.spinner.active\'>\r\n                    <form name=\"loginForm\" data-ng-submit=\"vm.login()\">\r\n\r\n                        <md-input-container flex>\r\n                            <label>Адрес электронной почты:</label>\r\n                            <input type=\"email\" ng-model=\"vm.userCredentials.email\" required>\r\n                        </md-input-container>\r\n\r\n                        <md-input-container flex>\r\n                            <label>Пароль:</label>\r\n                            <input type=\"password\" ng-model=\"vm.userCredentials.password\" required>\r\n                        </md-input-container>\r\n\r\n                        <md-input-container>\r\n                            <md-select ng-model=\"vm.tirsState.tir\" placeholder=\"Тир\">\r\n                                <md-option ng-value=\"tir\" ng-repeat=\"tir in vm.tirsState.tirs\">{{ tir.title }}</md-option>\r\n                            </md-select>\r\n                        </md-input-container>\r\n\r\n                        <md-button type=\"submit\" class=\"md-primary\"\r\n                                   ng-class=\"{\'md-raised md-hue-1\': loginForm.$valid }\"\r\n                                   aria-label=\"Submit Login\">Войти\r\n                        </md-button>\r\n\r\n                    </form>\r\n                </treasure-overlay-spinner>\r\n\r\n            </div>\r\n        </md-content>\r\n    </div>\r\n</div>-->\r\n\r\n\r\n<div class=\"mui-container\">\r\n    <div class=\"mui-row\">\r\n        <div class=\"mui-panel\">\r\n            <form name=\"loginForm\" data-ng-submit=\"vm.login()\">\r\n                <legend>Вход в систему</legend>\r\n\r\n                <div class=\"mui-form-group\">\r\n                    <input type=\"email\" class=\"mui-form-control\" ng-model=\"vm.userCredentials.email\" required>\r\n                    <label class=\"mui-form-floating-label\">Логин</label>\r\n                </div>\r\n\r\n                <div class=\"mui-form-group\">\r\n                    <input type=\"password\" class=\"mui-form-control\" ng-model=\"vm.userCredentials.password\" required>\r\n                    <label class=\"mui-form-floating-label\">Пароль</label>\r\n                </div>\r\n\r\n                <button type=\"submit\" class=\"mui-btn mui-btn-primary mui-btn-raised\">Войти</button>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("modules/main-menu/tpl/main-menu.view.html","<md-toolbar>\r\n    <div class=\"md-toolbar-tools\" layout=\"row\">\r\n        <div layout=\"row\" layout-align=\"start center\" flex>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Назад\" ng-click=\"toggle(false)\">\r\n                <md-icon>keyboard_backspace</md-icon>\r\n                <md-tooltip>Назад</md-tooltip>\r\n            </md-button>\r\n        </div>\r\n        <div layout=\"row\" layout-align=\"end center\" flex>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Выйти\" ng-click=\"logout()\">\r\n                <md-icon>power_settings_new</md-icon>\r\n                <md-tooltip>Выйти</md-tooltip>\r\n            </md-button>\r\n        </div>\r\n    </div>\r\n</md-toolbar>\r\n<md-content layout-padding>\r\n    <form>\r\n        <md-input-container>\r\n            <label for=\"testInput\">Test input</label>\r\n            <input type=\"text\" id=\"testInput\"\r\n                   ng-model=\"data\" md-sidenav-focus>\r\n        </md-input-container>\r\n    </form>\r\n    <md-button ng-click=\"close()\" class=\"md-primary\">\r\n        Close Sidenav Left\r\n    </md-button>\r\n</md-content>");}]);