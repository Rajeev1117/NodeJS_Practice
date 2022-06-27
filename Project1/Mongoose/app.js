var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');
const { functionsIn } = require('lodash');

var port = 8080;
// var db = 'mongodb://localhost/example'
var db = 'mongodb+srv://Username:Password@cluster0.rrevs.mongodb.net/example'

mongoose.connect(db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/',function(req,res){
    res.send('happy to be here');
});

//get all books from mongodb
app.get('/books', function(req, res){
    console.log('getting all books');
    Book.find({})
    .exec(function(err, books){
        if(err){
            res.send('error has occured');
        } else{
            console.log(books);
            res.json(books);
        }
    })
});

//get books by id from the database
app.get('/books/:id', function(req,res){
    console.log('getting one book');
    Book.findOne({
        _id:req.params.id
    })
    .exec(function(err, book){
        if(err){
            res.send('error occured');
        }else{
            console.log(book);
            res.json(book);
        }
    })
});

//add a book in the database
app.post('/book', function(req, res){
    var newBook = new Book();

    newBook.title=req.body.title;
    newBook.author=req.body.author;
    newBook.category=req.body.category;

    newBook.save(function(err, book){
        if(err){
            res.send('errors occured');
        }else{
            console.log(book);
            res.send(book);
        }
    });
})

// //another way to add a book(give some error)
// app.post('/book2', function(req, res) {
//     Book.create(req.body, function(err, book) {
//       if(err) {
//         res.send('error saving book');
//       } else {
//         console.log(book);
//         res.send(book);
//       }
//     });
//   });
  

app.listen(port, function() {
    console.log('app listening on port ' + port);
  });