const yeoman = require('yeoman-generator')
var _ = require("lodash")
var rp = require('request-promise')
var Promise = require('bluebird')
var flickrOptions = {}
var photos = require('./photos.js')


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

            this.option('key', {
                type: String,
                alias: 'k',
                required: true,
                desc: 'flickr api key',  
                default: 'ABCDEF'
            })

    }

    writing() {

        this.fs.copyTpl(
            this.templatePath('Controller.cs'),
            this.destinationPath('Controllers/FlickrController.cs'),
            {
                "controllerName": 'Flickr',
                "projectNamespace": this.options['projectNamespace']
            }
        )

        photos(this.options['key']).done((photos) => {

                this.fs.copyTpl(
                    this.templatePath('Index.cshtml'),
                    this.destinationPath('Views/Flickr/Index.cshtml'),
                        {
                            controllerName: 'Flickr',
                            images : photos
                        }
                )
            })
            
    }

}

