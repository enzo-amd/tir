var _ = require('lodash');
var gulp = require('gulp');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var paths = require('./paths').paths;
var bowerPaths = require('./paths').bowerPaths;

var _bowerFiles;
function getBowerFiles() {
    var bowerFiles = require('main-bower-files');

    return _bowerFiles = _bowerFiles || bowerFiles({
            paths: bowerPaths
        });
}

function setJQueryFirst(files) {
    var jqueryPath = _.find(files, function (path) {
        return path.match(/jquery.js$/);
    });
    if (jqueryPath) {
        var index = files.indexOf(jqueryPath);
        files.splice(index, 1);
        files.unshift(jqueryPath);
    }
}

gulp.task('vendor-js', function () {
    var uglify = require('gulp-uglify');

    var files = getBowerFiles();
    setJQueryFirst(files);

    var jsFilter = filter(['*.js']);

    return gulp.src(files)
        .pipe(jsFilter)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.distJs));
});

gulp.task('vendor-css', function () {
    var merge2 = require('merge2');
    var minifyCss = require('gulp-minify-css');

    var files = getBowerFiles();
    var cssFilter = filter(['*.css']);


    return gulp.src(files)
        .pipe(cssFilter)
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(concat('vendor.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.distCss));
});

gulp.task('vendor-fonts', function () {
    var files = getBowerFiles();
    var fontFilter = filter(['*.{eot,woff2,woff,ttf,svg}']);

    return gulp.src(files)
        .pipe(fontFilter)
        .pipe(gulp.dest(paths.distFonts));
});

gulp.task('vendor', ['vendor-js', 'vendor-css', 'vendor-fonts']);

gulp.task('z', []);
