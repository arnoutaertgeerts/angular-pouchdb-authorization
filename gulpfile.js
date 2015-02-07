/**
 * Created by arnoutaertgeerts on 2/7/15.
 */

var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('minify', function () {
    return gulp.src(['src/auth.module.js', 'src/access.js', 'src/accesslevel.js', 'src/auth.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('angular-pouchdb-authorization.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('concat', function() {
    return gulp.src(['src/auth.module.js', 'src/access.js', 'src/accesslevel.js', 'src/auth.js'])
        .pipe(concat('angular-pouchdb-authorization.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify', 'concat']);