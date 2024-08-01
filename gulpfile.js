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
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import ghPages from 'gulp-gh-pages';

/* Run BrowserSync server */

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'build/',
    }
  });

  gulp.watch("build/*.html").on('change', browserSync.reload);
});

/* Compile SCSS styles */

gulp.task('styles', () => {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

/* Copy and minify JavaScript */

gulp.task('scripts', () => {
  return gulp.src("src/js/index.js")
    .pipe(terser())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
});

/* Copy and minify HTML */

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
});

/* Watch changes in files */

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/js/*.js', gulp.series('scripts'));
});

/* Empty build folder */

gulp.task('clean', () => {
  return deleteSync('build')
});

/* Copy files from src to build */

gulp.task('copy', (done) => {
  gulp.src([
    'src/*.ico',
    'src/fonts/**/*',
    'src/img/favicons/*',
    'src/img/**/*',
    'src/files/**/*',
  ], {
    encoding: false,
    base: 'src',
  })
    .pipe(gulp.dest('build'));

  done();
});

/* Deploy build directory to GitHub Pages */

gulp.task('deploy', (done) => {
  gulp.src('build/**/*')
    .pipe(ghPages());

  done();
});

/* Run main gulp task */

gulp.task('default', gulp.parallel('clean', 'copy', 'styles', 'scripts', 'html', 'server', 'watch'));
