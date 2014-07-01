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

    computed: {
        voteCount: function() {
            if (!(this.choices && this.choices.reduce)) return 0;

            var total = this.choices.reduce(function(prev, current) {
                if (!(current && current.votes)) 
                    return prev;

                return prev + current.votes.length;
            }, 0);

            return total;
        },

        tinyUrl: function() {
            var url = config.url + 'poll/' + this._id;
            console.log(url);
            console.log(encodeURIComponent(url));
            request
                .get('http://tiny.cc/')
                .query({
                    c: 'rest_api',
                    m: 'shorten',
                    login: 'jfelsinger',
                    apiKey: 'a7073d35-92cf-4416-ade4-ab78d4647598',
                    version: '2.0.3',
                    longUrl: encodeURIComponent(url)
                })
                .end(function(err, res) {
                    if (err) return console.log(err);
                    
                    if (res.ok) {
                        console.log(res);
                    }
                });

            return url;
        },
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

        choiceDelete: function(choice, e) {
            var self = this;

            e.preventDefault();

            request
                .del(config.url + '/poll/' + this.$data._id + '/choice/' + choice._id)
                .end(function(err, res) {
                    if (err) return console.log(err);

                    if (res.ok) {
                        console.log(res);
                        self.choices.$remove(choice.$data);
                    }
                });

            return false;
        },

        vote: function(choice, e) {
            var self = this;

            e.preventDefault();

            request
                .get(config.url + '/poll/' + this.$data._id + '/choice/' + choice._id + '/vote')
                .end(function(err, res) {
                    if (err) return console.log(err);

                    if (res.ok) {
                        console.log(res);
                        choice.votes.push({
                            priority: 1
                        });
                    }
                });
        },


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
                
                this.comments.push(comment);

                request.post(config.url + 'poll/' + this.$data._id + '/comments', comment, function(err, res) {
                    if (err) return console.log(err);

                    if (res.ok) {
                        console.log(res);
                        self.newCommentBody = '';
                    }
                });

            }

            return false;
        },

        commentDelete: function(comment, e) {
            var self = this;

            e.preventDefault();

            request
                .del(config.url + '/poll/' + this.$data._id + '/comment/' + comment._id)
                .end(function(err, res) {
                    if (err) return console.log(err);

                    if (res.ok) {
                        console.log(res);
                        self.comments.$remove(comment.$data);
                    }
                });

            return false;
        },
    },

    filters: {
        marked: marked,
        dateformat: dateformat
    }
});
