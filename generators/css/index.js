const yeoman = require('yeoman-generator')
var _ = require("lodash")
var websiteGenerator = {}

module.exports = class extends yeoman.Base {
    constructor(args, opts) {
            super(args, opts)
            

    }

    writing() {
        
        this.fs.copyTpl(
            this.templatePath('Controller.cs'),
            this.destinationPath('Controllers/TumblrController.cs'),
            {
                "controllerName": 'Tumblr',
                "projectNamespace": this.Global.projectNamespace
            }
        )
        
        this.fs.copyTpl(
            this.templatePath('Index.cshtml'),
            this.destinationPath('Views/Tumblr/Index.cshtml'),
            {
                "controllerName": 'Tumblr'
            }
        )
        
    }
}