var _           = require('lodash');
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var bowerFiles  = require('main-bower-files');

var paths       = require('./paths').paths;
var bowerPaths  = require('./paths').bowerPaths;

function setJQueryFirst(files) {
  var jqueryPath = _.find(files, function(path) {
    return path.match(/jquery.js$/);
  });
  if (jqueryPath) {
    var index = files.indexOf(jqueryPath);
    files.splice(index, 1);
    files.unshift(jqueryPath);
  }
}

gulp.task('vendorjs', function() {
  var files = bowerFiles({
    paths: bowerPaths,
    filter: function(path) {
      return path.substr(-3) === '.js' && path.substr(-6) !== 'min.js';
    }
  });
  setJQueryFirst(files);
  return gulp.src(files)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.distrib + '/javascripts'));
});

gulp.task('hand', function() {
  return gulp.src('./javascripts/hand/Physics2DPlugin.min.js')
    .pipe(gulp.dest(paths.distrib + '/javascripts'));
});

gulp.task('vendorcss', function() {
  var files = bowerFiles({
    paths: bowerPaths,
    filter: function(path) {
      return path.indexOf('.css') >= 0;
    }
  });
  return gulp.src(files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.distrib + '/stylesheets'));
});

gulp.task('vendorfonts', function() {
  var files = bowerFiles({
    paths: bowerPaths,
    filter: function(path) {
      return path.indexOf('.eot') >= 0 ||
        path.indexOf('.woff') >= 0 ||
        path.indexOf('.ttf') >= 0 ||
        path.indexOf('.svg') >= 0;
    }
  });
  return gulp.src(files)
    .pipe(gulp.dest(paths.distrib + '/fonts'));
});
