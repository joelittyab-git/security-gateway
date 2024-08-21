const users = require("../services/users");
const express = require("express");
const router = express.Router()

/**
 * Basic registration endpoint. Registers the users and stores in the database
 * POST "/user/register"
 *   - Registers the username and password passed in the body as json data
 *   - Responds with 
 *        >200: If user registration is successful
 */
router.post("/register", (req,res)=>{
     const body = req.body;
     console.log(body);
     let username = body.username
     let password = body.password

     //registering user to database
     let status = users.regsiterUser(username, password);

     if(status==true){
          res.json({"status":"success"});
          return;
     }

     res.json({"status":"unsuccessfull"});
});

module.exports = router;