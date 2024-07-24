import { Router } from 'express'
import {  DataSlider } from '../Schemas/TextData.js'
const router = Router()
const getSlider = async (req, res) => {
    try {
        var dataDetail = await DataSlider.findOne().select({_id:0,__v:0});
        res.send(dataDetail.images)
        
    } catch (error) {
        res.send(error)
    }
}

router.get("/slider", getSlider);

export { router as getSlider }