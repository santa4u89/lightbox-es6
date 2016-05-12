import gulp from 'gulp';
import { argv } from 'yargs';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import mqpacker from 'css-mqpacker';
import pxtorem from 'postcss-pxtorem';
import fontMagician from 'postcss-font-magician'; // waiting for use variants of font
import config from '../config';

const { src, dist, names } = config.paths;
const isProd = argv.prod || false;

gulp.task('styles', () => {
    let postCssPlugins = [
        autoprefixer({ browsers: ['last 2 versions'] }),
        pxtorem({
            prop_white_list: ['width', 'height', 'font', 'font-size', 'line-height', 'letter-spacing']
        }),
        // fontMagician(),
        mqpacker()
    ];
    let postCssProd = [
        cssnano({
            'reduceIdents': false
        })
    ];

    gulp.src(src.styles.entry)
        .pipe(plumber())
        .pipe(gulpif(!isProd, sourcemaps.init()))
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss(postCssPlugins))
            .pipe(rename(names.css.src))
        .pipe(gulpif(!isProd, sourcemaps.write('.')))
        .pipe(gulpif(!isProd, gulp.dest(src.styles.dest)))
        .pipe(browserSync.stream())
        .pipe(gulpif(isProd, postcss(postCssProd)))
        .pipe(gulpif(isProd, rename(names.css.min)))
        .pipe(gulpif(isProd, gulp.dest(dist.css)));
});
