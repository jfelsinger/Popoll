var path = require('path'),
    root = path.normalize(__dirname + '/../..');

module.exports = {
    defaultController: 'index',
    defaultControllerMethod: 'render',
    root: root,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL,
    auth: {
        twitter: {
            consumerKey: 'OcbkMZ3B105giieLcKhp9LrOp',
            consumerSecret: 'zmFq20SKUE559FzPqeL7WQejdD0P0TbkGwQ66fI6rHDpxR70in'
        },

        github: {
            clientId: '43bbcffba85b242c4213',
            clientSecret: 'd670029e1504d5943e4ec7b4654d32c3c7f50382'
        },

        google: {
        },

        facebook: {
            clientId: '43bbcffba85b242c4213',
            clientSecret: 'd670029e1504d5943e4ec7b4654d32c3c7f50382'
        },
    }
};
