const dbconfig = require('./db.config')
const mongoose = require('mongoose')
mongoose.Promise=global.Promise
const db={}
db.mongoose=mongoose
db.url=dbconfig.url
db.users=require("../models/user.model")(mongoose)
module.exports=db
