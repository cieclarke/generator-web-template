var gulp = require('gulp');
var photos = require('./generators/flickr/photos.js')
var _ = require('lodash')
var sass = require('node-sass')

var argValue = (key) => {
    var index = _.findIndex(process.argv, (i) => {
        return i == '--' + key
    })
    return process.argv[index+1]
}

gulp.task('photos', function() {

    var flickrKey = argValue('key')
    
    photos(flickrKey).done((photos) => { 
        
        
    })

})

gulp.task('css', function() {
    
    var path = 'node_modules/bootstrap/scss/bootstrap.scss'
    
    var result = sass.renderSync({
        //file: this.templatePath('default.scss'),
        file: path,
        outputStyle: 'compressed',
        outFile: 'main.css',
        sourceMap: false, // or an absolute or relative (to outFile) path
        importer: (url, prev, done) => {
            return {file: result.path, contents: result.data};
        }
    })
    
    console.log(result.css)
    
})
