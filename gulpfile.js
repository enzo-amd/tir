/**
 * Created by YuraVika on 08.08.2015.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
//var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');

gulp.task('js', function () {
    gulp.src(['src/**/module.js', 'src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});


gulp.task('templates', function () {
    return gulp.src('src/**/*.view.html')
        .pipe(templateCache('templates.js', {
            root: ''
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['js'], function () {
    gulp.watch('src/**/*.js', ['js'])
});

