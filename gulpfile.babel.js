import gulp from 'gulp';

gulp.task('clean', () => {
    let del = require('del');
    return del(['static/css/']);
});

// Build

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

gulp.task('build', ['clean'], () => {
  let sourcemaps = require('gulp-sourcemaps');
  let stylus = require('gulp-stylus');
  let autoprefixer = require('gulp-autoprefixer');
  let plumber = require('gulp-plumber');
  let util = require('gulp-util')
  return gulp.src('./src/stylus/main.styl')
    .pipe(plumber({
      errorHandler: (err) => {
        util.log(util.colors.red(`Error (${err.plugin}): ${err.message}`));
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('crtical', () => {
   let critical = require('critical');
   critical.generateInline({
      base: 'public/',
      src: 'index.html',
      dest: 'css/main.css',
      htmlTarget: 'index.html',
      width: 960,
      height: 600
    });
});

gulp.task('copystyles', ()=> {
    let rename = require('gulp-rename');
    return gulp.src(['./static/css/main.css'])
        .pipe(rename({
            basename: "site"
        }))
        .pipe(gulp.dest('./static/css/'));
});

gulp.task('critical', ['build', 'copystyles'], ()=>{
    let critical = require('critical');
    critical.generateInline({
        base: './public',
        src: 'index.html',
        styleTarget: 'css/main.css',
        htmlTarget: 'index.html',
        width: 320,
        height: 480
    })
});

gulp.task('watch', () => {
  gulp.watch('./src/stylus/**/*.styl', ['build']);
});

// Common

gulp.task('default', ['critical']);
