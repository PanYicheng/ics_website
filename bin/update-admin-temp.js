const mongoose=require("mongoose");
var config = require('../config.json');
const User=require('../models/user.js')

mongoose.set('bufferCommands', false);
mongoose.set('useCreateIndex', true)
mongoose.connection.on('connecting', () => { console.log('mongoose connecting!') } )
mongoose.connection.on('open', function(){console.log('mongoose connected!')})
mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connect("mongodb://localhost/ics", { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
        var newAdmin = config.admin || [];
        var q = User.find({}, function(err, docs) {
            if(err) {
                console.log(err);
                return;
            }
            for(doc of docs){
                console.log(doc.name);
                console.log(doc.password);
            }
        })
    },
    err => {console.log(err);}
)

