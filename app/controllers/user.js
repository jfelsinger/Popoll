'use strict';
/* Dependencies */

exports.render = function(req, res) {
    res.render('profile.html');
};

exports.login = function(req, res) {
    res.render('login.html');
};

exports.register = function(req, res) {
    res.render('register.html');
};
