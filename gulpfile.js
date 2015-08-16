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

var paths = require('./gulp/paths').paths;

require('./gulp/vendor');
require('./gulp/gh-pages');


// Tasks

gulp.task('appjs', function () {
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

gulp.task('appcss', function() {
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

gulp.task('default', ['appjs', 'templates', 'appcss', 'index.html']);

gulp.task('watch', ['default'], function () {
    gulp.watch('src/**/*.js', ['appjs']);
    gulp.watch('src/**/*.view.html', ['templates']);
    gulp.watch('src/stylesheets/**/*.less', ['appcss']);
    gulp.watch('index.html', ['index.html']);
});


