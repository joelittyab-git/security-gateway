const express = require("express");
const crypto = require("crypto");

let issued = []
const KEY = "sg.auth-token";     // the key of the cookie tokens issued by this serveer for authentication
const response = express.response;


/**
 * 
 * @param {String} username for the authentcated user
 * @param {express.Response} res for the current request cycle
 * @returns a cookie attached to the passed request
 */
function issue(username, res){
     //getting a random token
     let val = crypto.randomBytes(12).toString("hex");

     //storing issued token
     issued.push({username:username, value:val});

     return res.cookie(KEY,val,{
          sameSite:"strict",
          secure:true,
          httpOnly:true,
          maxAge: 24 * 60 * 60 * 1000
     });
}

module.exports = {
     issue
}