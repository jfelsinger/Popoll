var async = require('async'),
    express = require('express'),
    config = require('../config');

module.exports = function(app) {
    var defaultController = config.defaultController || 'index';
    var defaultMethod = config.defaultMethod || 'render';
    var router = express.Router();

    router.get('/', routeToController);
    router.get('/:page', routeToController);
    router.get('/:page/:id', routeToController);

    function routeToController(req, res, next) {
        var page = req.params.page || defaultController || '',
            method = req.params.method || '';

        try {
            var controller = require('../../app/controllers/' + page);
        } catch(e) {
            console.log('Bad request: ' + page);
            return next();
        }

        // Check for valid controller and method
        if (controller) {

            // Run the given method, if there is one
            if (false && method) {

                if (controller[method]) {
                    controller[method](req, res);
                } else {
                    console.log('Bad request: ' + page + '/' + method);
                    next();
                }

            // if not try to run the default instead
            } else {

                if (controller[defaultMethod]) {
                    controller[defaultMethod](req, res);
                } else {
                    console.log(
                        'Bad request: ' + page 
                        + ' doesn\' implement default method `' + defaultMethod 
                        + '`');
                    next(); // there is no  method, :(
                }
            }
        } else {
            // it was all a lie
            console.log('Bad request:' + page);
            next();
        }
    }

    // Register routes
    app.use('/', router);
};
