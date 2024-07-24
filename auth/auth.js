import express from 'express'
import { Router as ExpressRouter} from 'express'
import { User } from '../Schemas/User.js'
import bcrypt  from 'bcryptjs';

const router=ExpressRouter();

const signup=async (req,res)=>{
    var creds =req.body;
    if(creds!={}&&creds.email!=""&&creds.password!=""&&creds.name!=""){
        var currUser= await User.findOne({email:creds.email})
        if(!currUser){
            try {
                var salt= await bcrypt.genSalt(10);
                var password= await bcrypt.hash(creds.password,salt);
                var usernew=await User.create({name:creds.name,email:creds.email,password:password});
                res.json({
                    msg:"success"
                })
            } catch (error) {
                res.send(error)
            }
        }else{
            res.json({msg:"User Exists!!"});
        }
    }
    else{
        res.json({msg:"No data !!"})
    }
}
const login= async(req,res)=>{
    const creds =req.body;
    if(creds!={}&&creds.email!=""&&creds.password!=""){
        const userEmail= await User.findOne({email:creds.email})
        if(userEmail){
            try {
                var matched= await bcrypt.compare(creds.password,userEmail.password);
                
                if(matched){
                res.json({success:true,msg:`Welcome ${userEmail.name}`,token:await userEmail.genToken()});
                }
                else{
                    res.json({success:false,msg:"wrong password"})
                }
            } catch (error) {
                console.log(error)
                res.json({success:false,msg:error})
            }
        }else{
            res.status(404).json({success:false,msg:"User does not Exists!!"});
        }
    }
    else{
        res.status(500).json({success:false,msg:"No data"})
    }
}



router.post("/qwertyuioplkjhgfdsazxcvbnm",signup)
router.post("/login",login)
export {router as auth};