var gulp = require('gulp')
var plugins = require('gulp-load-plugins')()
var del = require('del')
var run_sequence = require('run-sequence')
var less_plugin_auto_prefix = require('less-plugin-autoprefix')
var autoprefix = new less_plugin_auto_prefix({ browsers: ['last 2 versions'] })
var ghpages = require('gh-pages')
var util = require('util')
var path = require('path')

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
    'src/img/**/*.svg'
  ],

  misc: [
    'src/misc/**'
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
        .pipe(plugins.minifyCss())
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

gulp.task('svg2png', function () {
  return gulp.src(paths.images)
        .pipe(plugins.svg2png())
        .pipe(gulp.dest('dist/assets/img'))
})

gulp.task('misc', function () {
  return gulp.src(paths.misc, { dot: true })
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
  return run_sequence('build', 'connect', 'watch', function (error) {
    sequence_error(callback, error)
  })
})

gulp.task('default-svg', function (callback) {
  return run_sequence('build', 'svg2png', 'connect', 'watch', function (error) {
    sequence_error(callback, error)
  })
})

gulp.task('deploy', function (callback) {
  run_sequence('build', 'svg2png', function (error) {
    if (error) {
      return sequence_error(callback, error)
    }

    var options = {
      dotfiles: true,
      silent: true
    }

    if (process.env.TRAVIS) {
      options.user = {
        name: process.env.GIT_NAME,
        email: process.env.GIT_EMAIL
      }

      options.repo = util.format('https://%s:%s@github.com/Vegosvar/Kottet.git', process.env.GIT_NAME, process.env.GIT_TOKEN)
    }

    require('child_process').exec('git rev-parse HEAD', function (error, stdout, stderr) {
      options.message = 'Updating to Vegosvar/Kottet@' + stdout.replace('\n', '')
      ghpages.publish(path.join(process.cwd(), 'dist'), options, callback)
    })
  })
})