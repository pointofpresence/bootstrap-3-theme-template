var gulp   = require("gulp"),           // Gulp JS
    header = require("gulp-header"),    // banner maker
    mkdirp = require("mkdirp");         // mkdir

var src           = "./src/",
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

function makeCustomVariables() {
    gulp
        .src(bootstrapLess + "variables.less")
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(srcLess));
}

gulp.task("make_custom_variables", makeCustomVariables);

gulp.task("install", function () {
    mkdirp(srcLess);

    makeCustomVariables();
});