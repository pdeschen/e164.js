var gulp = require('gulp'), 
    uglify = require('gulp-uglify');

gulp.task('default', function() {
});

gulp.task('compress', function() {
  gulp.src('e164.js')
  .pipe(uglify({mangle:true}))
  .pipe(gulp.dest('min'));
});
