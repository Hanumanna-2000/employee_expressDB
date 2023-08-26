const express = require('express');
const { addEmployee, getEmployee, getSingleEmployee, updateEmployee, deleteEmployee, loginEmployee } = require('../controllers/employye.controller');
const { authService } = require('../services/authServ');

let router=express.Router();


router.post("/addemployee",addEmployee);
router.get("/getemployee",authService,getEmployee);
router.get("/getsingleemployee/:id",getSingleEmployee)
router.put("/updateemployee/:id",updateEmployee)
router.delete("/deleteemployee/:id",deleteEmployee)
router.get("/loginemployee",loginEmployee)


module.exports=router