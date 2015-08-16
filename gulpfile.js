/**
 * Created by YuraVika on 08.08.2015.
 */

var _ = require('lodash');
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
//var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var autoprefixer = require('gulp-autoprefixer');
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
    gulp.src(['src/**/module.js'].concat(paths.js))
        .pipe(sourcemaps.init())
        .pipe(concat(paths.distJs + '/app.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('.'))
});


gulp.task('templates', function () {
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

gulp.task('app-css', function() {
    return gulp.src(paths.stylesheets)
        .pipe(less({
            paths: paths.stylesheetIncludes
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'ie 10'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.distCss))
        /*.on('error', function(err) {
            gutil.beep();
            gutil.beep();
            gutil.beep();
            var errors = err.message.split(',').join('</div><div class="alert alert-warning">');
            fs.writeFile('../distrib/gulp-errors.html', '<div><div class="alert alert-warning">' + errors + '</div></div>');
        })*/;
});

gulp.task('app', ['app-js', 'templates', 'app-css', 'index.html']);


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