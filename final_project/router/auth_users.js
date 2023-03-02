const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username: "admin", password:"123"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
for (let i = 0; i < users.length; i++) {
    if(users[i]?.username === username){
        return true;
    }
}
return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
for (let i = 0; i < users.length; i++) {
    if(users[i]?.username === username && users[i]?.password === password ){
        return true;
    }
}
return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(200).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  books[req.params.isbn].reviews.push({username: req.user.username, review: req.body.review})
  return res.status(200).json({message: "Review posted succesfully"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
