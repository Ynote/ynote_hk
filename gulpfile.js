var gulp         = require('gulp'),
    compass      = require('gulp-compass'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    imagemin     = require('gulp-imagemin'),
    livereload   = require('gulp-livereload'),
    del          = require('del'),
    path         = require('path');

/*
 * Optimization tasks
 */

gulp.task('styles', function() {
  gulp.src('./css/sass/**.scss')
    .pipe(compass({
        project: path.join(__dirname, 'css'),
        css: 'gen',
        sass: 'sass'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss(
        {
            keepSpecialComments: 0
        }
    ))
    .pipe(gulp.dest('css/gen'))
    .pipe(livereload())
});

gulp.task('images', function() {
  return gulp.src('./images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('images/gen'));
});

gulp.task('clean', function(cb) {
    del(['css/gen/**', 'images/gen/**'], function(){ console.log('[Ynote_hk] Generated files cleaned!'); cb(); })
});

/*
 * Watching task
 */
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('./css/sass/*.scss', ['styles']);

  // Watch image files
  gulp.watch('./images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen(1234);

  // Watch any files in dist/, reload on change
  gulp.watch(['css/gen/**', 'images/gen/**']).on('change', livereload.changed);

});

/* Default */
gulp.task('default', ['clean'], function() {
    gulp.start('styles');
    console.log('[Ynote_hk] - Assets compiled!');
});
