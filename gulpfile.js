var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rimraf = require('gulp-rimraf'),
    webpackStream = require('webpack-stream'),
    exec = require('child_process').exec,
    browserSync = require('browser-sync').create();

gulp.task('browser-sync-for-development', ['webpack'], function(){
    browserSync.init({
        browser: "google chrome",
        server: {
            baseDir: './',
            index: "index.html"
        }
    });

    browserSync
        .watch(['app.js', 'index.html', './common/**/*.*', './js/**/*.*'])
        .on("change", browserSync.reload);
});

gulp.task('clean-deploy', function(){
    return gulp.src(['./deploy'], { read:false }).pipe(rimraf());
})

// clean all compiled files and deploy folder
gulp.task('clean', ['clean-deploy'], function(){
    files = [ './app.js' ]
    return  gulp.src(files, { read:false })
                .pipe(rimraf());
})

// webpack
gulp.task('webpack', function() {
    return webpackRun('./webpack.config.js');
});

function webpackRun(config_file) {
    return  gulp.src('./js/app.js')
                .pipe(webpackStream(require(config_file)))
                .pipe(gulp.dest('./'));
};


// for developer test and compile
gulp.task('default', ['webpack', 'browser-sync-for-development'], function(){
    gulp.watch(['./js/**/*.js'], ['webpack']);
    // gulp.watch(['./js/**/*.js'], ['webpack-for-watch']);
    gulp.watch(['./common/**/*.js'], ['webpack']);
});

// deploy to production, it will move essential files to deploy folder
gulp.task('deploy', ['webpack', 'move-files-to-deploy'], function(){

});