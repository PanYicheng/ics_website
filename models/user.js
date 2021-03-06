var _ = require('lodash');
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var BPromise = require('bluebird');

var UserSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    createdTime: { type: Date, default: Date.now },
    level: {
        type: Number,
        default: 1
    },
});

UserSchema.statics.random = function(n) {
    return n ? _.times(n, random) : random();
};

// Creates username, salt, hash fields
// see: https://github.com/saintedlama/passport-local-mongoose#options
UserSchema.plugin(passportLocalMongoose);

function random(obj) {
    return {
        name: _.sample(names),
        description: _.sample(descriptions),
        age: _.random(10, 30),
        avatar: '/img/favicon.png'
    };
}

module.exports = mongoose.model('User', UserSchema);
