const yeoman = require('yeoman-generator')
var _ = require("lodash")
var sass = require('node-sass')

module.exports = class extends yeoman.Base {
    constructor(args, opts) {
            super(args, opts)

            this.option('outputStyle', {
                type: String,
                alias: 'o',
                required: false,
                desc: 'outputStyle option for node-sass',  
                default: 'expanded'
            })
    }

    writing() {

        sass.render({
            file: this.templatePath('app.scss'),
            outputStyle: this.options['outputStyle'], //nested, expanded, compact, compressed
            outFile: this.destinationPath('wwwroot/css/main.css.map'),
            sourceMap: true,
            includePaths: [ this.templatePath() ]
        }, (err, result) => { 
            if(err) {
                console.log(err)
            }
            this.fs.write(this.destinationPath('wwwroot/css/main.css'), result.css)
            this.fs.write(this.destinationPath('wwwroot/css/main.css.map'), result.map)

        })
        

    }

}