var gulp = require('gulp'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    scss = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
		minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    concatCSS = require('gulp-concat-css'),
    clean = require('gulp-clean'),
    cache = require('gulp-cache'),
 		nodemon = require('gulp-nodemon');
// Config
var paths = {
        scss: 'static/stylesheets/*.scss',
				html: 'static/index.html',
				fonts: 'static/fonts/**/*',
        js: 'static/js/**/*.js',
        images: 'static/images/**/*'
    },
    dests = {
				main: 'dist/*',
				html: 'dist',
				fonts: 'dist/fonts',
        css: 'dist/stylesheets',
        js: 'dist/js',
        images: 'dist/images'
    },
    options = {
        autoprefix: 'last 10 version',
        imagemin: { optimizationLevel: 3, progressive: true, interlaced: true },
        jshint: '',
        jshint_reporter: 'default',
        scss: {},
        uglify: { mangle: false },
        clean: { read: false }
    };
 
// Clean
gulp.task('clean', function() {
    return gulp.src([
            dests.main
        ], options.clean )
        .pipe( clean() )
        .pipe( notify( { message: 'Clean task complete.' } ) )
});
 
// CSS
gulp.task('css', function () {
    return gulp.src( paths.scss )
        .pipe( scss( options.scss ).on( 'error', gutil.log ) )
        .pipe( autoprefix( options.autoprefix ) )
        .pipe( concatCSS( "bundle.min.css" ) )
				.pipe( minifyCSS( ) )
				.pipe( gulp.dest( dests.css ) )
        .pipe( notify( { message: 'CSS task complete.' } ) )
});
 
// JS
gulp.task('js', function () {
    return browserify('./static/js/app.js')
    		.bundle()
    		.pipe(source('bundle.min.js')) // gives streaming vinyl file object
    		.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
				//.pipe( uglify( options.uglify ) )
        .pipe( gulp.dest( dests.js ) )
        .pipe( notify( { message: 'Scripts task complete.' } ) )
});
 
// Images
gulp.task('images', function() {
    return gulp.src( paths.images )
        .pipe( cache( imagemin( options.imagemin ) ) )
        .pipe( gulp.dest( dests.images ) )
        .pipe( notify( { message: 'Images task complete.' } ) )
});

gulp.task('html', function() {
		return gulp.src(paths.html)
				.pipe(gulp.dest(dests.html))	
});

gulp.task('fonts', function() {
		return gulp.src(paths.fonts)
				.pipe(gulp.dest(dests.fonts));
});
 
// Watch
gulp.task('watch', function () {
    gulp.watch( paths.scss, ['css'] );
    gulp.watch( paths.js, ['js'] );
    gulp.watch( paths.images, ['images'] );
		gulp.watch( paths.html, ['html'] );
});

gulp.task('server', function() {
	nodemon({script: 'server.js'});
});

// Global
gulp.task('default', ['clean'], function() {
    gulp.start('watch','css', 'js', 'images', 'html', 'fonts', 'server');
});
