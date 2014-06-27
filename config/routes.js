var async = require('async'),
    express = require('express'),
    config = require('./config');

module.exports = function(app, passport, auth) {
    var router = express.Router();


    var polls = require('../app/countrollers/polls');
    // Poll routes
    // ------------------------------------------------
    router.route('/polls')
        .post(polls.post);

    router.route('/polls/:poll_id')
        .get(polls.get)
        .put(polls.put);
        .del(polls.delete);

    // Poll->Options routes
    // ------------------------------------------------
    router.route('/polls/:poll_id/options')
        .post(polls.options.post)
        .get(polls.options)

    router.route('/polls/:poll_id/options/:option_id')
        .get(polls.options.get)
        .put(polls.options.put)
        .del(polls.options.delete)

    // Poll->Comments routes
    // ------------------------------------------------
    router.route('/polls/:poll_id/comments')
        .post(polls.comments.post)
        .get(polls.comments)

    router.route('/polls/:poll_id/comments/:comment_id')
        .get(polls.comments.get)
        .put(polls.comments.put)
        .del(polls.comments.delete)



    app.use('/api', router);


    var polls = require('../app/controllers/polls');
    app.post('/polls', polls.create);
    app.get('/polls/:id', polls.get);
    app.param('id', polls.poll);

    var comments = require('../app/controllers/comments');
    app.post('/polls/:id/comments', comments.create);
    app.get('/polls/:id/comments', comments.create);
    app.del('/polls/:id/comments', comments.destroy);



    // // Set opinionated defaults if the config has none for itself
    // var defaultController = config.defaultController || 'index';
    // var defaultMethod = config.defaultControllerMethod || 'render';

    // // Setup basic routes for requests that should be directed
    // // to a particular controller & method.
    // app.all('/', routeToController);
    // app.all('/:page', routeToController);
    // app.all('/:page/:method', routeToController);

    // // catch-all to include any extra data that a controller
    // // might be expecting.
    // //
    // // req.params[0] starts at the first of the wild-cart params
    // app.all('/:page/:method/*', routeToController);

    // function routeToController(req, res, next) {
    //     var page = req.params.page || defaultController || '',
    //         method = req.params.method || '';

    //     try {
    //         var controller = require('../app/controllers/' + page);
    //     } catch(e) {
    //         console.log('Bad request: ' + page);
    //         return next();
    //     }

    //     // Check for valid controller and method
    //     if (controller) {

    //         // Run the given method, if there is one
    //         if (method)
    //         {

    //             if (controller[method]) {
    //                 controller[method](req, res);
    //             } else {
    //                 console.log('Bad request: ' + page + '/' + method);
    //                 next();
    //             }

    //         // if not try to run the default instead
    //         } else {

    //             if (controller[defaultMethod]) {
    //                 controller[defaultMethod](req, res);
    //             } else {
    //                 console.log(
    //                     'Bad request: ' + page 
    //                     + ' doesn\' implement default method `' + defaultMethod 
    //                     + '`'
    //                 );
    //                 next(); // there is no  method, :(
    //             }

    //         }

    //     } else {
    //         // it was all a lie
    //         console.log('Bad request: ' + page);
    //         next();
    //     }
    // }
};
