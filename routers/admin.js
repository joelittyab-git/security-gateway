const express = require("express");
const { getCalls } = require("../middleware/api");
const { getRegistered } = require("../services/users");
const { getIssued } = require("../services/authentication");

const router = express.Router();

/**
 * Admin page ref
 * GET "/admin/"
 *   - Provides the html page for admin login
 *   - Responds with 
 *        >200: HTML page
 * 
 * POST "/admin/"
 *   - Endpoint for form submission data for (@file  public/dashboard.html)
 */
router.route("/")
     .get((req, res)=>{
          res.sendFile("/home/joeittab/projects/net/express-server/public/admin-login.html");
     })
     .post((req,res)=>{
          const { username, password } = req.body; 
          console.log("Username:", username);
          console.log("Password:", password); 
          res.send();
     });

/**
 * Provides admin information about the server in regards to the number of tokens, registered users, etc..
 * GET "/admin/"
 *   - Provides the metrics for the server
 *   - Responds with 
 *        >200: json data about the metrics
*/
router.get("/metrics", (req,res)=>{
     let apiCalls = getCalls();
     let registeredUsers = getRegistered();
     let issuedTokens = getIssued();

     let jsonData = {
          registeredUsers:registeredUsers,
          issuedTokens:issuedTokens,
          totalApiCalls:apiCalls
     };

     res.json(jsonData);

});

router.get("/dashboard", (req,res)=>{
     res.sendFile("/home/joeittab/projects/net/express-server/public/admin-dashboard.html");
});

module.exports = router;