'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: ""
    }
  });

  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('server'));
