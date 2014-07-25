/* Dependencies */

exports.render = function(req, res) {
    'use strict';

    var data = {
        vm: 'poll'
    };

    res.render('poll', data);
};
