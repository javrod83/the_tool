// Controller addMessage
var logger = require('logger-despegar/logger-despegar');
var mongoose = require('mongoose');
var Jshook = mongoose.model('Jshook', Jshook);


exports.storeJsError = function(req, res, next) {

    res.contentType('application/json');

    Jshook({
         uid : req.body.uid,
         error_message : req.body.error_message,
         file : req.body.file,
         file_path : req.body.file_path,
         url : req.body.url,
         line_number : req.body.line_number,
         user_agent : req.body.user_agent,
         the_event : req.body.the_event
    }).save(function(err, jserror) {
            if (err) return next(err);
            logger.info([
                "-----------------------",
                '----> Guardar Error js: ' + JSON.stringify(jserror),
                "-----------------------"]);
            res.send(JSON.stringify({
                status: 'OK'
            }));
        })

}


exports.removeJsError = function(req, res, next) {

    var id = req.params.id;

    res.contentType('application/json');

    Jshook.
        find({
            _id: id
        }).exec(function(err, jserrors) {
            if (err) return next(err);
            jserrors.forEach( function (jserror) {
                jserror.remove();
            });
            logger.info([
                "-----------------------",
                '----> eliminar jserror: ' + JSON.stringify(jserrors),
                "-----------------------"]);
            res.send(JSON.stringify({
                status: 'OK'
            }));
        });
}

exports.removeAllJsError = function(req, res, next) {

    var uid = req.params.uid;

    res.contentType('application/json');

    Jshook.
        find({
            uid: uid
        }).exec(function(err, jserrors) {
            if (err) return next(err);
            jserrors.forEach( function (jserror) {
                jserror.remove();
            });
            logger.info([
                "-----------------------",
                '----> eliminar jserror: ' + JSON.stringify(jserrors),
                "-----------------------"]);
            res.send(JSON.stringify({
                status: 'OK'
            }));
        });
}


exports.getAllJsErrors = function(req, res, next) {

    var uid = req.params.uid;

    res.contentType('application/json');

    Jshook.
        find({
            uid: uid
        }).exec(function(err, jserrors) {
            res.send(JSON.stringify(jserrors));
        });
}


exports.getJsErrorsInFile = function(req, res, next) {

    var file = req.params.file;

    res.contentType('application/json');

    Jshook.
        find({
            file: file
        }).exec(function(err, jserrors) {
            res.send(JSON.stringify(jserrors));
        });
}
