var _ = require('lodash');
var gulp = require('gulp');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var bowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');

var paths = require('./paths').paths;
var bowerPaths = require('./paths').bowerPaths;

var _bowerFiles;
function getBowerFiles() {
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

gulp.task('vendorjs', function () {
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

gulp.task('vendorcss', function () {
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

gulp.task('vendorfonts', function () {
    var files = getBowerFiles();
    var fontFilter = filter(['*.{eot, woff2, woff, ttf, svg}']);

    return gulp.src(files)
        .pipe(fontFilter)
        .pipe(gulp.dest(paths.distFonts));
});

gulp.task('vendor', ['vendorjs', 'vendorcss', 'vendorfonts']);
