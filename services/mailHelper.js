const nodemailer = require('nodemailer');

let transporter= nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"hanumanna2000@gmail.com",
        pass:"fssdwdjjrlhgwnge"
    }
})

let firstMail=async (name,email)=>{

    let mailOptions={
        from:"hanumanna2000@gmail.com",
        to:email,
        subject:"registration mail",
        html:`Hi ${name} ,your registration is successfully`
    }
    transporter.sendMail(mailOptions,()=>{
        console.log(`mail sent successfully to ${name}`)
    })
}

module.exports={
    firstMail
}