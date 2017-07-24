const yeoman = require('yeoman-generator')
var _ = require("lodash")
var Util = {}
const availablePages = [
    {optionName : 'homePage', templateName : 'home', controllerName : 'Home', displayName : 'Home'},
    {optionName : 'aboutPage', templateName : 'about', controllerName : 'About', displayName : 'About'},
    {optionName : 'workPage', templateName : 'work', controllerName : 'Work', displayName : 'Work'},
    {optionName : 'contactPage', templateName : 'contact', controllerName : 'Contact', displayName : 'Contact'},
    {optionName : 'flickrPage', templateName : 'flickr', controllerName : 'Flickr', displayName : 'Flickr Gallery'},
    {optionName : 'tumblrPage', templateName : 'tumblr', controllerName : 'Tumblr', displayName : 'Tumblr Blog'}
]

module.exports = class extends yeoman.Base {
        constructor(args, opts) {
            super(args, opts)
            this.Global = {}
            this.Global.Pages = {}

            this.option('projectNamespace', {
                type: String,
                alias: 'n',
                required: false,
                desc: 'namespace value for dotnet core project classes',  
                default: 'WebTemplate'
            })

        }


        writing() {
            // Copy all non-dotfiles
            this.fs.copy(
                this.templatePath('site/**/*'),
                this.destinationRoot()
            )

            // Copy all dotfiles
            this.fs.copy(
                this.templatePath('site/.*'),
                this.destinationRoot()
            )

            this.fs.copyTpl(
                this.templatePath('Program.cs'),
                this.destinationPath('Program.cs'),
                {
                    projectNamespace : this.options['projectNamespace']
                }
            )

            this.fs.copyTpl(
                this.templatePath('Startup.cs'),
                this.destinationPath('Startup.cs'),
                {
                    projectNamespace : this.options['projectNamespace']
                }
            )
            
        }
        
    }
