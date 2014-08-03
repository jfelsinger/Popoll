/* Dependencies */

exports.render = function(req, res) {
    'use strict';

    var data = {
        vm: 'poll',
        user: req.user,
    };

    res.render('poll', data);
};
