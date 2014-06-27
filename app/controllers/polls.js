var mongoose = require('mongoose'),
    async = require('async'),
    Poll = mongoose.model('Poll'),
    _ = require('underscore');

// Polls
// ------------------------------------------------
exports.get = function(req, res) {
    Poll.findById(req.params.poll_id, function(err, poll) {
        if (err) res.send(500, err);
        res.json(poll);
    });
};

exports.post = function(req, res) {
    var poll = new Poll();

    poll.question = req.body.question;
    poll.desc = req.body.desc;

    poll.save(function(err) {
        if (err) res.send(500, err);
        res.json(201, { message: 'Poll created!' });
    });
};

exports.put = function(req, res) {
    Poll.findById(req.params.poll_id, function(err, poll) {
        if (err) res.send(500, err);

        poll.question = req.body.question;
        poll.desc = req.body.desc;

        poll.save(function(err) {
            if (err) res.send(500, err);
            res.json(200, { message: 'Poll updated!' });
        });
    });
};

exports.delete = function(req, res) {
    Poll.remove({ _id: req.params.poll_id }, function(err, poll) {
        if (err) res.send(500, err);

        res.json(200, { message: 'Poll deleted' });
    });
};



// Polls->Options
// ------------------------------------------------
var options = function(req, res) {
    Poll.findById(req.params.poll_id, 'options')
        .populate('options.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            res.json(poll.options);
        });
};

options.get = function(req, res) {
    Poll.findById(req.params.poll_id, 'options')
        .populate('options.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            var option = poll.options.id(req.params.object_id);

            if (!option) res.send(404, 'Option not found with id ' + req.params.object_id);
            res.json(option);
        });
};

options.post = function(req, res) {
    Poll.findById(req.params.poll_id, 'options')
        .populate('options.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);


            poll.addOption(req.body.name, function(err) {
                if (err) res.send(500, err);
                res.json(201, { message: 'Option created!' });
            });
        });
};

options.put = function(req, res) {
    Poll.findById(req.params.poll_id, 'options')
        .populate('options.votes.user', 'name email username')
        .exec(nction(err, poll) {
            if (err) res.send(500, err);

            var option = poll.options.id(req.params.option_id);

            option.name = req.body.name;

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(201, { message: 'Option created!' });
            });
        });
};

options.del = function(req, res) {
    Poll.findById(req.params.poll_id, 'options')
        .populate('options.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            poll.options.id(req.params.option_id).remove();

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(200, { message: 'Option deleted!' });
            });
        });
};

exports.options = options;


// Polls->Comments
// ------------------------------------------------
var comments = function(req, res) {
    Poll.findById(req.params.poll_id, 'comments')
        .populate('comments.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            res.json(poll.comments);
        });
};

comments.get = function(req, res) {
    Poll.findById(req.params.poll_id, 'comments')
        .populate('comments.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            var comment = poll.comments.id(req.params.comment_id);

            if (!comment) res.send(404, 'Comment not found with id ' + req.params.comment_id);
            res.json(comment);
        });
};

comments.post = function(req, res) {
    Poll.findById(req.params.poll_id, 'comments')
        .populate('comments.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            poll.comments.push({
                body: req.body.body
            });

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(201, { message: 'Comments created!' });
            });
        });

};

comments.put = function(req, res) {
    Poll.findById(req.params.poll_id, 'comments')
        .populate('comments.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            var comment = poll.comments.id(req.params.comment_id);
            comment.body = req.body.body;

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(201, { message: 'Comment edited!' });
            });
        });
};

comments.del = function(req, res) {
    Poll.findById(req.params.poll_id, 'comments')
        .populate('comments.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            poll.comment.id(req.params.comment_id).remove();

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(201, { message: 'Comment deleted!' });
            });
        });
};

exports.comments = comments;
