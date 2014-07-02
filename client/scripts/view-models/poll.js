'use strict';
/* jslint browser: true */

require('./main');

var Vue = require('vue'),
    config = require('./config'),
    lib = require('./config'),
    pollApi = require('./models/poll'),
    marked = require('marked'),
    dateformat = require('dateformat');

// Create a view-model for handling the poil
window.vue = new Vue({
    el: '.js-poll',

    data: {
        poll: {},
        newCommentBody: '',
        newChoice: ''
    },

    created: function() {
        this.fetchData();
    },

    computed: {
        voteCount: function() {
            if (!(this.choices && this.choices.reduce)) return 0;

            // Add up all the votes for each choice
            return this.choices.reduce(function(prev, current) {
                if (!(current && current.votes)) 
                    return prev;

                return prev + current.votes.length;
            }, 0);
        },

        tinyUrl: function tinyUrl() {
            return lib.minifyUrl(config.apiUrl + 'poll/' + this._id);
        },
    },

    methods: {
        fetchData: function fetchData() {
            var poll_id = lib.getQueryValue('id');
            var self = this;

            pollApi.get(poll_id, function(err, res) {
                self.poll = res.body;
            });
        },

        // Choice methods

        choiceSubmit: function(e) {
            e.preventDefault();

            var self = this;

            if (this.newChoice) {
                var choice = { name: this.newChoice }

                pollApi.choices.post(this.poll._id, choice, function(err, res) {
                    self.choices.push(choice);
                    self.newChoice = '';
                });
            }
        },

        choiceDelete: function(choice, e) {
            var self = this;
            var poll_id = this.poll._id;

            e.preventDefault();

            pollApi.choices.del(poll_id, choice._id, function(err,res) {
                console.log(res);
                self.choices.$remove(choice.$data);
            });
        },

        vote: function(choice, e) {
            var self = this;

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
                    self.newCommentBody = '';
                    self.comments.push(comment);
                });
            }
        },

        commentDelete: function(comment, e) {
            var self = this;

            e.preventDefault();

            pollApi.comments.del(this.poll._id, comment._id, function(err, res) {
                console.log(res);
                self.comments.$remove(comment.$data);
            });
        },
    },

    filters: {
        marked: marked,
        dateformat: dateformat
    }
});
