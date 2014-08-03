var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    authTypes = ['github', 'facebook', 'twitter'];

var UserSchema = new Schema({
    username: String,
    email: String,
    name: String,
    provider: String,
    hashed_password: String,
    salt: String,
    facebook: {},
    google: {},
    twitter: {},
    github: {},
    friends: [{ type: Schema.ObjectId, ref: 'User' }],
    polls: [{ type: Schema.ObjectId, ref: 'Poll' }],
    createdAt : { type: Date, default: Date.now }
});

UserSchema
    .virtual('password')
    .set(function(password) {
        // this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() { return this._password; });

var validatePresenceOf = function(value) {
    return value && value.length;
};

UserSchema.path('username').validate(function(username) {
    if (authTypes.indexOf(this.provider) !== -1) return true;

    return username.length;
}, 'Username cannot be blank');

UserSchema.path('email').validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;

    return email.length;
}, 'Email cannot be blank');

/*
UserSchema.path('name').validate(function(name) {
    if (authTypes.indexOf(this.provider) !== -1) return true;

    return name.length;
}, 'Name cannot be blank');
*/

UserSchema.path('hashed_password').validate(function(hashed_password) {
    if (authTypes.indexOf(this.provider) !== -1) return true;

    return hashed_password.length;
}, 'Password cannot be blank');

UserSchema.pre('save', function(next) {
    if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
        next(new Error('Invalid password'));
    else
        next();
});

UserSchema.methods = {
    friend: function(id) {
        if (this.friends.indexOf(id) === -1) {
            this.friends.push(id);
        }
        else {
            this.friends.splice(this.friends.indexOf(id), 1);
        }
        console.log(this.friends);
    },

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    encryptPassword: function(password) {
        if (!password) return '';
        return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
    }
};

UserSchema.statistics = {
    addFriend: function(id, cb) {
        this.findOne({_id: id})
            .populate('friends')
            .exec(cb);
    }
};

mongoose.model('User', UserSchema);
