import express, { json } from 'express';
import 'dotenv/config';
import {conectDb} from './database.js'
import {auth} from './auth/auth.js'
import cors from 'cors'
import { addData } from './addData/addText.js';
import { getUser } from './getData/getUser.js';
import { getAbout } from './getData/getAbout.js';
import { getMission } from './getData/getMission.js';
import { getBodies } from './getData/getBodies.js';
import { getSlider } from './getData/getSlider.js';
import { SendEmail } from './sendEmail.js';
import { getImages } from './getData/getImages.js';
import { getActivity } from './getData/getActivity.js';

const app= express();
app.use(json())
app.use(cors())

conectDb();
app.get("/",(req,res)=>{res.send("server ready")});
app.use("/auth",auth)
app.use("/add",addData)
app.use("/getdata",getUser)
app.use("/getdata",getAbout)
app.use("/getdata",getMission)
app.use("/getdata",getBodies)
app.use("/getdata",getSlider)
app.use("/getdata",getActivity)
app.use("/getdata",getImages)
app.use("/email",SendEmail)

app.listen(process.env.PORT,()=>{console.log(`listening on port ${process.env.PORT}`)});