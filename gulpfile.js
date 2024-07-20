'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import {deleteSync} from 'del';
import minify from 'gulp-html-minifier-terser';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemap from 'gulp-sourcemaps';

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
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*', { encoding: false })
    .pipe(gulp.dest('build/fonts'))
});

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
});

gulp.task('clean', () => {
  return deleteSync('build')
});

// gulp.task('copy', (done) => {
gulp.task('copy', () => {
  gulp.src([
    'src/*.ico',
    'src/fonts/**/*',
    'src/img/favicons/*',
  ], {
    encoding: false,
    base: 'src',
  })
    .pipe(gulp.dest('build'));

  // done();
});

// gulp.task('default', gulp.parallel('clean', 'copy', 'styles', 'server', 'html', 'fonts', 'watch'));
gulp.task('default', gulp.parallel('clean', 'copy', 'styles', 'server', 'html', 'watch'));
