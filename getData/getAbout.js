import { Router } from 'express'
import { DataAbout } from '../Schemas/TextData.js'
const router = Router()
const getAbout = (req, res) => {
    res.json({
        brieftext: req.data.brieftext,
        longtext: req.data.longtext
    })
}

const authMiddleware = async (req, res, next) => {
    try {
        var dataDetail = await DataAbout.findOne();
        req.data = dataDetail;
        next();
    } catch (error) {
        res.send(error)
    }
}

router.get("/about", authMiddleware, getAbout);

export { router as getAbout }