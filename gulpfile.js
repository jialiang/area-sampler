const { dest, src, task, parallel, watch } = require("gulp");
const { createProject } = require("gulp-typescript");

const tsProject = createProject("tsconfig.json");

const js = () => tsProject.src().pipe(tsProject()).js.pipe(dest("docs"));
const html = () => src("./src/**/*.html").pipe(dest("docs"));
const image = () => src("./src/**/*.png").pipe(dest("docs"));

task("default", () =>
  watch("./src/**/*", { ignoreInitial: false }, parallel(js, html, image))
);
