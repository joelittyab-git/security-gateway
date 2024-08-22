const config = require("../services/configuration");


/**
 * Basic configuration route. This configures the security gateway {@link ../services/configuration.js}
 * POST "/auth/"
 *   - Authenticates the user based on the given username and password passed 
 *     in the json body
 *   - Responds with 
 *        >200: If user is successfully authentcated with user information passed
 *        >401: If user authentication is unsuccessfull    
 */
function routeRequest(req,res, next){
     if(config.authService.type=="jwt"){
          req.url = req.url + "/jwt"
     }

     next();
}

module.exports = {
     routeRequest
}