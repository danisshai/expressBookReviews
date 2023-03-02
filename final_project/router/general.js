const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  username= req.body.username;
  password = req.body.password;
//   console.log(username, password);
//   console.log(req.body)
  if(!(username && password)){
    res.status(400).json({status: "error", message: "missing username or password"})
  }
  let user = users.filter(user => user.username === username)
  if (user.length > 0) {
    return res.status(400).json({status: "error", message: "Username already taken"}) 
  }
  users.push({username, password})
  return res.status(200).json({message: `New username created with username: ${username}`});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // getting the list of books available in the shop
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //We are imaginating that the isbn is the book key
//   books.filter(book => book.isbn)
  return res.status(200).json(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let book = Object.values(books).filter(book => book.author == req.params.author);
  return res.status(200).json(book);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let book = Object.values(books).filter(book => book.title == req.params.title);
  return res.status(200).json(book);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  return res.status(200).json(books[req.params.isbn]?.reviews);
});

module.exports.general = public_users;
