// config.js
const configurations = {
     authService: {
          type: 'cookie', // options: 'cookie', 'jwt', 'oauth'
          secret: 'your-secret-key', // required for JWT
          cookieName: 'sg_auth_token', // required for cookie-based auth
          tokenExpiry: '1h', // JWT token expiration
     },
     userRoles: {
          admin: ['read', 'write', 'delete'],
          user: ['read', 'write'],
          guest: ['read'],
     },
     userFields: {
          username: { required: true, unique: true },
          email: { required: true, unique: true },
          password: { required: true },
          role: { required: true, default: 'user' },
     },
     encryption: {
          type: 'aes-256-cbc', // options: 'aes-256-cbc', 'rsa', etc.
          key: 'your-encryption-key', // used for symmetric encryption
          iv: 'initialization-vector', // initialization vector for AES
     },
     server:{
          port:8080,
          host:"localhost"
     }
};

module.exports = configurations;