'use strict';


// http://jsfiddle.net/w1bm60c7/
function sort(arr, sortArr) {
    var sorted = result = arr.map(function (el, i) {
        var pos = sortArr.indexOf(el);
        return sortArr[pos];
    });
    return sorted.filter(Boolean);
}

module.exports = sort;
