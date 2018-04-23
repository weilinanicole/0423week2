var gulp = require('gulp');
var scss = require('gulp-sass');
var server = require('gulp-webserver');
var minJs = require('gulp-uglify');
var minHtml = require('gulp-htmlmin');
var minCss = require('gulp-clean-css');
var data = require('./src/data/data.json');
gulp.task('minCss', function() {
    gulp.src('src/css/*.scss')
        .pipe(scss())
        .pipe(minCss())
        .pipe(gulp.dest('dist/css'))
});
gulp.task('minJs', function() {
    gulp.src(['src/js/*.js', '!src/js/*.min.js'])
        .pipe(minJs())
        .pipe(gulp.dest('dist/js'))
})
gulp.task('minHtml', function() {
    gulp.src('src/*.html')
        .pipe(minHtml(options))
        .pipe(gulp.dest('dist'))
});
var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true, //压缩页面CSS
}
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            livereload: true,
            open: true,
            middleware: function(req, res, next) {
                if (req.url === '/login') {
                    res.end(JSON.stringify(data))
                }
                next()
            }
        }))
});;
gulp.task('default', ['minCss', 'minJs', 'minHtml', 'server'])