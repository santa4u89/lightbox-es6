import gulp from 'gulp';
import { argv } from 'yargs';
import del from 'del';
import config from '../config';

const {
    src: { styles, app, icon, html },
    dist
} = config.paths;
const isProd = argv.prod || false;

gulp.task('clean', () => del(isProd ? dist.base : [styles.dest, app.dest, icon.dest, html]));
