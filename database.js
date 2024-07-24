import mongoose from 'mongoose';
import 'dotenv/config'

export const conectDb=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to database!")
    })
}