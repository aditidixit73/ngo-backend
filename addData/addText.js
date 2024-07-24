import { Router as ExpressRouter } from 'express'
import { upload, uploadImage } from './addImage.js'
import jwt from 'jsonwebtoken'
import { DataAbout, DataGenBodies, DataExeBodies, DataMission, DataSlider, DataGallery, DataActivity, DataFeatActivity } from '../Schemas/TextData.js'
const router = ExpressRouter();
const authMiddleware = async (req, res, next) => {
    var token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ msg: "Not authorized for this operation!!" })
    } else {
        token = token.replace("Bearer", "").trim()
        var isVerified = await jwt.verify(token, process.env.KEY);
        if (isVerified) {
            req.isAdmin = true
        } else
            req.isAdmin = false
        next();
    }
}
const addAbout = async (req, res) => {
    var data = req.body;
    if (req.isAdmin) {
        try {
            var usernew = await DataAbout.create(data)
            res.json({
                msg: "success"
            })
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).json({ msg: "Not authorized for this operation!!" })
    }
}
const addMission = async (req, res) => {
    var data = req.body;
    if (req.isAdmin) {
        try {
            var usernew = await DataMission.create(data);
            res.json({
                msg: "success"
            })
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).json({ msg: "Not authorized for this operation!!" });
    }
}
const addBody = async (req, res) => {
    var token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ msg: "Not authorized for this operation!!" })
    } else {
        token = token.replace("Bearer", "").trim()
        var isVerified = await jwt.verify(token, process.env.KEY);
        if (isVerified) {
            var data = req.body;
            try {
                var imageurl = await uploadImage(req.file.path)
                if (data.bodytype === "executive") {
                    await DataExeBodies.create({ name: data.name, description: data.description, imageurl: imageurl, bodytype: data.bodytype });
                } else
                    await DataGenBodies.create({ name: data.name, description: data.description, imageurl: imageurl, bodytype: data.bodytype });
                res.json({
                    msg: "success"
                })
            } catch (error) {
                res.send(error)
            }
        } else
            res.status(401).send("Unauthorized")
    }

}
const addActivity = async (req, res) => {
    var token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ msg: "Not authorized for this operation!!" })
    } else {
        token = token.replace("Bearer", "").trim()
        var isVerified = await jwt.verify(token, process.env.KEY);
        if (isVerified) {
            var data = req.body;
            try {
                var imageurl = await uploadImage(req.file.path)
                    await DataActivity.create({ name: data.name, description: data.description, image: imageurl});
                res.json({
                    msg: "success"
                })
            } catch (error) {
                res.send(error)
            }
        } else
            res.status(401).send("Unauthorized")
    }

}
const addFeatActivity = async (req, res) => {
    var token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ msg: "Not authorized for this operation!!" })
    } else {
        token = token.replace("Bearer", "").trim()
        var isVerified = await jwt.verify(token, process.env.KEY);
        if (isVerified) {
            var data = req.body;
            try {
                var imageurl = await uploadImage(req.file.path)
                    await DataFeatActivity.create({ name: data.name, description: data.description, image: imageurl});
                res.json({
                    msg: "success"
                })
            } catch (error) {
                res.send(error)
            }
        } else
            res.status(401).send("Unauthorized")
    }

}
const addPhotos = async (req, res) => {
    var token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ msg: "Not authorized for this operation!!" })
    } else {
        token = token.replace("Bearer", "").trim()
        var isVerified = await jwt.verify(token, process.env.KEY);
        if (isVerified) {
            var data = req.files;
            try {
                var images = [];
                for (var i = 0; i < data.length; i++) {
                    var temp = await uploadImage(data[i].path)
                    images.push(temp)
                }
                if (req.params['type'] === "slider") {
                    var ImageSlider = await DataSlider.findOne();
                    if (ImageSlider!=null) {
                        var prevImg = ImageSlider.images;
                        images.forEach(img=>prevImg.push(img))
                        await DataSlider.updateOne({ _id: ImageSlider._id }, { $set: { images: prevImg } })
                    } else {
                        await DataSlider.create({ images })
                    }
                } else{
                    var ImageSlider = await DataGallery.findOne();
                    if (ImageSlider!=null) {
                        var prevImg = ImageSlider.images;
                        images.forEach(img=>prevImg.push(img))
                        await DataGallery.updateOne({ _id: ImageSlider._id }, { $set: { images: prevImg } })
                    } else {
                        await DataGallery.create({ images })
                    }
                }
                res.json({
                    msg: "success"
                })
            } catch (error) {
                res.send(error)
            }
        } else
            res.status(401).send("Unauthorized")
    }
}

router.post("/about", authMiddleware, addAbout)
router.post("/mission", authMiddleware, addMission)
router.post("/activity", upload.single('file'), addActivity)
router.post("/featactivity", upload.single('file'), addFeatActivity)
router.post("/body", upload.single('file'), addBody)
router.post("/photos/:type", upload.array('files', 10), addPhotos)
export { router as addData };