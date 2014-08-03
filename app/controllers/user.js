'use strict';
/* Dependencies */

exports.render = function(req, res) {
    var data = { 
        vm: 'profile',
        user: req.user,
    };

    res.render('profile.html', data);
};

exports.login = function(req, res) {
    var data = { 
        vm: 'login',
        user: req.user,
    };

    res.render('login.html', data);
};

exports.register = function(req, res) {
    var data = { 
        vm: 'login',
        user: req.user,
    };

    res.render('login.html', data);
};
