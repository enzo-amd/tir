
var paths = {
  dist: 'dist',
  //cdn: '../tmp',
  //controllers: 'src/common/javascripts/controllers/*.js',
  //services: ['src/app/services/services.js', 'src/app/services/*Service.js'],
  //directives: 'src/common/javascripts/directives/*.js',
  //filters: 'src/app/filters/*.js',
  //templates: ['src/app/templates/**/*.html', 'src/app/modules/**/*.html'],
  js: ['src/**/*.js'],
  stylesheets: ['src/stylesheets/*.less'],
  stylesheetIncludes: ['src/stylesheets/includes']
};

var prod = {
  services: ['src/common/javascripts/services/services.js',
    'src/common/javascripts/services/AuthService.js',
    'src/common/javascripts/services/NotificationService.js',
    'src/common/javascripts/services/WalletService.js',
    'src/common/javascripts/services/MessagesService.js',
    'src/common/javascripts/services/ProfileService.js',
    'src/common/javascripts/services/EventsService.js',
    'src/common/javascripts/services/AccountService.js',
    'src/common/javascripts/services/UtilService.js',
    'src/common/javascripts/services/AuthHttpInterceptorService.js'],
  controllers: ['src/common/javascripts/controllers/NavCtrl.js',
    'src/common/javascripts/controllers/LoginSignupCtrl.js',
    'src/common/javascripts/hand/LoginCtrl.js',
    'src/common/javascripts/controllers/NotFoundCtrl.js',
    'src/common/javascripts/controllers/WelcomeCtrl.js',
    'src/common/javascripts/controllers/AccountRegistrationCtrl.js',
    'src/common/javascripts/controllers/AccountRegistrationSuccess.js'
  ],
  directives: ['src/common/javascripts/directives/InputBirthdayDirective.js',
    'src/common/javascripts/directives/RemoteErrorValidatorDirective.js',
    'src/common/javascripts/directives/NoWhiteSpaceDirective.js',
    'src/common/javascripts/directives/FullEmailDirective.js'
  ],
  templates: ['src/common/templates/403.html',
    'src/common/templates/403.html',
    'src/common/templates/403.html',
    'src/common/templates/front.html',
    'src/common/templates/loginsignup.html',
    'src/common/templates/input-birthday.html',
    'src/common/templates/signup.html',
    'src/common/templates/signup-success.html',
    'src/common/templates/termsofservice.html',
    'src/common/templates/privacypolicy.html',
    'src/common/templates/login.html']
};

var bowerPaths = {
  bowerDirectory: 'vendor',
  bowerrc: '.bowerrc',
  bowerJson: 'bower.json'
};

exports.paths = paths;
exports.prod = prod;
exports.bowerPaths = bowerPaths;

