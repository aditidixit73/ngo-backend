import { Router } from 'express'
import {  DataActivity,DataFeatActivity } from '../Schemas/TextData.js'
const router = Router()
const getActivity = async (req, res) => {
    try {
        var dataDetail = await DataActivity.find({}).select({_id:0,__v:0});
        res.send(dataDetail)
        
    } catch (error) {
        res.send(error)
    }
}
const getFeatActivity = async (req, res) => {
    try {
        var dataDetail = await DataFeatActivity.find({}).select({_id:0,__v:0});
        res.send(dataDetail)
        
    } catch (error) {
        res.send(error)
    }
}

router.get("/activity", getActivity);
router.get("/activity/feat", getFeatActivity);

export { router as getActivity }