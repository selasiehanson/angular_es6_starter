var gulp = require('gulp');
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
  return gulp.src("src/app/*.js").pipe(connect.reload());
});

gulp.task('serve', function (){
  console.log("Do Processing here");
  gulp.watch("src/app/*.js", function (){
    gulp.start("js");
  });  
});

gulp.task('default',['js','serve', 'connect']);
