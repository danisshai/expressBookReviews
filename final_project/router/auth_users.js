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
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
   if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let review = req.query.review;
  if (review) {
      books[req.params.isbn].reviews[req.user.username] = review;
      return res.status(200).json({message: "Review added/updated succesfully"});
  }
  delete books[req.params.isbn].reviews[req.user.username];
  return res.status(200).json({message: "Review deleted succesfully"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
