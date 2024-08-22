const express = require("express");
const configuration = require("../services/configuration");

const router = express.Router();

router.post("/", (req,res)=>{
     try{
          const port = req.body.server.port;
          const host = req.body.server.host;
     }catch(e){
          console.log("Something went wrong while configuring service")
     }

     configuration.server.port = port;
     configuration.server.host = host;

})