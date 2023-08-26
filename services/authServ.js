const jwt= require('jsonwebtoken');


let authService=(req,res,next)=>{
    try {
        let authToken=req.headers.authorization;

        if(!authToken || !authToken.startsWith("Bearer")){
            return res.status(500).json({error:true,message:"token  required"})
        }

        let token=authToken.split(" ")[1];
        let decodedData=jwt.verify(token,"hanum123")

        let {email,name}=decodedData;

        req.user={email,name}

        next()

    } catch (err) {
        next(err)
    }
}

module.exports={
    authService
}