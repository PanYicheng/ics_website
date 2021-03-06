var mongoose = require('mongoose');
var config = require('../config.json');
var db = mongoose.connection;
var User = require('../models/user');
var _ = require('lodash');
var BPromise = require('bluebird');
var process = require('process');
BPromise.promisifyAll(mongoose);
BPromise.promisifyAll(User);

db.on('error', e => {
    console.log('connect error: ', e);
});
db.once('open', function() {
    console.log('connected');

    var admins = config.admin || [];
    // var userList = [];
    // User.findAsync({})
    //     .then(function(err, users){
    //         if(err){
    //             console.log(err);
    //             return;
    //         }
    //         console.log(users.length);
    //     });
    // for(const user of userList){
    //     console.log(user.name);
    // }
    // var newAdmins = [];
    // for(admin of admins){
    //     User.findOne({name: admin.name}, function(err, user){
    //         if(err){
    //             newAdmins.push(admin);
    //         }
    //     })
    // }
    // User.removeAsync({name: "Unknown"})
    //     .then(x => BPromise.all(newAdmins))
    //     .map(user => User.registerAsync(
    //         new User(_.omit(user, 'password')),
    //         user.password))
    //     .then(function() {
    //         console.log(`${newAdmins.length} users registered`);
    //     })
    //     .catch(function(err) {
    //         console.log(`user register error: ${err}`);
    //     })
    //     .then(function(){
    //         db.close();
    //     });
    
    User.removeAsync({})
        .then(x => BPromise.all(admins))
        .map(user => User.registerAsync(
            new User(_.omit(user, 'password')),
            user.password))
        .then(function() {
            console.log(`${admins.length} users registered`);
        })
        .catch(function(err) {
            console.log(`user register error: ${err}`);
        })
        .then(function(){
            db.close();
        });
});

if (config.mongodb) {
    console.log(`connnecting ${config.mongodb}...`);
    mongoose.connect(config.mongodb);
} else {
    console.log('config:mongodb not set');
}

