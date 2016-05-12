import gulp from 'gulp';
import prettify from 'gulp-prettify';
import { argv } from 'yargs';
import config from '../config';

const { src, dist } = config.paths;
const isProd = argv.prod || false;

gulp.task('prettify', () => {
    return gulp.src(isProd ? dist.html : src.html)
        .pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest(isProd ? dist.base : src.base));
});
