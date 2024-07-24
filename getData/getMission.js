import { Router } from 'express'
import { DataMission } from '../Schemas/TextData.js'
const router = Router()
const getMission = (req, res) => {
    res.json({
        vision: req.data.vision,
        mission: req.data.mission
    })
}

const authMiddleware = async (req, res, next) => {
    try {
        var dataDetail = await DataMission.findOne();
        req.data = dataDetail;
        next();
    } catch (error) {
        res.send(error)
    }
}

router.get("/mission", authMiddleware, getMission);

export { router as getMission }


