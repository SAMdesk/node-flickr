var path = require("path")
, https = require('https')
, fs = require('fs');

var Flickr = function(keys) {
    this.apiKey = keys['api_key'];
    this.apiUrl = "https://api.flickr.com/services/rest/?";
};

Flickr.prototype.get = function(method ,opts, result) {

    api_url = this.apiUrl
            + "&method=flickr."+ method
            + "&api_key=" + this.apiKey
            + "&format=json"
            +"&nojsoncallback=1";

    for (var item in opts) {
        api_url += "&" + item + "=" + opts[item];
    }

    https.get(api_url, function(res) {
        data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
        	try {
            	var jsonObj = JSON.parse(data);
            	result(jsonObj);
        	} catch(e) {
        		console.log("FLICKR ERROR: calling url", api_url, e);
        		result(null);
        	}
        });
    });
}

// export the module
module.exports = Flickr;