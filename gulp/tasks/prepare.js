import gulp from 'gulp';
import { argv } from 'yargs';
import runSequence from 'run-sequence';

// run-sequence until gulp 4.0 is introduced

const isProd = argv.prod || false;
const devSequence = ['clean', 'icon', ['styles', 'js', 'tpl']];
const buildSequence = [...devSequence, 'prettify'];
const sequence = isProd ? buildSequence : devSequence;

gulp.task('prepare', () => runSequence(...sequence));
