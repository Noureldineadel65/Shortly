const { src, task, watch, series, parallel, dest } = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	sourceMaps = require("gulp-sourcemaps"),
	terser = require("gulp-terser"),
	browserSync = require("browser-sync").create(),
	imagemin = require("gulp-imagemin");
task("browser-sync", async function () {
	browserSync.init({
		server: { baseDir: "./" },
	});
});
function reload(done) {
	browserSync.reload();
	done();
}
task("style", async function () {
	src("src/Scss/**/**.scss")
		.pipe(sourceMaps.init())
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: "compressed",
			})
		)
		.on("error", console.error.bind(console))
		.pipe(
			autoprefixer({
				cascade: false,
				overrideBrowserslist: ["last 10 versions"],
			})
		)
		.pipe(sourceMaps.write("./"))
		.pipe(dest("./dist/CSS"))
		.pipe(browserSync.stream());
});
task("js", async function () {
	src("src/index.js")
		.pipe(sourceMaps.init())
		.pipe(terser())
		.pipe(sourceMaps.write("./"))
		.pipe(dest("./dist/Js"))
		.pipe(browserSync.stream());
});
task("html", async function () {
	src("**.html").pipe(browserSync.stream());
});
task("images", async function () {
	src("src/images/*")
		.pipe(imagemin())
		.pipe(dest("dist/images"))
		.pipe(browserSync.stream());
});
task("default", series("style", "js", "html", "images"));
task(
	"watch",
	series(series("default", "browser-sync"), function () {
		watch("src/Scss/**/**.scss", series("style", reload));
		watch("src/index.js", series("js", reload));
		watch("**.html", series("html", reload));
		watch("src/images/*", series("images", reload));
	})
);
