var gulp = require('gulp');
var jshint = require('gulp-jshint');
var del = require('del');

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
  return del([
    'dist'
  ]);
});

gulp.task('default', ['lint', 'clean']);
