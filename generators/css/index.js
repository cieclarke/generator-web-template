const yeoman = require('yeoman-generator')
var _ = require("lodash")
var sass = require('node-sass')
var websiteGenerator = {}

module.exports = class extends yeoman.Base {
    constructor(args, opts) {
            super(args, opts)
            

    }

    writing() {
        
        var result = sass.renderSync({
            file: this.templatePath('default.scss'),
            //data: 'h1{background:green}',
            outputStyle: 'compressed',
            //outFile: 'style.css',
            sourceMap: true, // or an absolute or relative (to outFile) path
            importer: function(url, prev, done) {
                return {file: result.path, contents: result.data};
            }
        })

        console.log('result.css')
        console.log(result.css)
        console.log('result.map')
        console.log(result.map)
        console.log('result.stats')
        console.log(result.stats)


        
        this.fs.write(this.destinationPath('wwwroot/css/style.css'), result.css)
    }

}