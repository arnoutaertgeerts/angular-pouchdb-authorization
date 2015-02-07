/**
 * Created by arnoutaertgeerts on 2/7/15.
 */

var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('minify', function () {
    return gulp.src('src/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('angular-pouchdb-authentication.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('concat', function() {
    return gulp.src('src/*.js')
        .pipe(concat('angular-pouchdb-authentication.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify', 'concat']);