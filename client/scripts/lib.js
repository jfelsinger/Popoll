/*
 * lib.js
 *
 * Global functions and values that can be 
 * used throughout the application
 *
 */

'use strict';
/* jslint browser: true */

var config = require('./config'),
    request = require('superagent');


// A list of the '/' separated values in the url
var parameters = window.location.pathname.split('/').slice(1);

/**
 * public string getQueryValue([string] name)
 *
 * Returns the value of the query parameter given
 */
function getQueryValue(name) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == name) return pair[1];
    }

    return '';
}

/**
 * public void respond([func] cb)
 *
 * Run a cb if the response was a success
 */
function respond(cb) {
    return function(err, res) {
        if (err) return console.log(err);

        if (res.ok) {
            cb(err, res);
        } else {
            console.log(res);
        }
    };
}

/**
 * public string minifyUrl([string] url)
 *
 * Run a url through the tiny.cc api
 */
function minifyUrl(url) {
    var tinyUrl = '';

    request
        .get('http://tiny.cc/')
        .query({
            c: 'rest_api',
            m: 'shorten',
            login: config.tinycc.login,
            apiKey: config.tinycc.apiKey,
            version: config.tinycc.version,
            longUrl: encodeURIComponent(url);
        })
        .end(respond(function(err, res) {
            console.log(res);
        }));

    return tinyUrl;
}

exports.parameters = parameters;
exports.getQueryValue = getQueryValue;
exports.respond = respond;
exports.minifyUrl = minifyUrl;
