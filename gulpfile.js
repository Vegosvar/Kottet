var gulp = require('gulp')
var plugins = require('gulp-load-plugins')()
var del = require('del')
var run_sequence = require('run-sequence')
var less_plugin_auto_prefix = require('less-plugin-autoprefix')
var autoprefix = new less_plugin_auto_prefix({ browsers: ["last 2 versions"] })

var sequence_error = function (callback, error) {
  if (error) {
    plugins.util.log(plugins.util.colors.red('There was an error running the sequence!'))
    process.exit(1)
  }

  callback()
}

var paths = {
  js: [
    'src/js/*.js'
  ],

  vendor: [
    'src/js/vendor/*.js',
    'bower_components/counter-up/jquery.counterup.min.js'
  ],

  less: [
    'src/less/*.less'
  ],

  html: [
    'src/*.html'
  ],

  images: [
    'src/img/**'
  ],

  misc: [
    'src/favicon.ico',
    'CNAME'
  ]
}

gulp.task('build', function (callback) {
  return run_sequence('clean', 'install', 'lint', Object.keys(paths), function (error) {
    sequence_error(callback, error)
  })
})

gulp.task('clean', function (callback) {
  del(['dist'], callback)
})

gulp.task('install', function () {
  return gulp.src(['./bower.json', './package.json'])
        .pipe(plugins.install())
})

gulp.task('lint', function () {
  return gulp.src(paths.js)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'))
        .pipe(plugins.jscs())
})

gulp.task('js', function () {
  return gulp.src(paths.js)
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('vendor', function () {
  return gulp.src(paths.vendor)
        .pipe(gulp.dest('dist/assets/js/vendor'))
})

gulp.task('less', function () {
  return gulp.src(paths.less)
        .pipe(plugins.less({ 
          plugins: [autoprefix]
        }))
        .pipe(gulp.dest('dist/assets/css'))
})

gulp.task('html', function () {
  return gulp.src(paths.html)
        .pipe(gulp.dest('dist'))
})

gulp.task('images', function () {
  return gulp.src(paths.images)
        .pipe(gulp.dest('dist/assets/img'))
})

gulp.task('misc', function () {
  return gulp.src(paths.misc)
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  for (var task in paths) {
    gulp.watch(paths[task], [task])
  }
})

gulp.task('connect', function () {
  return gulp.src('dist')
      .pipe(plugins.webserver({
        root: 'dist',
        livereload: true,
        open: true
      }))
})

gulp.task('default', function (callback) {
  return run_sequence('clean', 'install', 'lint', Object.keys(paths), 'connect', 'watch', function (error) {
    sequence_error(callback, error)
  })
})