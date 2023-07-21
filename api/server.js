const http = require("http");
const app = require("./app");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// connect to the mongo db
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("db connected")
}).catch((err)=> console.log(err))


// start the server
server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
 })