var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
    question: { type: String, default: '', trim: true },
    desc: { type: String, default: '', trim: true },
    user: { type: Schema.ObjectId, ref: 'User' },
    choices: [{
        name: { type: String, default: '' },
        votes: [{ 
            user: { type: Schema.ObjectId, ref: 'User' },
            priority: Number
        }]
    }],
    comments: [{
        body: { type: String, default: '' },
        user: { type: Schema.ObjectId, ref : 'User' },
        createdAt: { type: Date, default: Date.now }
    }],
    public: Boolean,
});

PollSchema
    .path('question')
    .validate(function(value) {
        return value.length > 0;
    }, 'Poll question cannot be blank');

PollSchema.methods = {
    addComment: function(user, comment, cb) {
        this.comments.push({
            body: comment.body,
            user: user._id
        });
        this.save(cb);
    },

    deleteComment: function(commentId, cb) {
        this.comments.id(commentId).remove();
        this.save(cb);

    },

    deleteComment: function(optionId, cb) {
        this.choices.id(optionId).remove();
        this.save(cb);
    },

    vote: function(optionId, user, priority, cb) {
        var choice = this.choices.id(optionId);

        choice.votes.push({
            // user: user._id,
            priority: priority
        });

        this.save(cb);
    }
};

PollSchema.statistics = {
    /*
    load: function(id , cb) {
        this.findById(id)
            .populate('user', 'name email username')
            .populate('comments.user', 'name email username')
            .populate('choices.votes.user', 'name email username')
            .exec(cb);
    },

    userPolls: function(id, cb) {
        this.find({ 'user': ObjectId(id) })
            .populate('user', 'name email username')
            .populate('comments.user', 'name email username')
            .populate('choices.votes.user', 'name email username')
            .exec(cb);
    },

    publicPolls: function(cb) {
        this.find({ 'public': true })
            .populate('user', 'name email username')
            .populate('comments.user', 'name email username')
            .populate('choices.votes.user', 'name email username')
            .exec(cb);
    },
    */
};

mongoose.model('Poll', PollSchema);
