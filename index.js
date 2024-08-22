const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const adminRouter = require("./routers/admin");
const { calls } = require("./middleware/api");

// const { routeRequest } = require("./middleware/router");


const config  = require("./services/configuration");

const app = express();
const PORT = config.server.port;

// Middleware to parse JSON
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("combined"));
app.use(calls);
// app.use(routeRequest)

// Routers
app.use("/auth",authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, ()=>{
     console.log(`Server running on port: ${PORT}...`);
})