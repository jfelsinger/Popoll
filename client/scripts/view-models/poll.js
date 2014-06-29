'use strict';
/* jslint browser: true */

var config = require('./main');

var Vue = require('vue'),
    marked = require('marked'),
    dateformat = require('dateformat'),
    request = require('superagent');

// Create a view-model for handling the poil
window.vue = new Vue({
    el: '.js-poll',

    data: {
    },

    created: function() {
        this.fetchData();
    },

    methods: {
        fetchData: function() {
            var pollId = config.helpers.getQueryVariable('id');
            var self = this;

            if (pollId) {
                request.get(config.url + 'poll/' + pollId, function(err, res) {
                    if (err) return console.log(err);
                    
                    if (res.ok) {
                        self.$data = res.body;
                        self.$data.newCommentBody = '';
                        self.$data.newChoice = '';
                    }
                });
            }
        },

        choiceSubmit: function(e) {
            e.preventDefault();

            var self = this;

            if (this.newChoice) {
                var choice = { name: this.newChoice }

                request.post(config.url + 'poll/' + this.$data._id + '/choices', choice, function(err, res) {
                    if (err) return console.log(err);

                    if (res.ok) {
                        self.choices.push(choice);
                        self.newChoice = '';
                    }
                });
            }

            return false;
        },

        commentSubmit: function(e) {
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
                
                this.comments.push(comment);

                request.post(config.url + 'poll/' + this.$data._id + '/comments', comment, function(err, res) {
                    if (err) return console.log(err);

                    if (res.ok)
                        console.log(res);
                });

            }

            return false;
        }
    },

    filters: {
        marked: marked,
        dateformat: dateformat
    }
});
