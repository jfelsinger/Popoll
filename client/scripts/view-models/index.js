'use strict';
/* jslint browser: true */

require('./main');

var Vue = require('vue'),
    pollApi = require('./models/poll');

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
            e.preventDefault();

            if (this.isValid) {
                pollApi.post(this.$data, function(err, res) {
                    window.location = '/poll.html?id=' + res.body.poll._id;
                });
            }
        },
    }
});
