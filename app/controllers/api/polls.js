var mongoose = require('mongoose'),
    async = require('async'),
    Poll = mongoose.model('Poll'),
    _ = require('underscore');

// Polls
// ------------------------------------------------
exports.getPublic = function(req, res) {
    Poll.find()
        .populate('user', 'name email username')
        .populate('comments.user', 'name email username')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, polls) {
            if (err) res.send(500, err);
            res.json(polls);
        });
};

exports.getRecent = function(req, res) {
    Poll.find()
        .populate('user', 'name email username')
        .populate('comments.user', 'name email username')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, polls) {
            if (err) res.send(500, err);
            res.json(polls);
        });
};

exports.get = function(req, res) {
    console.log(req.params.poll_id);

    Poll.findById(req.params.poll_id)
        .populate('user', 'name email username')
        .populate('comments.user', 'name email username')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);
            res.json(poll);
        });
};

exports.post = function(req, res) {
    var poll = new Poll();


    Poll.create({
        question: req.body.question,
        desc: req.body.desc
    }, function(err, poll) {
        if (err) res.send(500, err);

        res.json(201, { 
            message: 'Poll created!',
            poll: poll
        });

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

exports.del = function(req, res) {
    Poll.remove({ _id: req.params.poll_id }, function(err, poll) {
        if (err) res.send(500, err);

        res.json(200, { message: 'Poll deleted' });
    });
};



// Polls->Choices
// ------------------------------------------------
var choices = function(req, res) {
    Poll.findById(req.params.poll_id, 'choices')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            res.json(poll.choices);
        });
};

choices.get = function(req, res) {
    Poll.findById(req.params.poll_id, 'choices')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            var option = poll.choices.id(req.params.option_id);

            if (option == null)
                res.send(404, 'Option not found with id ' + req.params.option_id);
    
            res.json(option);
        });
};

choices.post = function(req, res) {
    Poll.findById(req.params.poll_id, 'choices')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            var choice = {
                name: req.body.name
            };

            poll.choices.push(choice);

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(201, { 
                    message: 'Option created!',
                    id: poll.choices[poll.choices.length-1]._id
                });
            });
        });
};

choices.put = function(req, res) {
    Poll.findById(req.params.poll_id, 'choices')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            var option = poll.choices.id(req.params.option_id);

            option.name = req.body.name;

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(201, { message: 'Option created!' });
            });
        });
};

choices.vote = function(req, res) {
    Poll.findById(req.params.poll_id, 'choices')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);


            poll.vote(
                req.params.option_id, {}, 1,
                function(err) {
                    if (err) res.send(500, err);
                    res.json(201, { message: 'Vote added!' });
                });
        });

};

choices.del = function(req, res) {
    Poll.findById(req.params.poll_id, 'choices')
        .populate('choices.votes.user', 'name email username')
        .exec(function(err, poll) {
            if (err) res.send(500, err);

            poll.choices.id(req.params.option_id).remove();

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(200, { message: 'Option deleted!' });
            });
        });
};

exports.choices = choices;


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

            var comment = {
                body: req.body.body
            };

            poll.comments.push(comment);

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(201, { 
                    message: 'Comments created!',
                    id: poll.comments[poll.comments.length-1]._id
                });
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

            poll.comments.id(req.params.comment_id).remove();

            poll.save(function(err) {
                if (err) res.send(500, err);
                res.json(201, { message: 'Comment deleted!' });
            });
        });
};

exports.comments = comments;
