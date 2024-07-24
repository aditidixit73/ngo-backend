import { Router } from 'express'
import {  DataGallery } from '../Schemas/TextData.js'
const router = Router()
const getImages = async (req, res) => {
    try {
        var dataDetail = await DataGallery.findOne().select({_id:0,__v:0});
        res.send(dataDetail.images)
        
    } catch (error) {
        res.send(error)
    }
}

router.get("/gallery", getImages);

export { router as getImages }