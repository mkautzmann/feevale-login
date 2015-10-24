var packageJSON = require('./package.json');
var jshintConfig = packageJSON.jshintConfig;

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var del = require('del');
var zip = require('gulp-zip');
var merge = require('merge-stream');

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', ['lint'], function () {
  return del([
    './dist/**/*',
    '*.zip'
  ]);
});

gulp.task('copy', ['clean'], function () {
  var copyCss = gulp.src('./src/css/*')
    .pipe(gulp.dest('./dist/css'));
  var copyImg = gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'));
  var copyJs = gulp.src('./src/js/*')
    .pipe(gulp.dest('./dist/js'));
  var copyPrincipal = gulp.src(['./src/**.html', './src/manifest.json'])
    .pipe(gulp.dest('./dist'));

  return merge(copyCss, copyImg, copyJs, copyPrincipal);
});

gulp.task('zip', ['copy'], function () {
  return gulp.src('./dist/**/*')
      .pipe(zip(`FeevaleLogin.${packageJSON.version}.zip`))
      .pipe(gulp.dest('./'));
});

gulp.task('default', ['lint', 'clean', 'copy']);
gulp.task('deploy', ['zip']);
