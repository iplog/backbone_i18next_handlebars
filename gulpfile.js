/* jshint strict: false */
// process.env.BROWSERIFYSWAP_DIAGNOSTICS = true;
process.env.BROWSERIFYSWAP_ENV = 'all';

var path = require('path');

var browserify = require('browserify');
var connect = require('gulp-connect');
var defineModule = require('gulp-define-module');
var gulp = require('gulp');
var gutil = require('gulp-util');
var handlebars = require('gulp-handlebars');
var historyApiFallback = require('connect-history-api-fallback');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var appName = 'my_app';
var bundleFile = 'bundle.js';
var distFolder = 'dist';
var mainModule = 'index.js';
var webFolder = 'www';

var paths = {
  scripts: [
    './**/*.js' ,
    '!./' + path.join(appName, webFolder, distFolder) + '/**/*.js',
    '!./node_modules',
    '!./*/templates/*.js',
  ],
  less: [ './my_app/less/**/*.less' ],
  templates: [
    './*/templates/*.hbs',
    '!./node_modules/'
  ]
};

gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(path.join(__dirname, appName, webFolder, distFolder)))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watcher', function() {
  function rebundle() {
    gutil.log('Update main bundle...');
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(bundleFile))
      .pipe(gulp.dest(path.join(__dirname, appName, webFolder, distFolder)))
      .pipe(connect.reload());
  }

  var opts = Object.create(watchify.args);
  opts.debug = true;

  var b = browserify(path.join(__dirname, mainModule), opts);
  var bundler = watchify(b);

  // Optionally, you can apply transforms and other configuration options on the
  // bundler just as you would with browserify
  bundler.transform('brfs');
  bundler.on('update', rebundle);
  return rebundle();
});

gulp.task('handlebars', function(){
  gulp.src(paths.templates)
    .pipe(handlebars())
    .pipe(defineModule('node'))
    .pipe(gulp.dest(__dirname));
});

gulp.task('webserver', function() {
   connect.server({
    livereload: true,
    port: 3000,
    root: [ path.join('./', appName, webFolder) ],
    middleware: function() { // connect, opt
      return [ historyApiFallback ];
    },
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.less, [ 'less' ]);
  gulp.watch(paths.templates, [ 'handlebars' ]);
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('dev', [
  'webserver',
  'default',
  'watcher',
  'watch',
]);

gulp.task('default', [ 'less', 'handlebars' ]);
