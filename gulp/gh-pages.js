var gulp = require('gulp');
var streamqueue = require('streamqueue');
var ghPages = require('gulp-gh-pages');
var htmlreplace = require('gulp-html-replace');

var paths = require('./paths').paths;

gulp.task('gh-pages', function() {
    var srcIndex = gulp.src(paths.dist + '/index.html')
        .pipe(htmlreplace({
            baseTag: '<base href="/tir/">'
        }));


    return streamqueue({objectMode: true},
        gulp.src([paths.dist + '/**/*']),
        srcIndex
    )
        .pipe(ghPages({
            force: true
        }));
});
