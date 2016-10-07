var express = require('express');
var app = express();
var utils = require('./functions.js');






app.all("*", function(req, res, next) {
  res.writeHead(200, { "Content-Type": "application/json" }); // work this out
  next();
});

app.get('/', function(req,res,next) {
    
    res.end('Hi, go right ahead and insert your date parameters in the URL to obtain your timestamp');
    next();
    
})

app.get('/:date', function(req, res) {
    
    // acquire the parameters given in the url 
    var date = utils.assertDate(req.params.date);
    
    if(date.toString() === 'Invalid Date') 
    res.end('Invalid date requested -- check date parameters', req.params.date);

    var dateObj = utils.formatDate(date);

    res.end(JSON.stringify(dateObj));


});



app.listen(process.env.PORT, function () {
    
    console.log('timestamp app listening on port', process.env.PORT + '!');
})



// Example usage:
// https://timestamp-ms.herokuapp.com/December%2015,%202015
// https://timestamp-ms.herokuapp.com/1450137600
// Example output:
// { "unix": 1450137600, "natural": "December 15, 2015" } 

//work a bit of regex to see if the date is in a proper format
// if('/[A-Za-z]{3,}\s\d{1,2}(st)?(nd)?(rd)?(th)?,\s+\d{4}/')
    