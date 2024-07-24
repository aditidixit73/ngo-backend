import { mongoose,Schema } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    "name":{
        type:"string",
    },
    "email":{
        type:"string",
    },
    "password":{
        type:"string",
    }
})

UserSchema.methods.genToken= async function(){
    return await jwt.sign({
        "userId":this._id.toString(),
        "email": this.email,
        "isAdmin": true
    },
    process.env.KEY,
    {
        expiresIn:"3d"
    }
);
}
const User=mongoose.model('user', UserSchema);

export{User};