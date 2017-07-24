const yeoman = require('yeoman-generator')
var _ = require("lodash")
var fs = require('fs');

var websiteGenerator = {}

module.exports = class extends yeoman.Base {
    constructor(args, opts) {
        super(args, opts)
        this.Global = {}

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
            this.destinationPath('Controllers/HomeController.cs'),
            {
                "controllerName": 'Home',
                "projectNamespace": this.options['projectNamespace']
            }
        )
        
        this.fs.copyTpl(
            this.templatePath('Index.cshtml'),
            this.destinationPath('Views/Home/Index.cshtml'),
            {
                controllerName: 'Home',
                content : 'content'
            }
        )
        
    }
}