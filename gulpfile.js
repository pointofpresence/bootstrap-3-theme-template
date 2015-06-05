var gulp         = require("gulp"),           // Gulp JS
    header       = require("gulp-header"),    // banner maker
    mkdirp       = require("mkdirp"),         // mkdir
    autoprefixer = require('gulp-autoprefixer'); // Autoprefixer

var misc          = "./misc/",
    src           = "./src/",
    srcLess       = src + "less/",
    dist          = "./dist/",
    bootstrap     = "./node_modules/bootstrap/",
    bootstrapLess = bootstrap + "less/";

var pkg = require('./package.json');

var banner = [
    '/**',
    ' * Copyright (c) <%= new Date().getFullYear() %> <%= pkg.author %>',
    ' * <%= pkg.name %> - <%= pkg.description %> - Based on Bootstrap',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.repository.url %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

function installCustomTheme() {
    mkdirp(srcLess);

    gulp
        .src(misc + "theme.less")
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(srcLess));
}

function installCustomVariables() {
    mkdirp(srcLess);

    gulp
        .src(bootstrapLess + "variables.less")
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(srcLess));
}

gulp.task("install_custom_variables", installCustomVariables);
gulp.task("install_custom_theme", installCustomTheme);

gulp.task("install", function () {
    installCustomVariables();
    installCustomTheme();
});