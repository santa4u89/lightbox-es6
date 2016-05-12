import gulp from 'gulp';
import { argv } from 'yargs';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import { copy as copyToClipboard } from 'copy-paste';
import config from '../config';

const { gulpfile, src, dist} = config.paths;
// For production (minified files) run "gulp --prod"
const isProd = argv.prod || false;
const bsPort = 4857;

gulp.task('serve', ['prepare'], () => {
    browserSync({
        open: false,
        port: bsPort,
        server: isProd ? dist.base : src.base
    }, () => copyToClipboard(`localhost:${bsPort}`, () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))));

    const sanitize = pathname => pathname.replace(/^\.\//, '');
    const watch = (pathname, tasks) => gulp.watch(sanitize(pathname), tasks);

    if (!isProd) {
        watch(src.app.all, ['lint']);
        watch(src.styles.all, ['styles']);
        watch(src.tpl.all, ['tpl']);
        watch(gulpfile, ['lint:gulpfile']);
    }
});
