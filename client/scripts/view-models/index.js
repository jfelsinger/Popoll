'use strict';
/* jslint browser: true */

var config = require('./main');

var Vue = require('vue'),
    request = require('superagent');

// Create simple view model
window.vue = new Vue({
    el: '.js-poll-form',

    data: {
        question: '',
    },

    computed: {
        isValid: function() {
            var valid = this.question.length > 12 && // is at least 12 letters
                this.question.split(' ').length > 2; // and two words

            return valid;
        }
    },

    methods: {
        submit: function(e) {
            console.log('Submit!');
            e.preventDefault();

            if (this.isValid) {
                request.post(config.url + 'polls', this.$data, function(err, res) {
                    if (err) return console.log(err);

                    if (res.ok)
                        window.location = '/poll.html?id=' + res.body.poll._id;
                });
            }

            return false;
        },
    }
});
