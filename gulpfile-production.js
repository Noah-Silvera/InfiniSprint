/**
 * The build system
 * Credits to webdesserts for the auto reload node pattern
 * https://gist.github.com/webdesserts/5632955
 */

var gulp = require('gulp');
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var livereload = require('gulp-livereload')
var clean = require('gulp-clean')
var runSequence = require('run-sequence')
var babel = require('gulp-babel')
var sourceMaps = require('gulp-sourceMaps')
var notify = require('gulp-notify')

var spawn = require('child_process').spawn
var node;

/**
*****************************************************
 *                 CONFIG
*****************************************************
 */

// the file patterns used to refresh files
// ensure any files you want to be 'watched' match these patterns
//
// for elements with a base pre-pended ( like backend and frontend ), the base attribute must be passed to
// gulp.src to ensure the file structure is copied properly
// https://github.com/gulpjs/gulp/blob/master/docs/API.md
var patt = {
    'sass': './src/sass/**/*.scss',
    'scriptsBase' : 'src/scripts/',
    'static':'./src/static/**/*'
}

patt['backend'] = patt.scriptsBase + '/server/**/*.js'
patt['frontend'] = patt.scriptsBase + '/client/**/*.js'


/**
*****************************************************
 *                 OVERVIEW
*****************************************************
 * This build system copies code from the src directory to the dest directory. 
 * In this process, it will do any preprocessing neccesary ( in this case, sass )
 * 
 * Certain file patterns, defined above, are set to be 'watched'. When a file matching
 * one of these patterns is changed, either a.) node and the browser will be refreshed or 
 * b.) the browser will be refreshed, depending on what has been changed.
 * 
 * This refresh process involves re-copying the required code, re-running node if neccesary,
 * and signalling the livereload browser plugin to inject new code into the webpage
 * 
 * Enjoy your rapid dev!
 */

/*
*****************************************************
 *                 RUNTIME TASKS
*****************************************************
*/

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('reload', function() {
  //destroy any running instances of node of this project
  if (node) node.kill()
  
  // spawn a new instance of node
  node = spawn('node', ['./dest/scripts/server/server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
  
  // refresh the browser page
  livereload.reload()
  console.log('code refreshed')
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})

// Master task - run at startup
// deletes old code files
// copies the new code files
// reloads the node app
// watches files for changes and live code reload
gulp.task('default',function(callback){
  runSequence('copy','reload','watch',callback )
})


// watches files for changes, and performs the appropiate reloads
gulp.task('watch',function() {  
  //start the browser injection system
  livereload.listen()
  
  // watch for changes to backend code that require a node reload
  gulp.watch(patt.backend, ['backendRefresh']);
  
  // watch for changes to frontend that just require browser reload
  gulp.watch(patt.frontend, ['frontend']);
  
  
  // watch for changes to sass files
  gulp.watch(patt.sass, ['sass'])
  
  // watch for changes to static files
  gulp.watch(patt.static, ['static']);
})

// copy all the code files to the dest folder ( concurrently )
gulp.task('copy',['backend','frontend','static'])


// copy the new backend files over
gulp.task('backend', function(){
  return gulp.src(patt.backend, { base: patt.scriptsBase } )
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(gulp.dest('./dest/scripts/'))
})

//refresh the backend files
gulp.task('backendRefresh',function(){
  runSequence('backend','reload')
})

// copy the new frontend files and refresh them
gulp.task('frontend', ['sass'], function(){

  
  return gulp.src(patt.frontend, { base: patt.scriptsBase } )
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourceMaps.init())
    .pipe(babel({
        presets: ["react","stage-0"]
    }))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./dest/scripts/'))
    .pipe(livereload())
})

// copy the static files
gulp.task('static', function(){
  return gulp.src(patt.static)
    .pipe(gulp.dest('./dest/static'))
    .pipe(livereload())
})

// preprocess and copy the sass files
gulp.task('sass', function () {
  return gulp.src(patt.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/css'))
    .pipe(livereload());
});



/*
*****************************************************
 *                 UTILITY TASKS
*****************************************************
*/


//delete all old destination files
// as deleted files in src are not deleted in dest
gulp.task('clean', function () {
	gulp.src('dest/**/*', {read: false})
        .pipe(plumber())
		.pipe(clean())
});