const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const authRouter = require("./src/routes/auth/auth.router");
const userRouter = require("./src/routes/user/User.router");

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(morgan("combined"));

// app.use("/v1/users", userRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);

app.get("/", (req, res) => {
   res.send("This is home page!");
});

app.post("/", (req, res) => {
   res.send("This is home page with post request.");
});



module.exports = app;