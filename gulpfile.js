const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const concat = require('gulp-concat')
const { series } = require('gulp');

// Configuration
const configuration = {
    paths: {
        src: {
            nodes: [
                './src/html/nodes/**/*.html',
                './src/js/nodes/**/*.js',
            ],
            html: [
                './src/html/index.html',
                './src/html/sample.html'
            ],
            templates: './src/html/templates/**/*.tpl',
            scss: [
                './src/scss/**/*.scss'
            ],
            js: './src/js/web/**/*.js',
            utils: './src/js/utils/**/*.js'
        },
        dist: {
            nodes: './dist/nodes',
            html: './dist/web',
            templates: './dist/web/templates',
            css: './dist/web/css',
            js: './dist/web/js',
            utils:'./dist/utils'
        }
    }
}

function nodes() {
    return gulp.src(configuration.paths.src.nodes)
        .pipe(gulp.dest(configuration.paths.dist.nodes))
}

function html() {
    return gulp.src(configuration.paths.src.html)
        .pipe(gulp.dest(configuration.paths.dist.html))
}

function templates() {
    return gulp.src(configuration.paths.src.templates)
        .pipe(gulp.dest(configuration.paths.dist.templates))
}

function style() {
    return gulp.src(configuration.paths.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            // ...
            require('tailwindcss'),
            require('autoprefixer'),
            // ...
        ]))
        .pipe(gulp.dest(configuration.paths.dist.css))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(configuration.paths.src.js)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(configuration.paths.dist.js))
}

function utils() {
    return gulp.src(configuration.paths.src.utils)
        .pipe(gulp.dest(configuration.paths.dist.utils))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: configuration.paths.dist.html,
            index: "/index.html"
        },
        notify: false
    })
    gulp.watch(configuration.paths.src.scss, style)
    gulp.watch(configuration.paths.src.nodes, nodes)
    gulp.watch(configuration.paths.src.js, scripts)
    gulp.watch(configuration.paths.src.utils, utils)
    gulp.watch(configuration.paths.src.templates, templates)

    gulp.watch(configuration.paths.src.html).on('change', html)
    gulp.watch(configuration.paths.src.html).on('change', browserSync.reload)
    gulp.watch(configuration.paths.src.js).on('change', browserSync.reload)
}


exports.nodes = nodes
exports.style = style
exports.scripts = scripts
exports.utils = utils
exports.templates = templates
exports.html = html
exports.watch = watch

exports.default= series(nodes, utils,templates, html, style, scripts)
