const yeoman = require('yeoman-generator')
var _ = require("lodash")
var websiteGenerator = {}
var rp = require('request-promise')

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

            this.option('key', {
                type: String,
                alias: 'k',
                required: true,
                desc: 'tumblr api key',  
                default: 'ABCDEF'
            })

    }

    writing() {
        
        this.fs.copyTpl(
            this.templatePath('Controller.cs'),
            this.destinationPath('Controllers/TumblrController.cs'),
            {
                "controllerName": 'Tumblr',
                "projectNamespace": this.options['projectNamespace']
            }
        )
        
        var posts = () => {
            return rp(
            {
                uri: 'https://api.tumblr.com/v2/blog/mendipsnow.tumblr.com/posts',
                qs: {  
                    api_key: this.options['key']
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            })
            .then((p) => { 
                return _.map(p.response.posts, (post) => { return post.id})
            })
            .then((ids) => {
                var a = _.map(ids, (id) => {
                    return rp(
                    {
                        uri: 'https://api.tumblr.com/v2/blog/mendipsnow.tumblr.com/posts',
                        qs: {  
                            api_key: this.options['key'],
                            id : id
                        },
                        headers: {
                            'User-Agent': 'Request-Promise'
                        },
                        json: true
                    })
                })

                return Promise.all(a).then((p) => { return p })
            })
            .then((p) => {
                return _.map(p, (post) => {
                    return post.response.posts[0]
                })
            })
        }
        
        posts().done((t) => {
            console.log(t)
            /*
            this.fs.copyTpl(
                this.templatePath('Index.cshtml'),
                this.destinationPath('Views/Tumblr/Index.cshtml'),
                {
                    "controllerName": 'Tumblr',
                    posts : t
                }
            )
            */
        })


        
    }
}