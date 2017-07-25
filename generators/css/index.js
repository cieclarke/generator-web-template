const yeoman = require('yeoman-generator')
var _ = require("lodash")
var sass = require('node-sass')

module.exports = class extends yeoman.Base {
    constructor(args, opts) {
            super(args, opts)

    }

    writing() {
        
        var result = sass.renderSync({
            file: this.templatePath('default.scss'),
            outputStyle: 'compressed',
            outFile: 'main.css',
            sourceMap: true, // or an absolute or relative (to outFile) path
            importer: (url, prev, done) => {
                return {file: result.path, contents: result.data};
            }
        })
        
        this.fs.write(this.destinationPath('wwwroot/css/main.css'), result.css)
        this.fs.write(this.destinationPath('wwwroot/css/main.css.map'), result.map)
    }

}