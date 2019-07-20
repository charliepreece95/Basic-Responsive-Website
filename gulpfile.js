const gulp = require('gulp');
const cssNano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();

/*
    --TOP LEVEL FUNCTIONS--
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.public - Points to folder to output
    gulp.watch - watch files and folders for changes
*/

//copy all the html files
gulp.task('copyhtml', (res) => {
    gulp.src('src/html/*.html')
    .pipe(gulp.dest('public/html'));
    return res();
});

//copy index html
gulp.task('copyindex', (res) => {
    gulp.src('src/*.html')
    .pipe(gulp.dest('public'));
    return res();
});

//copy css
gulp.task('copycss', (res) => {
    gulp.src('src/css/*.css')
    .pipe(cssNano())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
    return res();
});

//copy media
gulp.task('copymedia', (res) => {
    gulp.src('src/media/img/*')
        .pipe(gulp.dest('public/media/img'));
        return res();
});


//watch for changes
gulp.task('watch', (res) => {
    gulp.watch('src/html/*.html', gulp.series('copyhtml'));
    gulp.watch('src/index.html', gulp.series('copyindex'));
    gulp.watch('src/css/*.css', gulp.series('copycss'));
    gulp.watch('src/media/img/*', gulp.series('copymedia'));
    return res();
});

//Sync and refresh browser
gulp.task('serve', (res) => {
    browserSync.init({
        injectChanges: true,
        server: './public'
    });
    gulp.watch('src/index.html').on('change', browserSync.reload);
    gulp.watch('src/html/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/*.css').on('change', browserSync.reload);
    gulp.watch('src/media/img/*').on('change', browserSync.reload);
    return res();
});

//Watch and serve
gulp.task('default', gulp.series(['watch', 'serve']));
