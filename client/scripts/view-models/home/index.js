var Vue = require('vue');

module.exports = function() {
    'use strict';

    var url = 'http://localhost:3000/api/';

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
            submit: function(e) {
                console.log('Submit!');
                e.preventDefault();

                if (this.isValid) {
                    var request = new XMLHttpRequest(),
                        self = this;

                    $.ajax({
                        type: 'post',
                        url: url + 'polls',
                        data: {
                            question: this.question
                        }
                    })
                    .done(function(data) {
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log(data);
                    });
                }

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
