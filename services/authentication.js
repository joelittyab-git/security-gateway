const express = require("express");
const crypto = require("crypto");

let issued = []
const KEY = "sg_auth_token";     // the key of the cookie tokens issued by this serveer for authentication
const request = express.request;


/**
 * Issues cookies as per username and dispatches the response with the cookie.
 * Stores the issued cookie for further user validation
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

/**
 * Validates if the user is authenticated with the token issued by this server
 * 
 * @param {express.Request} req to validate
 * @returns {undefined} if the token might not be present in the issued database
 * @returns {null} if the cookie is not present in the request, the user might not be authenticated by this server
 * @returns {String} username of the validated user
 */
function validate(req){
     let token = req.cookies.sg_auth_token;

     //token might not have been issued to this user
     if(token == undefined){
          return null;
     }

     //finds token
     let issuedToken = issued.find((x)=>x.value==token);

     if(issuedToken==undefined){
          return undefined;
     }

     return issuedToken.username;
}

module.exports = {
     issue,
     validate
}