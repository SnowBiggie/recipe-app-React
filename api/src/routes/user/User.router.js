const express = require("express");
const { httpDeleteUser, httpGetUser, httpUpdateUser } = require("./User.controller");
const { verify } = require("../auth/auth.controller");
const userRouter = express.Router();

userRouter.get("/:id", verify, httpGetUser);

userRouter.get("/delete/:id", verify, httpDeleteUser);

userRouter.patch("/update/:id", verify,  httpUpdateUser);



module.exports = userRouter;