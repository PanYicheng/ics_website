const router = require('express').Router();
const article = require('./article.js');
const upload = require('./upload.js');
const user = require('./user.js');
const job = require('./job.js');
const debug = require('debug')('ics:api:index');

// REST Modules
router.use('/articles', article);
router.use('/upload', upload);
router.use('/users', user);
router.use('/job', job);

// Error Handler
router.use(function(err, req, res, next){
    err.status = err.status || 500;

    debug(err);

    res.status(err.status);
    res.end(err);
});

module.exports = router;
