
exports.render = function(req, res) {

    var data = {
        vm: 'poll'
    };

    res.render('poll', data);
};
