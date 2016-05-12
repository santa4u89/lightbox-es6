import gulp from 'gulp';
import { argv } from 'yargs';
import rename from 'gulp-rename';
import nunjucks from 'gulp-nunjucks';
import { Environment, FileSystemLoader } from 'nunjucks';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import config from '../config';

const { src, dist } = config.paths;
const isProd = argv.prod || false;

gulp.task('tpl', () => {
    const data = {
        '_prod': isProd
    };
    const searchPaths = isProd ? [src.tpl.base, dist.icon] : [src.tpl.base, src.icon.dest];
    const options = {
        noCache: true
    };
    gulp.src(src.tpl.entry)
        // Temporary fix for gulp's error handling within streams, see https://github.com/actum/gulp-dev-stack/issues/7#issuecomment-152490084
        .pipe(plumber({
            errorHandler: e => gutil.log(gutil.colors.red(`${e.name} in ${e.plugin}: ${e.message}`))
        }))
        // https://mozilla.github.io/nunjucks/api.html#filesystemloader
        .pipe(nunjucks.compile(data, {
            env: new Environment(
                new FileSystemLoader(searchPaths, options)
            )
        }))
        .pipe(nunjucks.compile(data))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulp.dest(isProd ? dist.base : src.base))
        .pipe(browserSync.stream({ once: true }));
});
