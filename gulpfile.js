var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var connect = require("gulp-connect");

var middlewares = [];

gulp.task("connect", function (){
  return connect.server({
    root: '.',
    livereload: true,
    middleware: function (connect, opt){
      return middlewares;
    }
  });
});

gulp.task("js", function (){
  return gulp.src("app/src/js/*.js").pipe(connect.reload());
});

gulp.task("sass", function (){
  return gulp.src('app/src/scss/*.scss')
    //.pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    //.pipe(plugins.sourcemaps.write({includeContent: false}))
    //.pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('./app/compiled/css'))
    .pipe(connect.reload());
});

gulp.task('serve', function (){
    gulp.watch("app/src/js/*.js", function (){
      gulp.start("js");
    });  

    gulp.watch("app/src/scss/*.scss", function (){
        gulp.start("sass");
    });
});

gulp.task('default',['serve', 'connect']);
