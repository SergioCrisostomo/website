'use strict';

var correct = require('../sortingOrder.json');

function sort(project, toSort){
    var arr = toSort[0] ? toSort : Object.keys(toSort);
    var sorted = correct[project].map(function(mdl, i){
	var module = typeof mdl == 'string' ? mdl : Object
        var missing = arr.indexOf(module) == -1;
        return missing ? null : module;
    });
    return sorted.filter(Boolean);
}

module.exports = sort;
