'use strict';
/* jslint browser: true */

var Vue = require('vue'),
    authApi = require('../models/auth');

module.exports = new Vue({
    el: '.js-login',

    data: {
        email: '',
        password: '',
        registration: false,
        username: '',
    },

    methods: {
        toggleRegistration: function(e) {
            e.preventDefault();
            this.registration = !this.registration;
        },
    }
});
