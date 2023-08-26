const Employee = require('../models/employee.model');
const jwt= require('jsonwebtoken');
const Joi = require('joi');
const { firstMail } = require('../services/mailHelper');

let employeeSchema=Joi.object({
    name:Joi.string().min(4).required().messages({
        "string.base":"name must be string",
        "string.min":"name at least contain 4 character",
        "string.empty":"name is mandatory"
    }),
    age:Joi.number().integer().min(18).required().messages({
        "number.base":"age must be number",
        "number.min":"age is less than 18",
        "number.empty":"age is mandatory"
    }),
    email:Joi.string().email().required().messages({
        "string.base":"email must be string",
        "string.empty":"email is required"
    }),
    password:Joi.string().required().messages({
        "string.base":"password must be string",
        "string.empty":"password is mandatory"
    })
})





let addEmployee=async (req,res,next)=>{
    try {
        
    let {name,age,email,password,otp}=req.body;

    let {value,error}=employeeSchema.validate({name,age,email,password})    


        console.log(error)
    // let isAvailable=await Employee.findOne({email})
    
    if(error){
    return res.status(202).json({error:true,message:"employee already exist",data:error})
    }

    let createEmployee=await Employee.create(value)

    firstMail(name,email)


    return res.status(201).json({error:false,message:"employee created successfully",data:{name:createEmployee.name,age:createEmployee.age,email:createEmployee.email}})

    } catch (err) {
        next(err)
    }
}


let loginEmployee=async(req,res,next)=>{
    try {
        let {email,password}=req.body;

        let isAvailable=await Employee.findOne({email})
        if(!isAvailable){
            return res.status(500).json({error:true,messages:"no employee found with given id"});
        }

        let hashedPassword=await isAvailable.compareMyPassword(password);

        if(hashedPassword){
            let token=jwt.sign({email:isAvailable.email,name:isAvailable.name},"hanum123",{expiresIn:"45s"})
            console.log(token)
            return res.status(200).json({error:false,messages:"token generated successfully",data:token})
        }else{
            return res.status(500).json({error:true,messages:"invalid password"});
        }

    } catch (err) {
        next(err);
    }
}


let getEmployee=async (req,res,next)=>{
    try {
        
        let isAvailable=await Employee.find();

        return res.status(200).json({user:req.user.name,error:false,message:"employee fetched successfully",data:isAvailable})

    } catch (err) {
        next(err)
    }
}


let getSingleEmployee=async(req,res,next)=>{
    try {
        let {id}=req.params;

        let isAvailable=await Employee.findOne({email:id})

        if(!isAvailable){
            return res.status(500).json({error:true,message:"employee not found with given id"})
        }

        return res.status(200).json({error:true,message:"student fetched successfully",data:isAvailable})

    } catch (err) {
        next(err)
    }
}



let updateEmployee=async(req,res,next)=>{
    try {
        let {name,age,email,password}=req.body;
        let {id}=req.params;
        let isAvailable=await Employee.findOne({email:id})
        
        if(!isAvailable){
            return res.status(500).json({error:true,message:"employee not found with given id"})
        }

        let updateemployee=await Employee.findOneAndUpdate({email:id},{name,age,email,password},{new:true})

        return res.status(200).json({error:false,message:"updated successfully",data:updateemployee})

    } catch (error) {
        
    }
}

let deleteEmployee=async(req,res,next)=>{

    try {
        let {id}=req.params;

        let isAvailable=await Employee.findOne({email:id})

        if(!isAvailable){
            return res.status(500).json({error:true,message:"employee not found with given id"})
        }

        let deleteemployee=await Employee.findOneAndDelete({email:id});

        return res.status(200).json({error:false,message:"deleted successfully",data:deleteemployee})

    } catch (err) {
        next(err)
    }
}



module.exports={
    addEmployee,
    getEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
    loginEmployee
}