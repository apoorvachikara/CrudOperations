var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');

var bodyParser = require('body-Parser');
var route= express.Router();
var path = require('path');

var create = require('./routes/create');

var DIR = 

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


// Allowing CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/create', create);



app.use(express.static(__dirname + '/upload'));

app.listen(3000, function(request, response){

    console.log("Server is up and listening on port 3000");
    

});