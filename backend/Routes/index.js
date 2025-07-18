const router = require("../src/StutentController/Stud_Router");
const Adminrouter = require("../src/AdminController/AdminRouter");
require ('dotenv').config()
const app = require("express").Router();


app.use('/student',router)
app.use('/admin',Adminrouter)



module.exports=app