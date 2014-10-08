"use strict";

var fs = require('fs');
var pkg = require('../package.json');
var path = require('path');
var getFiles = require('./getFiles.js');

function convert(text){

	var htmlJS = '';
	var JSstring = [];
	var HTMLstring = [];
	
	// strip HTML blocks. Maybe add them later? so they can be run
	var markdown = text.replace(/<html\>([\s\S]*)<\/html\>/, function(){
		htmlJS = arguments[1];
		return '';
	});

	// colect javascript to syntax highlight
	markdown = markdown.replace(/(<code javascript\s?\w*\>([\s\S]*?)<\/code\>)/g, function(string, submatch1, submatch2){
		JSstring.push('```js\n\n' + submatch2 + '\n```\n\n');
		return 'JScodeBlockHere';
	});

	// colect HTML to syntax highlight
	markdown = markdown.replace(/(<code html\s?\w*\>([\s\S]*?)<\/code\>)/g, function(string, submatch1, submatch2){
		HTMLstring.push('```html\n\n' + submatch2 + '\n```\n\n');
		return 'HTMLBlockHere';
	});

	// fix italic
	markdown = markdown.replace(/(\/\/([^\/\/\]]*)\/\/)/g, function(string, submatch1, submatch2){
		var text = submatch2;
		return '*' + submatch2 + '*';
	});

	// titles fix (not to be applied inside JS block)
	markdown = markdown.replace(/([=]{2,}([^=]*)[=]{2,})/g, function(string, submatch1, submatch2){
		var titleLevel = submatch1.match(/([=]{2,})/)[0].length;
		var title = submatch2;
		for(var hash = ''; hash.length < 7 - titleLevel; hash += '#'){};
		return hash + title + '\n';
	});

	// links fix
	markdown = markdown.replace(/(\[\[([^\|]*\|[^\]]*)\]\])/g, function(string, submatch1, submatch2){
		var parts = submatch2.split('|');
		return '[' + parts[1] + '](' + parts[0] + ')';
	});

	// put back the javascript!
	markdown = markdown.split('JScodeBlockHere');
	markdown = markdown.map(function(string, i){
		return i == JSstring.length ? string : string + JSstring[i];
	});
	markdown = markdown.join('');
	// put back the html!
	markdown = markdown.split('HTMLBlockHere');
	markdown = markdown.map(function(string, i){
		return i == HTMLstring.length ? string : string + HTMLstring[i];
	});
	markdown = markdown.join('');

	//misc cleanup
	markdown = markdown.replace(/```[\n]*,/, '```\n');
	markdown = markdown.replace(/[\n]{2,}/, '\n\n');
	return markdown;
}

// to export later
var dir = 'mootorial';
var files = getFiles(dir, null, '.txt');
files.forEach(function(filepath){
	fs.readFile(filepath, 'utf8', function (err, data) {
		if (err) throw err;
		var mdData = convert(data);
		//var filename = filepath.slice(0, -3) + 'md';
		var filename = path.basename(filepath);
		filename = path.dirname(filepath) + '/' + filename.replace(/[0-9]*-/, '');
		filename = filename.slice(0, -3)  + 'md';

		fs.writeFile(filename, mdData, function (err) {
			if (err) throw err;
			console.log(filename + ' saved');
		});
	});
})

