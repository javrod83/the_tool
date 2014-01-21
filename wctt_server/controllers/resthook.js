// Controller addMessage
var logger = require('logger-despegar/logger-despegar');
var mongoose = require('mongoose');
var Resthook = mongoose.model('Resthook', Resthook);


exports.storeRestError = function(req, res, next) {

    res.contentType('application/json');

    Resthook({
        uid : req.body.uid,
        response : req.body.response,
        request : req.body.request
    }).save(function(err, resterror) {
        if (err) return next(err);
        logger.info([
            "-----------------------",
            '----> Guardar Error Rest: ' + JSON.stringify(resterror),
            "-----------------------"]);
        res.send(JSON.stringify({
            status: 'OK'
        }));
    })

}

exports.getAllRestErrors = function(req, res, next) {

    var uid = req.params.uid;

    res.contentType('application/json');

    Resthook.
        find({
            uid: uid
        }).exec(function(err, resterror) {
            res.send(JSON.stringify(resterror));
        });
}

exports.getRestErrorsByStatus = function(req, res, next) {

    var status = req.params.status;

    res.contentType('application/json');

    Resthook.
        find({
            'response.status' : status
        }).exec(function(err, resterror) {
            res.send(JSON.stringify(resterror));
        });
}