const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DEV_PORT).then(()=>{
    console.log("mognodb connected successfully")
}).catch((err)=>{
    console.log(err)
})