/*
 * poll.js
 *
 * Functions for making api calls for poll objects
 */

'use strict';
/* jslint browser: true */

var config = require('./config'),
    lib = require('./lib'),
    request = require('superagent');

// Poll specific methods
exports = {
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

    get: function get(poll_id, cb) {
        request
            .get(config.apiUrl + 'poll/' + poll_id)
            .end(lib.respond(cb));
    },

    put: function put(poll_id, data, cb) {
        request
            .put(config.apiUrl + 'poll/' + poll_id)
            .send(data);
            .end(lib.respond(cb));
    },

    del: function del(poll_id, cb) {
        request
            .del(config.apiUrl + 'poll/' + poll_id)
            .end(lib.respond(cb));
    },

};

// Comment specific methods
exports.comments = {
    getAll = function getAllComments(poll_id, cb) {
        request
            .get([
                config.apiUrl + 'poll', poll_id,
                'comments'
            ].join('/'))
            .end(lib.respond(cb));
    },

    post = function postComment(poll_id, data, cb) {
        request
            .post([
                config.apiUrl + 'poll', poll_id,
                'comment'
            ].join('/'))
            .send(data)
            .end(lib.respond(cb));
    },

    get = function getComment(poll_id, comment_id, cb) {
        request
            .get([
                config.apiUrl + 'poll', poll_id,
                'comment', comment_id
            ].join('/'))
            .end(lib.respond(cb));
    },

    put = function putComment(poll_id, comment_id, data, cb) {
        request
            .put([
                config.apiUrl + 'poll', poll_id,
                'comment', comment_id
            ].join('/'))
            .send(data)
            .end(lib.respond(cb));
    },

    del = function delComment(poll_id, comment_id, cb) {
        request
            .del([
                config.apiUrl + 'poll', poll_id,
                'comment', comment_id
            ].join('/'))
            .end(lib.respond(cb));
    },
};

// Choice specific methods
exports.choices = {
    getAll = function getAllChoices(poll_id, cb) {
        request
            .get([
                config.apiUrl + 'poll', poll_id,
                'choices'
            ].join('/'))
            .end(lib.respond(cb));
    },

    post = function postChoice(poll_id, data, cb) {
        request
            .post([
                config.apiUrl + 'poll', poll_id,
                'choice'
            ].join('/'))
            .send(data)
            .end(lib.respond(cb));
    },

    get = function getChoice(poll_id, choice_id, cb) {
        request
            .get([
                config.apiUrl + 'poll', poll_id,
                'choice', choice_id
            ].join('/'))
            .end(lib.respond(cb));
    },

    put = function putChoice(poll_id, choice_id, data, cb) {
        request
            .put([
                config.apiUrl + 'poll', poll_id,
                'choice', choice_id
            ].join('/'))
            .send(data)
            .end(lib.respond(cb));
    },

    del = function delChoice(poll_id, choice_id, cb) {
        request
            .del([
                config.apiUrl + 'poll', poll_id,
                'choice', choice_id
            ].join('/'))
            .end(lib.respond(cb));
    },

    vote = function vote(poll_id, choice_id, cb) {
        request
            .get([
                config.apiUrl + 'poll', poll_id,
                'choice', choice_id,
                'vote'
            ].join('/'))
            .end(lib.respond(cb));
    },
};
