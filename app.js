var express = require('express');
var app = express();


var reqCounter = 0 ; 


app.use('/requestFilter.js',function(req,res,next){

  console.log("req n:"+reqCounter++);
  console.log('called');
  console.log(req.query);
  if (req.query.id !== undefined)
          console.log(req.query.id);

        next();
});

app.use(express.static('./public'));



app.listen(process.env.PORT || 3000);
console.log("static server started");