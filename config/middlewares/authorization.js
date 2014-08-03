'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports.localRegister = function(req, email, password, done) {
    User.findOne({ 'email': email }, function(err, user) {
        if (err) return done(err);

        if (user) {
            console.log('BAD!');
            return done(null, false, { message: 'A user with that email already exists.' });
        } else {
            console.log('GOOD!');
            var newUser = new User();

            newUser.username = req.body.username;
            newUser.email = email;
            newUser.password = password;

            newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
            });
        }
    });
};

module.exports.localLogin = function(req, email, password, done) {
    User.findOne({ 'email': email }, function(err, user) {
        if (err) return done(err);

        if (!user || !user.authenticate(password)) {
            console.log('bad auth');
            return done(null, false, { message: 'Wrong email or password.' });
        }
        console.log('good auth');

        return done(null, user);
    });
};

module.exports.twitter = function(token, secret, profile, done) {
    authenticate('twitter', profile, function(newUser) {
        newUser.twitter.token = token;
    }, done);
};

module.exports.facebook = function(accessToken, refreshToken, proile, done) {
    findAuthenticatedUser('facebook', profile, function(newUser) {
        newUser.facebook.token = accessToken;
        newUser.facebook.refreshToken = refreshToken;
    }, done);
};

module.exports.google = function(identifier, profile, done) {
    findAuthenticatedUser('google', profile, function(newUser) {
        newUser.google.token = identifier;
    }, done);
};

module.exports.github = function(accessToken, refreshToken, profile, done) {
    findAuthenticatedUser('github', profile, function(newUser) {
        newUser.github.token = accessToken;
        newUser.github.refreshToken = refreshToken;
    }, done);
};



function findAuthenticatedUser(provider, profile, cb, done) {
    var search = {};
    search[provider + '.id'] = profile.id;

    User.findOne(search, function(err, user) {

        if (err) return done(err);

        if (user) {
        } else {
            var newUser = new User();

            newUser.provider = provider;
            newUser[provider] = profile;

            cb(newUser);

            newUser.save(function(err) {
                if (err) throw err;
                done(null, newUser);
            });
        }
    });
};
