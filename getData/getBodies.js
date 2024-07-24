import { Router } from 'express'
import {  DataGenBodies,DataExeBodies } from '../Schemas/TextData.js'
const router = Router()
const getGenBodies = async (req, res) => {
    try {
        var dataDetail = await DataGenBodies.find();
        res.send(dataDetail)
    } catch (error) {
        res.send(error)
    }
}
const getExeBodies = async(req, res) => {
    try {
        var dataDetail = await DataExeBodies.find();
        res.send(dataDetail)
    } catch (error) {
        res.send(error)
    }
}

router.get("/body",  getGenBodies);
router.get("/body/exe", getExeBodies);

export { router as getBodies }