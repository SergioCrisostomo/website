'use strict';

var correct = require('../sortingOrder.json');

function sort(project, arr){
    var sorted = correct[project].map(function(module, i){
        var missing = arr.indexOf(module) == -1;
        return missing ? null : module;
    });
    return sorted.filter(Boolean);
}

module.exports = sort;
