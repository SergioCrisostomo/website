"use strict";

var GoogleCDN = {
    "CoreVersions": ["1.5.0", "1.4.5", "1.4.4", "1.4.3", "1.4.2", "1.4.1", "1.4.0", "1.3.2", "1.3.1", "1.3.0", "1.2.5", "1.2.4", "1.2.3", "1.2.2", "1.2.1", "1.1.2", "1.1.1"]
}
var builds = ['', '-yui-compressed', '-nocompat', '-nocompat-yui-compressed'];

var http = require('http');
var fs = require('fs');

function saveFile(build, version){
    var file = fs.createWriteStream("public/js/mootools-" + version + build + ".js");
    var request = http.get("http://ajax.googleapis.com/ajax/libs/mootools/" + version + "/mootools" + build + ".js", function (response) {
        response.pipe(file);
    });
}
GoogleCDN.CoreVersions.forEach(function(version){
	builds.forEach(function(build){
		saveFile(build, version);
	});
})