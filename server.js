var express = require('express');
var app = express();

function formatDate(date) {
    
    var d = {
        
        unix: Date.parse(date),
        natural: date.toLocaleString("en-GB", { day:"numeric", month: "long", year:"numeric" }) 
        
    }
    console.log(d);
    return d;

}

function assertDate(date_parameter) {
    
    //if the request parameter is a full number, i'm having it considered as a unix parameter as far as the date is concerned
    if (/^\d+$/.test(date_parameter)) {
        
        console.log("string is digits only, converting string to number and instantiating Date object");
        return new Date(Number(date_parameter));
        
    } else {
        
        console.log("Date parameter is not a number, instantiating Date object and having it decide wether it's valid or not")
        console.log(typeof(date_parameter));
        return new Date(date_parameter);
        
    }
    
}

app.all("*", function(req, res, next) {
  res.writeHead(200, { "Content-Type": "text/plain" }); // work this out
  next();
});

app.get('/:date', function(req, res) {
    
    // acquire the parameters given in the url 
    var date = assertDate(req.params.date);
    
    if(date.toString() === 'Invalid Date') 
    res.end('Invalid date requested -- check date parameters', req.params.date);

    var dateObj = formatDate(date);

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
    