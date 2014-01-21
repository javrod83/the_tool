var express = require('express');
var ini = require('node-ini');
var logger = require('logger-despegar/logger-despegar');

require('./models/schema.js');

process.title = 'node.manager.store'
process.addListener('uncaughtException',
    function(err, stack) {
        var error = err.stack.split("\n").join(",  ");
        console.log('Caught exception: ' + err + ' => ' + error);
    }
);

var app = express();
app.use(express.bodyParser());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

//controllers routes
var jshook = require('./controllers/jshook');
var resthook = require('./controllers/resthook');

//
//  Express methods
//
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Internal server error!');
});

//jshook methods
app.post('/storeJsError', jshook.storeJsError);
app.get('/getAllJsErrors/:uid', jshook.getAllJsErrors);
app.get('/removeAllJsError/:uid', jshook.removeAllJsError);
app.get('/removeJsError/:id', jshook.removeJsError);
app.get('/getJsErrorsInFile/:file', jshook.getJsErrorsInFile);

//resthook methods
app.post('/storeRestError', resthook.storeRestError);
app.get('/getRestErrorsByStatus/:status', resthook.getRestErrorsByStatus);

app.listen(3010);

