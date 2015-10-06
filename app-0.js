
var APPLICATION_ID = 'D2B53F5F-CED5-27D8-FFCE-93A8FB63E000',
    SECRET_KEY = '82714740-213B-F349-FF36-B80FFE6C5300',
    VERSION = 'v1'; //default application version;
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);


/*var user = new Backendless.User();
user.email = "user1@mail.com";
user.password = "123456789";
user.name = "user1";
Backendless.UserService.register(user);*/





var batchModule = angular.module('app', []);