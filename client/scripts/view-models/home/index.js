var Vue = require('vue');

module.exports = function() {
    'use strict';

    var url = 'http://localhost:3000';

    // Create simple view model
    window.vue = new Vue({
        el: '.js-poll-form',

        data: {
            question: '',
        },

        computed: {
            isValid: function() {
                var valid = this.question.length > 8 &&  // is at least 8 letters
                    this.question.split(" ").length > 2  // and two words

                return valid;
            }
        },

        methods: {
            submit: function() {
                console.log('Submit!');
                console.log(this);

                return false;
            },

            // fetchData: function() {
            //     var xhr = new XMLHttpRequest(),
            //         self = this;
            //     xhr.open('GET', url);
            //     xhr.onload = function() {
            //         self.users = JSON.parse(xhr.responseText);
            //     };
            //     xhr.send();
            // }
        }
    });

}
