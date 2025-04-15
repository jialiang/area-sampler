"use strict";

const { dest, src, task, series, watch } = require("gulp");

const { deleteAsync } = require("del");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const browserify = require("browserify");
const fancyLog = require("fancy-log");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const fs = require("fs/promises");

const { renderToStaticMarkup } = require("react-dom/server");
const path = require("path");

const clean = () => deleteAsync(["./dist/**/*", "./compiled/**/*"]);

const transform = () =>
  src("src/**/*.{ts,tsx}")
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel())
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./compiled"));

const js = () =>
  browserify({
    basedir: ".",
    debug: true,
    entries: ["./compiled/index.js"],
  })
    .bundle()
    .on("error", function (error) {
      fancyLog(error.message);
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./dist"));

const html = async () => {
  const compiledFolderPath = path.resolve("./compiled");

  Object.keys(require.cache).forEach((path) => {
    if (path.includes(compiledFolderPath)) delete require.cache[path];
  });

  const reactComponent = require(`./compiled/components/index.js`);
  const reactString = renderToStaticMarkup(reactComponent.default);

  const htmlString = await fs.readFile("./src/index.html", { encoding: "utf8" });
  const cssString = await fs.readFile("./src/index.css", { encoding: "utf-8" });

  const hydratedHtmlString = htmlString
    .replace("<!-- FormContainer -->", reactString)
    .replace("<!-- Style -->", `<style>${cssString}</style>`);

  await fs.writeFile("./dist/index.html", hydratedHtmlString);
};

const image = () => src("./src/**/*.{jpg,png}").pipe(dest("dist"));

const build = series(clean, transform, js, html, image);

task("watch", () => watch("./src/**/*", { ignoreInitial: false }, build));

task("default", build);
