const express = require("express");
const userObj = require("../services/users");
const authService = require("../services/authentication");
const router = express.Router();

router.get("/", (req,res)=>{
     res.send("This is an endpoint...");
});

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
          res.send("This is an endpoint...");
     })
     //authenitcation endpoint
     .post((req,res)=>{
          //request data extraction
          let body = req.body;
          let username = body.username;
          let password = body.password;

          //authentication using service
          let authStatus = userObj.authUser(username, password);

          //auth successfull
          if(authStatus==true){
               //acquires user object from database
               let userAuth = userObj.getUser(username);

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


module.exports = router;