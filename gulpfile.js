var gulp         = require("gulp"),                 // Gulp JS
    header       = require("gulp-header"),          // banner maker
    mkdirp       = require("mkdirp"),               // mkdir
    autoprefixer = require('gulp-autoprefixer'),    // Autoprefixer
    less         = require("gulp-less"),            // LESS
    csso         = require('gulp-csso'),            // CSS min
    out          = require('gulp-out');             // to file

var misc          = "./misc/",
    src           = "./src/",
    srcLess       = src + "less/",
    dist          = "./dist/",
    bootstrap     = "./node_modules/bootstrap/",
    bootstrapLess = bootstrap + "less/",
    themeFile     = "theme.less";

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

function buildCss() {
    mkdirp(srcLess);

    gulp
        .src(srcLess + themeFile)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ]
        }))
        .pipe(out(dist + "bootstrap.css"));
}

function installCustomTheme() {
    mkdirp(srcLess);

    gulp
        .src(misc + themeFile)
        .pipe(gulp.dest(srcLess));
}

function installCustomVariables() {
    mkdirp(srcLess);

    gulp
        .src(bootstrapLess + "variables.less")
        .pipe(gulp.dest(srcLess));
}

// setup
gulp.task("install_custom_variables", installCustomVariables);
gulp.task("install_custom_theme", installCustomTheme);

gulp.task("install", function () {
    installCustomVariables();
    installCustomTheme();
});

// build
gulp.task("build_css", buildCss);

gulp.task("build", function () {
    buildCss();
});