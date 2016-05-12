import gulp from 'gulp';
import { argv } from 'yargs';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import streamify from 'gulp-streamify';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import config from '../config';

const { src, dist, names } = config.paths;
const isProd = argv.prod || false;

const bundle = () => {
    const opts = {
        entries: src.app.entry,
        debug: !isProd,
        transform: 'babelify'
    };
    const bundler = isProd ? browserify(opts) : watchify(browserify(Object.assign({}, watchify.args, opts)));
    const rebundle = () => {
        return bundler.bundle()
            .on('error', e => gutil.log(gutil.colors.red(e.name) + e.message.substr(e.message.indexOf(': ') + 1)))
            .pipe(source(names.js.src))
            .pipe(gulpif(isProd, streamify(uglify())))
            .pipe(gulpif(isProd, rename(names.js.min)))
            .pipe(gulp.dest(isProd ? dist.js : src.app.dest))
            .pipe(browserSync.stream());
    };
    bundler
        .on('update', rebundle)
        .on('log', gutil.log);
    return rebundle();
};

gulp.task('js', ['lint'], bundle);
