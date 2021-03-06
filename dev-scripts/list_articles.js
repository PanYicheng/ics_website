const mongoose=require("mongoose");
const Article=require('../models/article.js')

mongoose.set('bufferCommands', false);
mongoose.set('useCreateIndex', true)
mongoose.connection.on('connecting', () => { console.log('mongoose connecting!') } )
mongoose.connection.on('open', function(){console.log('mongoose connected!')})
mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connect("mongodb://localhost/ics", { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
        var q = Article.find({}, function(err, docs) {
            if(err) {
                console.log(err);
                return;
            }
            // console.log(docs)
            for (let doc of docs) {
                // console.log(doc);
                // console.log(doc.title, doc.createdTime, doc.type);
                if(doc.title === "测试表格2"){
                    console.log(doc.content);
                    break;
                }
                // break;
            }
        })
    },
    err => {console.log(err);}
)

