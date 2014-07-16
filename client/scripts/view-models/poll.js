'use strict';
/* jslint browser: true */

require('./main');

var Vue = require('vue'),
    config = require('./config'),
    lib = require('./lib'),
    pollApi = require('./models/poll'),
    marked = require('marked'),
    dateformat = require('dateformat');

// Create a view-model for handling the poil
window.vue = new Vue({
    el: '.js-poll',

    data: {
        poll: {
            _id: lib.getQueryValue('id'),
            choices: [],
            comments: []
        },
        newCommentBody: '',
        newChoice: ''
    },

    created: function() {
        this.fetchData();
    },

    computed: {
        voteCount: function() {
            // Add up all the votes for each choice
            return this.poll.choices.reduce(function(prev, current) {
                if (!(current && current.votes)) 
                    return prev;

                return prev + current.votes.length;
            }, 0);
        },

        tinyUrl: function tinyUrl() {
            var pollId = this.poll._id || lib.getQueryValue('id');
            return lib.minifyUrl(config.apiUrl + 'poll/' + pollId);
        },
    },

    methods: {
        fetchData: function fetchData() {
            var pollId = lib.getQueryValue('id') || lib.parameters[1];
            var self = this;

            console.log(pollId);
            pollApi.get(pollId, function(err, res) {
                self.poll = res.body;
            });
        },

        // Choice methods

        choiceSubmit: function(e) {
            e.preventDefault();

            var self = this;

            if (this.newChoice) {
                var choice = { 
                    name: this.newChoice,
                    votes: []
                };

                pollApi.choices.post(this.poll._id, choice, function(err, res) {
                    console.log(res);
                    choice._id = res.body.id;
                    self.poll.choices.push(choice);
                    self.newChoice = '';
                });
            }
        },

        choiceDelete: function(choice, e) {
            var self = this;
            var pollId = this.poll._id;

            e.preventDefault();
            e.stopPropagation();

            pollApi.choices.del(pollId, choice._id, function(err,res) {
                console.log(res);
                self.poll.choices.$remove(choice.$data);
            });
        },

        vote: function(choice, e) {
            e.preventDefault();

            pollApi.choices.vote(this.poll._id, choice._id, function(err, res) {
                console.log(res);
                choice.votes.push({
                    priority: 1
                });
            });
        },

        // Comment Methods

        commentSubmit: function(e) {
            var self = this;

            e.preventDefault();

            if (this.newCommentBody) {
                var comment = {
                    body: this.newCommentBody,
                    createdAt: Date.now,
                    user: {
                        username: 'anonymous',
                        name: 'anonymous'
                    }
                };
                
                pollApi.comments.post(this.poll._id, comment, function(err, res) {
                    console.log(res);
                    comment._id = res.body.id;
                    self.newCommentBody = '';
                    self.poll.comments.push(comment);
                });
            }
        },

        commentDelete: function(comment, e) {
            var self = this;

            e.preventDefault();
            e.stopPropagation();

            pollApi.comments.del(this.poll._id, comment._id, function(err, res) {
                console.log(res);
                self.poll.comments.$remove(comment.$data);
            });
        },
    },

    filters: {
        marked: marked,
        dateformat: dateformat
    }
});
