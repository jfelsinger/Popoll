/*
 * poll.js
 *
 * Functions for making api calls for poll objects
 */

'use strict';
/* jslint browser: true */

var config = require('../config'),
    lib = require('../lib'),
    request = require('superagent');

// Poll specific methods
module.exports = {
    getAll: function getAll(cb) {
        request
            .get(config.apiUrl + 'polls')
            .end(lib.respond(cb));
    },

    post: function post(data, cb) {
        request
            .post(config.apiUrl + 'poll/')
            .send(data)
            .end(lib.respond(cb));
    },

    get: function get(pollId, cb) {
        request
            .get(config.apiUrl + 'poll/' + pollId)
            .end(lib.respond(cb));
    },

    put: function put(pollId, data, cb) {
        request
            .put(config.apiUrl + 'poll/' + pollId)
            .send(data)
            .end(lib.respond(cb));
    },

    del: function del(pollId, cb) {
        request
            .del(config.apiUrl + 'poll/' + pollId)
            .end(lib.respond(cb));
    },

};

// Comment specific methods
module.exports.comments = {
    getAll: function getAllComments(pollId, cb) {
        request
            .get([
                config.apiUrl + 'poll', pollId,
                'comments'
            ].join('/'))
            .end(lib.respond(cb));
    },

    post: function postComment(pollId, data, cb) {
        request
            .post([
                config.apiUrl + 'poll', pollId,
                'comment'
            ].join('/'))
            .send(data)
            .end(lib.respond(cb));
    },

    get: function getComment(pollId, commentId, cb) {
        request
            .get([
                config.apiUrl + 'poll', pollId,
                'comment', commentId
            ].join('/'))
            .end(lib.respond(cb));
    },

    put: function putComment(pollId, commentId, data, cb) {
        request
            .put([
                config.apiUrl + 'poll', pollId,
                'comment', commentId
            ].join('/'))
            .send(data)
            .end(lib.respond(cb));
    },

    del: function delComment(pollId, commentId, cb) {
        request
            .del([
                config.apiUrl + 'poll', pollId,
                'comment', commentId
            ].join('/'))
            .end(lib.respond(cb));
    },
};

// Choice specific methods
module.exports.choices = {
    getAll: function getAllChoices(pollId, cb) {
        request
            .get([
                config.apiUrl + 'poll', pollId,
                'choices'
            ].join('/'))
            .end(lib.respond(cb));
    },

    post: function postChoice(pollId, data, cb) {
        request
            .post([
                config.apiUrl + 'poll', pollId,
                'choice'
            ].join('/'))
            .send(data)
            .end(lib.respond(cb));
    },

    get: function getChoice(pollId, choiceId, cb) {
        request
            .get([
                config.apiUrl + 'poll', pollId,
                'choice', choiceId
            ].join('/'))
            .end(lib.respond(cb));
    },

    put: function putChoice(pollId, choiceId, data, cb) {
        request
            .put([
                config.apiUrl + 'poll', pollId,
                'choice', choiceId
            ].join('/'))
            .send(data)
            .end(lib.respond(cb));
    },

    del: function delChoice(pollId, choiceId, cb) {
        request
            .del([
                config.apiUrl + 'poll', pollId,
                'choice', choiceId
            ].join('/'))
            .end(lib.respond(cb));
    },

    vote: function vote(pollId, choiceId, cb) {
        request
            .get([
                config.apiUrl + 'poll', pollId,
                'choice', choiceId,
                'vote'
            ].join('/'))
            .end(lib.respond(cb));
    },
};
