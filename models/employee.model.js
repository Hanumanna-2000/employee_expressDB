const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

let  employeeSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name mandatory"]
    },
    age:{
        type:Number,
        required:[true,"age mandatory"]
    },
    email:{
        type:String,
        required:[true,"email mandatory"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is mandatory"]
    },
    otp:{
        type:String,
        required:[true,"otp is mandatory"],
        default:"null"
    }
},
{
    timestamps:true
})

employeeSchema.pre("save",async function(next){

    let salt=await bcryptjs.genSalt(10);
    this.password= await bcryptjs.hash(this.password,salt)
})

employeeSchema.methods.compareMyPassword=async function(password){
    let hashedPassword=await bcryptjs.compare(password,this.password);
    return hashedPassword;
}








module.exports=new mongoose.model("employee",employeeSchema)