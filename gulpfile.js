"use strict";

const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const runSequence = require("run-sequence");
const imagemin = require("gulp-imagemin");
const minifyInline = require("gulp-minify-inline");
const uglify = require("gulp-uglify-es").default;
const obfuscate = require("gulp-obfuscate");
const uncss = require("gulp-uncss");
const sftp = require("gulp-sftp");
const chug = require("gulp-chug");

// Set the browser that you want to supoprt
const AUTOPREFIXER_BROWSERS = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10"
];

//move everything over and then overwrite anything needing minifified, etc.
gulp.task("main", function() {
	return gulp.src("./src/**/*")
	.pipe(gulp.dest("C:\\Users\\JimBob\\Documents\\Gulp\\staging"))
});

// Gulp task to minify CSS files
gulp.task("styles", function () {
	return gulp.src	([
		"./src/css/**/*.css",//select all css files to be minified
		"!./src/css/**/*.min.css"//ignore files with .min attached
	])
	// Auto-prefix css styles for cross browser compatibility
	.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
	// Minify the file
	.pipe(csso())
	// Output
	.pipe(gulp.dest("C:\\Users\\JimBob\\Documents\\Gulp\\staging\\css"));
});

gulp.task("uncss-index", function() {
	return gulp.src([
		"./src/css/bootstrap-datepicker.min.css",
		"./src/css/customer-style-custom.css",
		"./src/css/daterangepicker.css",
		"./src/css/header-style.css"
	  ])
	  .pipe(uncss({
		html: [
		  "src/index.html",
		]
	  }))
	  .pipe(gulp.dest("C:\\Users\\JimBob\\Documents\\Gulp\\staging\\css"));
  });

// Gulp task to minify JavaScript files
gulp.task("scripts", function() {
  return gulp.src ([
	"./src/*.js",//select all css files to be minified
	"!./src/*.min.js"//ignore files with .min attached
])
    // Minify the file
	.pipe(uglify({
		compress: {
			drop_console: true
		}
	}))
	.pipe(obfuscate())
    // Output
    .pipe(gulp.dest("C:\\Users\\JimBob\\Documents\\Gulp\\staging\\js"));
});

// Gulp task to minify HTML files
gulp.task("pages", function() {
  return gulp.src(["./src/views/*.html"])
    .pipe(htmlmin({
      collapseWhitespace: true,
	  removeComments: true
	}))
	.pipe(minifyInline())//minifies the js portion (if any) of the html page
    .pipe(gulp.dest("C:\\Users\\JimBob\\Documents\\Gulp\\staging"));
});

//move fonts over from css without any changes
gulp.task("css-fonts", function() {
	return gulp.src("./src/css/fonts/**/*")
	.pipe(gulp.dest("C:\\Users\\JimBob\\Documents\\Gulp\\staging/css/fonts"))
});

//minify images
gulp.task("images", function(){
	return gulp.src("src/images/*")
	.pipe(imagemin())
	.pipe(gulp.dest("C:\\Users\\JimBob\\Documents\\Gulp\\staging/images"))
});

//webhook for github
//again
app.get("/webhook", function(req, res) {
  gulp.src("./gulpfile.js", { read: false})
    .pipe( chug( {
      tasks: ["default"]  
    } ) );
});

const gitWebhook = require("gulp-git-webhook");
const config = {
  "secret": "your-github-webhook-secret",
  "path": "/webhook",
  "port": 8081,
  "branch": "refs/heads/master",
  "cmd": "git pull origin master --no-edit"
};
gitWebhook(config);

gulp.task("deploy", function () {
    return gulp.src("staging/**")
        .pipe(sftp({
            host: "hillbillycode.com",
            user: "root",
			pass: "superbob2019",
			remotePath: "/var/www/example.com/public_html/",
			timeout: 9999,
			//to use shh instead of password use the following option
			key: "C:\\Users\\JimBob\\Documents\\Keys\\hbc_public"
        }));
});

/*************************************************************/
//generic gulp funciton to move anything without change
//very helpful if something gets broken and you need the source file
//i.e. if the uglify and obfuscate breaks all of your js code
//simply make the src == ("your js folder location goes here") and set the destination to
//gulp.dest("your destination js folder location goes here") and all the js files will be overwritten
//without modification and should work properly
//to run this, uncomment the below function and open a command line as you would to gulp normally
//type the command> gulp pipe and this will send the selected files

// make sure of your file structure and the location where you would like it sent
gulp.task("pipe", function(){
	return gulp.src("C:\\Users\\JimBob\\Documents\\Gulp\\package.json")//pick a src file or folder to send and insert it between the quotes
	.pipe(gulp.dest("C:\\Users\\JimBob\\Documents\\Gulp\\staging\\js"))//pick a destination to send it to and insert it between the quotes
});

/**************************************************************/

// Clean output directory
gulp.task("clean", () => del(["Gulp"]));

// Gulp task to minify all files
gulp.task("default", ["clean"], function () {
  runSequence(
	//"main",
	//"styles",
	"pipe",
    "scripts",
	//"pages",
	//"css-fonts",
	//"images",
	"deploy"
  );
});
