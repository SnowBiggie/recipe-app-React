const express = require("express");
const { httpRegister, httpLogin } = require('./auth.controller');

const authRouter = express.Router();


// Register
authRouter.post("/register", httpRegister);

// Login
authRouter.post("/login", httpLogin);

module.exports = authRouter;