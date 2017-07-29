var express = require('express');
var route= express.Router();
var mongojs = require('mongojs');
var Sequence = exports.Sequence || require('sequence').Sequence
    , sequence = Sequence.create()
    , err
    ;
var db = mongojs('mongodb://apoorva:apoorva@ds145302.mlab.com:45302/crudoperations', ['profile']);

var FormData = require('form-data');
var fs = require('fs');


//Using Multer for Storing Images
var multer = require('multer'); 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
       let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + '-' + file.originalname );
  }
})

var upload = multer({ storage: storage }).single('picture');


//Getting Data From mongodb
route.get('/create', function(req, res){

    db.collection('profile').find(function(error, data){

        if(error){
            res.send(error);
        }
        else
        {
                res.set('Content-Type', 'application/json');
                res.send(data);
            }

    });
    
});

var path ;

var profile;

//Saving data to database


route.post('/saveProfile', function(req, res){
console.log("I am in Profile Function");

    profile = {
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        University: req.body.University,
        Photo: ""
   };
    
   res.send("Saved To DB");
   

});


route.post('/upload', function(req, res){

    upload(req, res, function(err){

        if(err){
            return res.send(err);
        }
        else{
             this.path = req.file.path;
             profile.Photo = this.path;
             
             db.collection('profile').save(profile, function(err, data){

                if (err)
                    console.log(err);
                else    
                    console.log(data);

             });

             return res.send(this.path);     
             
        }

    });
})




module.exports = route;