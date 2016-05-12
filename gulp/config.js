export default {
    paths: {
        gulpfile: './gulpfile.babel.js',
        src: {
            base: './src',
            bower: './bower_components',
            app: {
                base: './app',
                entry: './src/app/app.js',
                all: './src/app/**/*.js',
                dest: './src/js'
            },
            html: './src/*.html',
            icon: {
                entry: './src/gfx/svg/*.svg',
                dest: './src/gfx/icon'
            },
            styles: {
                base: './src/styles',
                entry: './src/styles/main.scss',
                all: './src/styles/**/*.scss',
                dest: './src/css'
            },
            tpl: {
                base: './src/tpl',
                entry: './src/tpl/*.nunj',
                all: './src/tpl/**/*.nunj'
            }
        },
        dist: {
            base: './dist',
            css: './dist/css',
            js: './dist/js',
            html: './dist/*.html',
            icon: './dist/gfx/icon'
        },
        names: {
            css: {
                src: 'style.css',
                min: 'style.min.css'
            },
            js: {
                src: 'app.js',
                min: 'app.min.js'
            }
        }
    }
};
