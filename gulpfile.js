const gulp = require('gulp');
const del = require('del');
const path = require('path');
const minimist = require('minimist');
const modRewrite = require('connect-modrewrite');

const typescript = require('gulp-typescript');
const tslint = require('gulp-tslint');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');

const browserSync = require('browser-sync');
const tscConfig = require('./tsconfig.json');

const reload = browserSync.reload;

// Get the environment from the command line
const knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'local'}
};
const options = minimist(process.argv.slice(2), knownOptions);
const env = options.env;


// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// compile all the less assets
gulp.task('styles', function () {
  return gulp.src('src/styles/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('dist/styles'));
});

// copy across libs
gulp.task('copy:libs', function() {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/angular2/bundles/http.dev.js'
    ])
    .pipe(gulp.dest('dist/lib'))
});

// TypeScript compile
gulp.task('compile', function () {
  return gulp
    .src('src/app/**/*.ts')
    .pipe(sourcemaps.init())          // <--- sourcemaps
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))      // <--- sourcemaps
    .pipe(gulp.dest('dist/app'));
});

gulp.task('tslint', function() {
  return gulp.src('src/app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function() {
  return gulp.src(['src/**',
                   '!src/app/**/*',
                   '!src/**/*.ts',
                   '!src/**/*.less'])
    .pipe(gulp.dest('dist'))
});

// connect a live reload server
gulp.task('serve', ['build'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist'],
      middleware: modRewrite([
        '^[^\\.]*$ /index.html [L]'
      ])
    }
  });

  gulp.watch('src/styles/**/*.less', ['styles']);
  gulp.watch('src/app/**/*.ts', ['compile']);
  gulp.watch('src/**/*.html', ['copy:assets']);
  gulp.watch('src/images/**/*', ['copy:assets']);

  gulp.watch(['dist/**/*']).on('change', reload);

});

gulp.task('build', ['clean'], function() {
  gulp.start('styles');
  gulp.start('copy:libs');
  gulp.start('copy:assets');
  gulp.start('compile');

});

gulp.task('default', ['build']);
