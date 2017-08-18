var gulp = require('gulp');
var photos = require('./generators/flickr/photos.js')
var _ = require('lodash')

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

