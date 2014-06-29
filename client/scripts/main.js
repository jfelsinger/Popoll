'use strict';
require('./vendor/es5-shim/es5-shim.min');
/* jslint browser: true */

// any general code to execute on
// all pages can be placed here

// Set the url of the api
module.exports.url = 'http://localhost:3000/api/';

// function for getting query values
var helpers = {};

helpers.getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == variable) return pair[1];
    }

    return false;
};

helpers.params = window.location.pathname.split('/').slice(1);

module.exports.helpers = helpers;
