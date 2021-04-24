const File = require("../models/file.js")
var db = require('../db.js');

File.find().execAsync()
.then(files => files.forEach(function callback(file){
    var path = file.path
    if(path.includes("/home/ics/桌面/ics.pku.edu.cn/")){
        var newpath = path.replace("/home/ics/桌面/ics.pku.edu.cn/", "/home/ics/ics-website/")
        file.path = newpath
        file.save().then(saveDoc => console.log("Succeed in modifying", file.originalname))
        .catch(err => console.log("Error in modifying", file.originalname))
    }
    else if(path.includes("/home/ics/ics-website-dev/")){
        File.findOneAndRemove({path: path}, function(err) {
            if(err){
                console.log(err)
                return
            }
            console.log("Succeed in deleting", file.originalname)
        })
    }
}))
.catch(err => console.log(err))