var _ = require("lodash")

var masterList = [
        {Name : 'About', Link : '/About', Param : 'about'},
        {Name : 'Contact', Link : '/Contact', Param : 'contact'},
        {Name : 'Flickr', Link : '/Flickr', Param : 'flickr'},
        {Name : 'Home', Link : '/Home', Param : 'home'},
        {Name : 'Tumblr', Link : '/Tumblr', Param : 'tumblr'},
        {Name : 'Work', Link : '/Work', Param : 'work'}
    ]

module.exports = (options) => {

    var updateList = _.map(masterList, (i) => {
        i['IsMenuItem'] = false
        if(options[i.Param]) {
            i['IsMenuItem'] = true
        }
        return i
    })

    return updateList
}