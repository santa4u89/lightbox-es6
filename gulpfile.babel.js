// Gulp plugins configuration
import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./gulp/tasks');

gulp.task('default',['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['styles']);
