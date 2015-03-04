var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  del = require('del'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  karma = require('karma').server,
  minifyCss = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  runSequence = require('run-sequence'),
  stylus = require('gulp-stylus'),
  tsc = require('gulp-tsc');

var port = 3000,
    paths = {
      indexHtml: './app/index.html',
      ts: './app/app.ts',
      tsWatch: './app/**/*.ts',
      images: './app/**/*.svg',
      jsLib: [
        //'./bower_components/jquery/dist/jquery.js',
        './bower_components/angular/angular.js'
      ],
      karmaConf: process.cwd() + '/config/karma.conf.js',
      views: './app/**/*.html',
      dist: {
        root: './dist',
        js: './dist/js',
        views: './dist/views',
        images: './dist/images',
        style: './dist/styles',
        styleFile: 'app.css'
      },
      style: './app/app.styl',
      styles: './app/**/*.styl'
    };

gulp.task('default', function (callback) {
  runSequence('clean',
    'tests',
    ['build-ts', 'build-js-lib', 'build-html', 'build-style'],
    callback);
});

gulp.task('clean', function () {
  return del('./dist/*');
});

gulp.task('debug', function (callback) {
  runSequence('default',
    'watch',
    'dev-server',
    callback);
});

gulp.task('build-html', function () {
  gulp.src(paths.indexHtml)
    .pipe(gulp.dest(paths.dist.root));

  return gulp.src(paths.views)
    .pipe(gulp.dest(paths.dist.views))
    .pipe(connect.reload());
});

gulp.task('build-js-lib', function () {
  return gulp.src(paths.jsLib)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('dev-server', function () {
  connect.server({
    root: 'dist',
    port: port,
    livereload: true
  });
});

gulp.task('build-style', function(){
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist.images));

  return gulp.src(paths.style)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(concat(paths.dist.styleFile))
    .pipe(autoprefixer([
      'last 2 Chrome versions',
      'last 2 iOS versions'
    ]))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.dist.style));
});

gulp.task('build-ts', function () {
  return gulp.src(paths.ts)
    .pipe(tsc({
      noResolve: false,
      out: 'app.js',
      outDir: paths.dist.js,
      removeComments: true,
      //sourcePath: '../../app/ts',
      //sourcemap: true,
      target: 'ES5'
    }))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(connect.reload());
});

gulp.task('refresh', function () {
  watch('./dist/**/*', ['refresh'])
});

gulp.task('tests', function(done) {
  karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});

gulp.task('watch', function () {
  gulp.watch(paths.tsWatch, ['build-ts']);
  gulp.watch(paths.views, ['build-html']);
  gulp.watch(paths.indexHtml, ['build-html']);
  gulp.watch(paths.styles, ['build-style']);
  gulp.watch(paths.images, ['build-style']);
});