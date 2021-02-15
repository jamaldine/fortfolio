const gulp = require('gulp');
plugins = require('gulp-load-plugins')({
    pattern: '*',
    rename: {
      jshint: 'jslint'
    }
  });
// new run sequence adapt with gulp 4
//const runSequence = require('gulp4-run-sequence');

plugins.browserSync.create();

/* 2- Setting tasks */
async function debug() {
  await console.log(plugins);
}


const imagemin = require('gulp-imagemin');

const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

const sass = require('gulp-sass');

const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const { src, series, parallel, dest, watch } = require('gulp');
const { AST_Export } = require('terser');

const jsPath = "js/**/mainFunctions.js";
const cssPath = "css/**/*.css";

const distRoot = './dist';
function copyHtml(){
    return src('*.html').pipe(gulp.dest('dist'));
}

function copyCommon(){
  return src('common/**/*.html').pipe(gulp.dest('dist/common'));
}

function copyFonts(){
  return src('fonts/**/*').pipe(gulp.dest('dist/fonts'));
}

function scssTask(){
  return gulp.src('scss/mainStyles.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/scss'));
}

function imgTask(){
    return src('img/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
}

function particlesTask(){
    // to minify later
    return src('js/particles.js').pipe(gulp.dest('dist/js'));
}

function jqueryTask(){
  // to minify later
  return src('js/jquery.js').pipe(gulp.dest('dist/js'));
}
function slickTask(){
  // to minify later
  return src('js/slick.min.js').pipe(gulp.dest('dist/js'));
}

function navbarTask(){
  // to minify later
  return src('js/navbar.js').pipe(gulp.dest('dist/js'));
}


function dataTask(){
  // to minify later
  return src('./data.json').pipe(gulp.dest('dist/'));
}

function appTask(){
    return src('js/**/app.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'));
}

function jsTask(){
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('mainFunctions.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'));
}

function cssTask(){
    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'));
}


function watchTask(){
    watch([cssPath, jsPath], {interval: 1000}, parallel(cssTask, scssTask, slickTask, jqueryTask, particlesTask, appTask,jsTask, navbarTask, jsonTask, dataTask));
}
exports.cssTask = cssTask;
exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.jqueryTask = jqueryTask;
exports.slickTask = slickTask;
exports.navbarTask = navbarTask;
exports.dataTask = dataTask;
exports.particlesTask = particlesTask;
exports.appTask = appTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.copyCommon = copyCommon;
exports.copyFonts = copyFonts;


gulp.task('serve', gulp.series(parallel(copyHtml, copyFonts, copyCommon, imgTask, jqueryTask, slickTask, navbarTask, dataTask, particlesTask, appTask, jsTask, cssTask, scssTask),  function () {
    // Static server & Autoreload
    plugins.browserSync.init({
        port: 3010,
        server: {
    
          baseDir: distRoot,
          https: true
        }
      });
    watchTask
  }));

  // exports.build = compileScripts
gulp.task('default', gulp.parallel('serve'));