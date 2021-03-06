const _ = require('lodash');
const debug = require('debug')('ics:admin-files');
const File = require('../../models/file.js');

exports.url = '/admin/files';

var a = 1;
exports.get = function(req, done, fail) {
    
    if(!req.user) return fail(401);
    File.find({mimetype : "application/pdf"})
        //.populate('creator')
        .sort('-fileDate')
        // .populate('creator')
        .execAsync()
        .then(files => {
        done({
            fileActive: 'active',
            title: '文件管理',
            files: files,
            req: req
        });
})
    .catch(fail);
};
/*知识：给此处url注册了get方法，意思监听浏览器是否针对该url有get行为，有的话执行function内容，此处只注册了get，如果html出现submit（会自动post）则not found*/






