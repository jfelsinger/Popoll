var mongoose = require('mongoose');

exports.create = function(req, res) {
    var poll = req.poll;
    var user = req.user;
    
    poll.addComment(user, req.body, function(err) {
        res.send(201);
    });
};
