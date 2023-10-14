const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
dotenv.config({path:'./config.env'});
require('./dbcon')
app.use(express.json());
app.use(cookieParser());
app.use(require("./auth/auth"));

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`)
})