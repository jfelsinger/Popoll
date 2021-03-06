'use strict';
/* jslint browser: true */

var Vue = require('vue'),
    pollApi = require('../models/poll');

// Create simple view model
module.exports = new Vue({
    el: '.js-poll-list',

    data: {
        recentPolls: []
    },

    created: function() {
        this.fetchData();
    },

    methods: {
        fetchData: function fetchData() {
            var self = this;

            pollApi.getAll(function(err, res) {
                self.polls = res.body;

                self.polls.forEach(function(poll) {
                    poll.open = false;
                    poll.voteCount = poll.choices.reduce(function(prev, current) {
                        if (!(current && current.votes))
                            return prev;

                        return prev + current.votes.length;
                    }, 0);
                });
            });
        },

        toggle: function(poll, e) {
            poll.open = !poll.open;
        },
    }
});

