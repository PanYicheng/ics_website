const mongoose=require("mongoose");
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
        var q = User.find({}, function(err, docs) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(docs)
        })
    },
    err => {console.log(err);}
)

