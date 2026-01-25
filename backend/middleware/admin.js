import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

const JWT_SECRET = "JWT_SECRET_HAI_YE"

export async function adminMiddleware(req, res, next) {
    const adminHead = req.headers.authorization;
    if (!adminHead) {
        return res.status(401).json({
            success: false,
            message: "not authorized user"
        })
    }
    const token = adminHead.split(' ')[1];
    try {
       
        const paylod = jwt.verify(token, JWT_SECRET)
       
        const user = await User.findById(paylod.id).select('-password');
        
        const role=paylod.role
        if(role!=='admin'){
            return res.status(401).json({
                success:false,
                message:"You are not admin"
            })
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'user not found'
            })
        }
        req.user = user;
        next();
    } catch (err) {
        console.log('jwt verification failed', err)
        return res.status(404).json({
            success: false,
            message: 'Token invalid or expired'
        })
    }
}