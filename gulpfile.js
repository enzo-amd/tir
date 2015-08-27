/**
 * Created by YuraVika on 08.08.2015.
 */

var _ = require('lodash');
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
//var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

var paths = require('./gulp/paths').paths;

require('./gulp/vendor');
require('./gulp/gh-pages');


// Tasks

gulp.task('clean', function () {
  return gulp.src(paths.dist, {read: false})
    .pipe(clean());
});

gulp.task('app-js', function () {
  var ngAnnotate = require('gulp-ng-annotate');

  gulp.src(['src/**/module.js'].concat(paths.js))
    .pipe(sourcemaps.init())
    .pipe(concat(paths.distJs + '/app.js'))
    .pipe(ngAnnotate())
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.'))
});


gulp.task('templates', function () {
  var templateCache = require('gulp-angular-templatecache');

  return gulp.src('src/**/*.view.html')
    .pipe(templateCache(paths.distJs + '/templates.js', {
      root: ''
    }))
    .pipe(gulp.dest('.'));
});


gulp.task('index.html', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('app-css', function () {
  var autoprefixer = require('gulp-autoprefixer');
  var less = require('gulp-less');
  var cssMin = require('gulp-minify-css');

  return gulp.src(paths.stylesheets)
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: paths.stylesheetIncludes
    }))
    .pipe(autoprefixer({
      browsers: ['last 4 versions', 'ie 10'],
      cascade: false
    }))
    .pipe(cssMin())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.distCss))
    /*.on('error', function(err) {
     gutil.beep();
     gutil.beep();
     gutil.beep();
     var errors = err.message.split(',').join('</div><div class="alert alert-warning">');
     fs.writeFile('../distrib/gulp-errors.html', '<div><div class="alert alert-warning">' + errors + '</div></div>');
     })*/;
});

/*gulp.task('app-img', function () {
 var imageResize = require('gulp-image-resize');
 var rename = require('gulp-rename');
 var index = 1;

 gulp.src(paths.images)
 .pipe(imageResize({
 imageMagick: true,
 width: 500,
 crop: false,
 upscale: false,
 format: 'jpeg'
 }))
 .pipe(rename(function (path) {
 path.basename = 'gun-' + index;
 index++;
 }))
 .pipe(gulp.dest(paths.distImages));
 });*/


gulp.task('sprite', function (callback) {
  var merge2 = require('merge2');
  var spritesmith = require('gulp.spritesmith');
  var imagemin = require('gulp-imagemin');

  var spritePacks = [
    {
      name: 'weapons',
      format: 'jpg'
    }
  ];
  var testStreams = [];
  var streams = _.transform(spritePacks, function (streams, spritePack) {
    var imgFileName = spritePack.name + '.sprite.' + spritePack.format;
    var cssFileName = spritePack.name + '.less';

    var spritesData = gulp.src(['src/images/sprites/' + spritePack.name + '/*'])
      .pipe(spritesmith({
        imgName: imgFileName,
        cssName: cssFileName,
        imgPath: '../images/' + imgFileName,
        algorithm: 'binary-tree'
      }));

    streams.push([
      spritesData.img
        .pipe(imagemin())
        .pipe(gulp.dest(paths.distImages)),
      spritesData.css
        .pipe(gulp.dest(paths.stylesheetIncludes + '/sprites'))
    ]);

    testStreams.push({
      mask: 'src/images/sprites/' + spritePack.name + '/*',
      imgFileName: imgFileName,
      cssFileName: cssFileName
    });
  }, []);

  console.log(testStreams);

  streams.unshift(
    gulp.src(paths.stylesheetIncludes + '/sprites/*', {read: false})
      .pipe(clean())
  );

  return merge2.apply(merge2, streams);
});

//gulp.task('svg-sprite', function () {
//  var svgSprite = require('gulp-svg-sprite');
//  var config = {
//    mode: {
//      css: {
//        dest: 'dist',
//        sprite: '../svg/svg-icons.css.svg',
//        render: {
//          less: {
//            dest: '../../' + paths.stylesheetIncludes + '/sprites/svg-icons'
//          }
//        },
//        dimensions: false
//      }
//    }
//  };
//
//  return gulp.src('src/svg/*.svg')
//    .pipe(svgSprite(config))
//    .pipe(gulp.dest('dist'));
//});


gulp.task('app', function (callback) {
  runSequence(
    ['app-js', 'templates', 'sprite'],
    'app-css',
    'index.html',
    callback
  );
});


gulp.task('build', function (callback) {
  runSequence('clean',
    'vendor',
    'app',
    callback);
});


gulp.task('watch-app', ['app'], function () {
  gulp.watch('src/**/*.js', ['app-js']);
  gulp.watch('src/**/*.view.html', ['templates']);
  gulp.watch('src/stylesheets/**/*.less', ['app-css']);
  gulp.watch('index.html', ['index.html']);
});