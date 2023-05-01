"use strict";

const { dest, src, task, series, parallel, watch } = require("gulp");

const del = require("del");
const browserify = require("browserify");
const babelify = require("babelify");
const fancyLog = require("fancy-log");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const watchify = require("watchify");

const babel = require("@babel/core");
const requireFromString = require("require-from-string");
const { renderToStaticMarkup } = require("react-dom/server");
const fs = require("fs/promises");

const js = () => {
  const b = browserify({
    basedir: ".",
    debug: true,
    entries: ["./src/index.ts"],
    cache: {},
    packageCache: {},
    plugin: [watchify],
  }).transform(babelify, {
    presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-typescript"],
    extensions: [".ts"],
  });

  const bundle = () =>
    b
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

  const cleanJs = () => del("./docs/**/*.(js,map)");

  b.on("update", series(cleanJs, bundle));

  bundle();
};

const html = async () => {
  const transformed = await babel.transformFileAsync("./src/components/FormContainer.tsx", {
    presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
  });

  const formContainerComponent = requireFromString(transformed.code).default;

  const formContainerString = renderToStaticMarkup(formContainerComponent);
  const htmlString = await fs.readFile("./src/index.html", { encoding: "utf8" });
  const cssString = await fs.readFile("./src/index.css", { encoding: "utf-8" });

  const hydratedHtmlString = htmlString
    .replace("<!-- FormContainer -->", formContainerString)
    .replace("<!-- Style -->", `<style>${cssString}</style>`);

  await fs.writeFile("./docs/index.html", hydratedHtmlString);
};

const image = () => src("./src/**/*.png").pipe(dest("docs"));

const notJs = () => {
  const cleanNotJs = () => del("./docs/**/*.(html,png)");

  watch("./src/**/*.!(ts)", series(cleanNotJs, parallel(html, image)));
};

task("default", parallel(js, notJs));
