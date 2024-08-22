//tracks the number of api calls
let apiCalls = 0;

/**
 * Tracks the number of api calls on this server
 * 
 * @param {import("express").Request} req middleware request
 * @param {import("express").Response} res middle response
 * @param {import("express").NextFunction} next middleware next()
 */
function calls(req,res,next){
     apiCalls+=1;
     next();
}

/**
 * 
 * @returns the number of api calls tracked
 */
function getCalls(){
     return apiCalls;
}

module.exports = {
     calls,
     getCalls
}