var config = require('./config'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
    authorization = require('./middlewares/authorization');

var LocalStrategy   = require('passport-local').Strategy,
    FacebookStrategy   = require('passport-facebook').Strategy,
    GithubStrategy   = require('passport-github').Strategy,
    GoogleStrategy   = require('passport-google').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .exec(function(err, user) {
                done(err, user);
            });
    });

    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, authorization.localRegister));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, authorization.localLogin));

    passport.use(new TwitterStrategy({
        consumerKey: config.auth.twitter.consumerKey,
        consumerSecret: config.auth.twitter.consumerSecret,
        callbackURL: config.url + '/auth/twitter/callback'
    }, authorization.twitter));

    passport.use(new FacebookStrategy({
        clientID: config.auth.facebook.clientId,
        clientSecret: config.auth.facebook.clientSecret,
        callbackURL: config.url + '/auth/twitter/callback'
    }, authorization.facebook));

    passport.use(new GoogleStrategy({
        returnURL: config.url + '/auth/google/callbak',
        realm: config.url
    }, authorization.google));

    passport.use(new GithubStrategy({
        clientID: config.auth.github.clientId,
        clientSecret: config.auth.github.clientSecret,
        callbackURL: config.url + '/auth/twitter/callback'
    }, authorization.github));
};
