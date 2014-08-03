var async = require('async'),
    express = require('express'),
    config = require('../config');

module.exports = function(app, passport) {
    var router = express.Router();

    router.use('/register', passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    router.use('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    router.use('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.use('/google', passport.authenticate('google'));
    router.use('/google/callback', passport.authenticate('twitter', { 
        successRedirect: '/',
        failureRedirect: '/user/login'
    }))
                                            

    router.use('/twitter', passport.authenticate('twitter'));
    router.use('/twitter/callback', passport.authenticate('twitter', { 
        successRedirect: '/',
        failureRedirect: '/user/login'
    }))

    router.use('/facebook', passport.authenticate('facebook'));
    router.use('/facebook/callback', passport.authenticate('twitter', { 
        successRedirect: '/',
        failureRedirect: '/user/login'
    }))

    router.use('/github', passport.authenticate('github'));
    router.use('/github/callback', passport.authenticate('twitter', { 
        successRedirect: '/',
        failureRedirect: '/user/login'
    }))

    app.use('/auth', router);
};
