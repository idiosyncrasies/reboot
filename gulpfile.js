'use strict';

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const pump = require('pump');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');

function css(cb) {
  pump(
    [
      gulp.src([
        'src/**/*.scss'
      ]),
      sourcemaps.init(),
      stylelint({
        failAfterError: true,
        reporters: [
          {formatter: 'string', console: true}
        ]
      }),
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError),
      gulp.dest('dist'),
      postcss([autoprefixer(), cssnano()]),
      rename({
        suffix: '.min'
      }),
      sourcemaps.write('.'),
      gulp.dest('dist')
    ],
    cb
  );
}
css.displayName = 'build';

css.description = 'Builds Reboot CSS stylesheet';

gulp.task(css);

gulp.task('default', gulp.task('build'));
