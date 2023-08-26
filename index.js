const express = require('express');

require('dotenv').config();

const employeeRoutes = require('./routes/employee.route');

require('./adapters/employeeDB');

let app=express()

app.use(express.json());

app.use("/api/employee",employeeRoutes)


app.use("*",(req,res,next)=>{
    res.status(404).json({error:true,message:"page not found"})
})


app.use((err,req,res,next)=>{
    return res.status(404).json({error:true,message:err.message,dta:"Ok"})
})
app.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT ${process.env.PORT}`)
})