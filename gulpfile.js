const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rucksack = require('rucksack-css');
const cssnext = require('postcss-cssnext');
// const autoprefixer = require ('autoprefixer')
const cssnested = require('postcss-nested');
const mixins = require('postcss-mixins');
const lost = require('lost');
const atimport = require('postcss-import');
const csswring = require('csswring');
const mqpacker = require('css-mqpacker');
const browserSync = require('browser-sync').create();


//servidor de desarrollo
gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

//Tarea para procesar el postcss
gulp.task('css', function(){
  var processors = [
    // autoprefixer({browsers: ['> 5%', 'ie 8']}),
    atimport(),
    mixins(),
    cssnested,
    lost(),
    rucksack(),
    cssnext({browsers: ['> 5%', 'ie 8']}),
    mqpacker,
    csswring(),
  ]
  return gulp.src('src/invie.css') //carpeta fuente
    .pipe(postcss(processors)) //array de plugins que se cargarán
      .pipe(gulp.dest('dist/css')) //carpeta destino
        .pipe(browserSync.stream())
})

//tarea para vigilar los cambios
gulp.task('watch', function(){
  gulp.watch('src/*invie.css', ['css'])
  gulp.watch('dist/*.html').on('change', browserSync.reload)
})

//unificando tareas
gulp.task('default', ['watch', 'serve','css'])
