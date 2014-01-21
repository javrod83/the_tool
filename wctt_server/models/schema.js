var mongoose = require( 'mongoose' );

var uri = 'mongodb://localhost/errors';
mongoose.connect(uri, function(err) {
    if (err) throw err;
    console.log('MongoDB connected to: ' + uri);
});

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Schema Room -> User -> Message
var Jshook = new Schema();
var Resthook = new Schema();

Jshook.add({
    id        		: ObjectId,
    uid	  		    : { type: String, required: true },
    storage_date	: { type: Date, default: Date.now },
    error_message	: { type: String, required: true },
    file	        : { type: String, required: true },
    file_path       : { type: String, required: true },
    url	            : { type: String, required: true },
    line_number	    : { type: String, required: true },
    user_agent	    : { type: String, required: true },
    the_event       : { type: String}
});

Resthook.add({
    id        		: ObjectId,
    storage_date	: { type: Date, default: Date.now },
    request  	    : { type: Object },
    response	    : { type: Object }
});


// Exports types

Jshook	    : 	mongoose.model('Jshook', Jshook);
Resthook	: 	mongoose.model('Resthook', Resthook);



