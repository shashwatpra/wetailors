var express        = require('express');
var app            = express();
var mongoose = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 9000; 

var db = require('./api/db');
//var MongoClient = require('mongodb').MongoClient;
//mongoose.connect(db.url);
//var dbConnect;



//app.use(bodyParser()); 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/app')); 
//app.get('*', function(req, res) {
//  res.sendFile(__dirname + 'app/index.html');
//});
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());

    var api = require('./api/routes')(app, express); // configure our routes
    app.use('/api', api);

    //dbConnect = db;

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});
/*app.listen(port,function(){
	console.log('wow, its working!');
});*/
/*db.connect('mongodb://ec2-user@ec2-52-77-218-70.ap-southeast-1.compute.amazonaws.com:27017/admin', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.' + err)
    process.exit(1)
  } else {
    app.listen(port, function() {
      console.log('Listening on port ' + port)
    })
  }
})*/

db.connect('mongodb://localhost:27017/dbwetailors', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.' + err)
    process.exit(1)
  } else {
    app.listen(port, function() {
      console.log('Listening on port ' + port)
    })
  }
})
exports = module.exports = app;