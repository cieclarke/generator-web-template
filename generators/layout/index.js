const yeoman = require('yeoman-generator')
var _ = require("lodash")
var websiteGenerator = {}
var menuItems = require('./menuItems.js')

module.exports = class extends yeoman.Base {
    constructor(args, opts) {
            super(args, opts)
            
            this.option('websiteName', {
                type: String,
                alias: 'w',
                required: false,
                desc: 'name of web app',  
                default: 'website'
            })
    }

    writing() {
        
        this.fs.copyTpl(
            this.templatePath('_Layout.cshtml'),
            this.destinationPath('Views/Shared/_Layout.cshtml'),
            {
                websiteName: this.options['websiteName'],
                menuItems : menuItems(this.options)
            }
        )
        
    }
}