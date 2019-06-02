var gulp = require("gulp");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/*.html']
};

gulp.task("build", function () {
    var tsResult = gulp.src("src/*.ts")
        .pipe(ts({
            noImplicitAny: true
        }));
    return tsResult.js.pipe(gulp.dest("built/local"));
});

gulp.task("test", function(cb) {
    console.log(" ---- Gulp Test ----");
    cb();
});

gulp.task("run", function(cb) {
    console.log(" ---- Gulp Run ----");
    cb();
});

gulp.task("default", gulp.series("build", "test", "run"));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("built/web"));
});

gulp.task("web", gulp.series(gulp.parallel('copy-html'), function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts', 'src/blockchain.ts', 'src/web.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("built/web"));
}));