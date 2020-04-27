'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');


//turn scss file into scc
gulp.task('sass', function() {
    //source scss file
    return gulp.src(['./src/style/*.scss', './src/style/*.css'])
        .pipe(concat('style.css'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        //minify css
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./public/style.css'));
});

gulp.task('watch', function() {
    gulp.watch(['./src/style/*.scss', './src/style/*.css'], gulp.parallel('sass'))
});

gulp.task('default', gulp.series('sass', 'watch'));