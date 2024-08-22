const express = require("express");
const userService = require("../services/users");
const authService = require("../services/authentication");
const router = express.Router();
const path = require("path");


/**
 * Basic authentication routes
 * POST "/auth/"
 *   - Authenticates the user based on the given username and password passed 
 *     in the json body
 *   - Responds with 
 *        >200: If user is successfully authentcated with user information passed
 *        >401: If user authentication is unsuccessfull    
 */
router.route("/")
     .get((req,res)=>{
          res.send("Ok");
     })
     //authenitcation endpoint
     .post((req,res)=>{
          //request data extraction
          let body = req.body;
          let username = body.username;
          let password = body.password;

          //authentication using service
          let authStatus = userService.authUser(username, password);

          //auth successfull
          if(authStatus==true){
               //acquires user object from database
               let userAuth = userService.getUser(username);

               //issuing auth cookie with the response
               authService.issue(username, res);
               res.status(200).json({
                    status:"success",
                    user:{
                         userId:userAuth.userId,
                         username: userAuth.username,
                    }
               });
               return;
          }

          //auth unsuccessfull
          res.status(401).json({
               status:"unsuccessfull"
          });
     });

/**
 * Validates an authenticated user on a token issued by this server
 * POST "/auth/validate"
 *   - Validates a user based on the token issued by the server
 *   - Responds with 
 *        >200: If user is successfully validated
 *        >401: If user is not authenticated (does not contain the token issued by this server for authentication)
 *        >403: If the user token might have been forged or changed (err)
 */
router.post("/validate", (req,res)=>{

     let username = authService.validate(req);
     if(username==undefined){
          res.status(403).json({
               status:"forbidden",
               info:"The token might have been forged..."
          });
          return;
     }else if (username==null){
          res.status(401).json({
               status:"unauthorized",
               info:"The user is not authenticated"
          });
          return;
     }

     let userAuth = userService.getUser(username);
     res.status(200).json({
          status:"authorized",
          info:"User is authenticated and is authorized"
     });
});

module.exports = router;