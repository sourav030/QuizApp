import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"

const JWT_SECRET = "JWT_SECRET_HAI_YE";

export async function authMiddleware(req,res,next){
    const authHead=req.headers.authorization;
    if(!authHead){
        return res.status(401).json({
            success:false,
            message:"not authorized user"
        })
    }
    const token=authHead.split(' ')[1];
    
   
    try{
        const paylod=jwt.verify(token,JWT_SECRET)
        const user=await User.findById(paylod.id).select('-password');
        if(!user){
            return res.status(401).json({
                success:false,
                message:'user not found'
            })
        }
        req.user=user;
        next();
    }catch(err){
            console.log('jwt verification failed',err.message)
            return res.status(404).json({
                success:false,
                message:'Token invalid or expired'
            })
    }
}