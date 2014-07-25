/* Dependencies */

exports.render = function(req, res) {
    'use strict';

    res.header('Access-Control-Allow-Origin', '*');

    var data = {
        vm: 'index'
    };

    res.render('index.html');
};
