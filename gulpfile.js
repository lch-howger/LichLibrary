var gulp = require('gulp');
var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', async function () {
    gulp.src('views/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});