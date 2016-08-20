
var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

//浏览器自动刷新
gulp.task('sync', function() {
  var files = [
    '*.html',
    'css/*.css',
    'js/*.js'
  ];

  browserSync.init(files,{
    server: {
      baseDir: "./"
    }
  });
});

//es6-->es5 without sourcemaps
gulp.task('toes5', () => {
    return gulp.src('js/kill-cms.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('es6toes5'));
});

//es6-->es5 with sourcemaps
gulp.task('toes5map', () => {
    return gulp.src('js/kill-cms.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        //.pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('es6toes5/es2015withmaps'));
});