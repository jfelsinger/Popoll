var async = require('async'),
    express = require('express'),
    config = require('./config');

module.exports = function(app) {
    var router = express.Router();

    var polls = require('../app/controllers/polls');

    // Poll routes
    // ------------------------------------------------
    router.route('/polls')
        .get(polls.getPublic)
        .post(polls.post);

        router.route('/poll')
            .post(polls.post);

    router.route('/poll/:poll_id')
        .get(polls.get)
        .put(polls.put)
        .delete(polls.del);


    // Poll->Choices routes
    // ------------------------------------------------
    router.route('/poll/:poll_id/choices')
        .post(polls.choices.post)
        .get(polls.choices);

        router.route('/poll/:poll_id/choice')
            .post(polls.choices.post);

    router.route('/poll/:poll_id/choice/:option_id')
        .get(polls.choices.get)
        .put(polls.choices.put)
        .delete(polls.choices.del);

    router.route('/poll/:poll_id/choice/:option_id/vote')
        .get(polls.choices.vote);

    // Poll->Comments routes
    // ------------------------------------------------
    router.route('/poll/:poll_id/comments')
        .post(polls.comments.post)
        .get(polls.comments);

        router.route('/poll/:poll_id/comment')
            .post(polls.comments.post);

    router.route('/poll/:poll_id/comment/:comment_id')
        .get(polls.comments.get)
        .put(polls.comments.put)
        .delete(polls.comments.del);

    // Allow all domains
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

    // Register routes
    app.use('/api', router);
};
