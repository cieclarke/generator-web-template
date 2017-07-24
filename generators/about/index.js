const yeoman = require('yeoman-generator')
var _ = require("lodash")
var websiteGenerator = {}

module.exports = class extends yeoman.Base {
    constructor(args, opts) {
            super(args, opts)

            this.option('projectNamespace', {
                type: String,
                alias: 'n',
                required: false,
                desc: 'namespace value for dotnet core project classes',  
                default: 'WebTemplate'
            })

    }

    writing() {
        
        this.fs.copyTpl(
            this.templatePath('Controller.cs'),
            this.destinationPath('Controllers/AboutController.cs'),
            {
                "controllerName": 'About',
                "projectNamespace": this.options['projectNamespace']
            }
        )
        
        this.fs.copyTpl(
            this.templatePath('Index.cshtml'),
            this.destinationPath('Views/About/Index.cshtml'),
            {
                "controllerName": 'About'
            }
        )
        
    }
}