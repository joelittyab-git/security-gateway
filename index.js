const express = require("express");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const app = express();
const PORT = 8080;

// Middleware to parse JSON
app.use(express.json());

// Routers
app.use("/auth",authRouter);
app.use("/user", userRouter);

app.listen(PORT, ()=>{
     console.log(`Server running on port: ${PORT}...`);
})