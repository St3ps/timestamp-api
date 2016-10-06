var express = require('express');
var app = express();

console.log(process.env.PORT);

app.get('/', function(req, res) {
    
    res.send('Hello World');
    res.end();
});

app.listen(process.env.PORT, function () {
    
    
    console.log('example app listening on port', process.env.PORT + '!');
})