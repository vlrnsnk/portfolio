'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'src/',
    }
  });

  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
});

gulp.task('default', gulp.parallel('styles', 'server', 'watch'));
