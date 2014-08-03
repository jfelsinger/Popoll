/* Dependencies */

exports.render = function(req, res) {
    'use strict';

    res.header('Access-Control-Allow-Origin', '*');

    console.log(req.user);

    var data = {
        vm: 'index',
        user: req.user,
    };

    res.render('index.html', data);
};
