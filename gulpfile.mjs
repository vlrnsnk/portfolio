import gulp from 'gulp';
const { task, watch, src, dest, series, parallel } = gulp;
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

task('server', () => {
  browserSync({
    server: {
      baseDir: 'build/',
    }
  });

  watch('build/*.html').on('change', browserSync.reload);
});

/* Compile SCSS styles */

task('styles', () => {
  return src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
});

/* Copy and minify JavaScript */

task('scripts', () => {
  return src('src/js/index.js')
    .pipe(terser())
    .pipe(rename('index.min.js'))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
});

/* Copy and minify HTML */

task('html', () => {
  return src('src/*.html')
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(dest('build'))
});

/* Watch changes in files */

task('watch', () => {
  watch('src/sass/**/*.scss', series('styles'));
  watch('src/*.html', series('html'));
  watch('src/js/*.js', series('scripts'));
});

/* Empty build folder */

task('clean', () => {
  return deleteSync('build')
});

/* Copy files from src to build */

task('copy', (done) => {
  src([
    'src/*.ico',
    'src/fonts/**/*',
    'src/img/favicons/*',
    'src/img/**/*',
    'src/files/**/*',
  ], {
    encoding: false,
    base: 'src',
  })
    .pipe(dest('build'));

  done();
});

/* Deploy build directory to GitHub Pages */

task('deploy', (done) => {
  src('build/**/*')
    .pipe(ghPages());

  done();
});

/* Run main gulp task */

task('default', parallel('clean', 'copy', 'styles', 'scripts', 'html', 'server', 'watch'));
