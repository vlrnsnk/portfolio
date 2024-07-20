'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import {deleteSync} from 'del';
import minify from 'gulp-html-minifier-terser';

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
    .pipe(minify({ collapseWhitespace: true }))
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
  return deleteSync('build')
});

gulp.task('default', gulp.parallel('clean', 'styles', 'server', 'html', 'fonts', 'watch'));
