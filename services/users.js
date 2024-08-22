
/*
[    
     {userId:..., username:..., password:... }
]
 */
/**
 * User database
 */
const user = [];

/**
 * A method to register user to the database.
 * Returns true if success else false
 * 
 * @param {String} username the username for the user that is being registered to the server
 * @param {String} password the password for the user that is being registered to the server
 * @returns {boolean} if user has been registered to the database returns true for a successfull registration else false
 */
function regsiterUser(username, password){
     let userId = user.length

     //fincding if an entry already exists
     let existingEntry = user.find((us)=>us.username==username);

     if (existingEntry==undefined){
          //adding a user record to the datavase
          user.push({userId:userId, username:username, password:password});
          return true;
     }

     //since username already exists in the entry, unsuccessful registration
     return false;
}

/**
 * Authenticates a registered user on the given credentials
 * 
 * @param {String} username of the user being authenticated
 * @param {String} password of the user being authenticated
 * @returns {boolean} If the user is present in the database, returns true for successfull authentication
 */
function authUser(username, password){
     let userStatus = user.find((us)=>us.username==username&&us.password==password);
     if(userStatus==undefined){
          return false;
     }

     return true;
}

/**
 * 
 * @param {String} username of the user being searched in the database
 * @returns user object
 * {
 *   userId:...,
 *   username:...,
 *   password: ...
 * }
 */
function getUser(username){
     return user.find((us)=>us.username==username);
}

/**
 * Gets the total registered users
 * @returns the total registered users
 */
function getRegistered(){
     return user.length;
}

//x--x--x
module.exports = {
     regsiterUser,
     authUser,
     getUser,
     getRegistered
}