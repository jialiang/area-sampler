const { dest, src, task, series, parallel, watch } = require("gulp");

const del = require("del");
const browserify = require("browserify");
const tsify = require("tsify");
const fancyLog = require("fancy-log");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");

const clean = () => del("docs/**", { force: true });

const js = () =>
  browserify({
    basedir: ".",
    debug: true,
    entries: ["./src/index.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .transform("uglifyify", { global: true })
    .bundle()
    .on("error", function (err) {
      fancyLog(err.message);
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(dest("docs"));

const html = () => src("./src/**/*.html").pipe(dest("docs"));

const image = () => src("./src/**/*.png").pipe(dest("docs"));

task("default", () =>
  watch("./src/**/*", { ignoreInitial: false }, series(clean, parallel(js, html, image)))
);
