const yeoman = require('yeoman-generator')
var _ = require("lodash")

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
