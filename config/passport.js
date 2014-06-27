var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GithubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').Strategy,
    User = mongoose.model('User');

module.exports = function(passport, config) {
    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, { message: 'Unknown user' });
            }
            if (!user.authenticate(password)) {
                return done(null, false, { message: 'Invalid password' });
            }

            return done(null, user);
        });
    });

    passport.use(new FacebookStrategy({
    },
    function(accessToken, refreshToken, profile, done) {
    });
};
