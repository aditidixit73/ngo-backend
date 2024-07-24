import { Router } from 'express'
import { User } from '../Schemas/User.js'
import jwt from "jsonwebtoken"
const router =Router()
const getUser=(req,res)=>{
    res.json({
        name:req.name,
        email:req.email,
        id:req.id
    })
}

const authMiddleware= async (req,res,next)=>{
    var token=req.header("Authorization");
    if(!token){
        return res.status(401).json({msg:"No token available!"})
    }else{
        token=token.replace("Bearer","").trim()
       try {
         var isVerified = await jwt.verify(token,process.env.KEY);
         var userDetail= await User.findOne({email:isVerified.email}).select({password:0});
         req.email=userDetail.email;
         req.name=userDetail.name;
         req.id=userDetail._id;
         next();
       } catch (error) {
        res.send(error)
       }
    }
}

router.get("/user",authMiddleware,getUser);

export {router as getUser}


