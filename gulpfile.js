'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'build/',
    }
  });

  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*', { read: false })
    .pipe(gulp.dest('build/fonts'))
});

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
});

gulp.task('clean', () => {
  return delete('build')
});

gulp.task('default', gulp.parallel('clean', 'styles', 'server', 'html', 'fonts', 'watch'));
