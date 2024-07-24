import { mongoose,Schema } from "mongoose";

const DataSchemaAbout = new Schema({
    "brieftext":{
        type:"string",
        required:true
    },
    "longtext":{
        type:"string",
        required:true
    }
})
const DataSchemaMission = new Schema({
    "vision":{
        type:"string",
        required:true
    },
    "mission":{
        type:"string",
        required:true
    }
})
const DataSchemaExeBodies = new Schema({
    "name":{
        type:"string",
        required:true
    },
    "description":{
        type:"string",
        required:true
    },
    "imageurl":{
        type:"string",
        required:true
    },
    "bodytype":{
        type:"string",
        required:true
    }
    
})
const DataSchemaGenBodies = new Schema({
    "name":{
        type:"string",
        required:true
    },
    "description":{
        type:"string",
        required:true
    },
    "imageurl":{
        type:"string",
        required:true
    },
    "bodytype":{
        type:"string",
        required:true
    }
    
})

const DataSchemaSlider = new Schema({
    "images":{
        type:"Array",
        required:true
    }
})

const DataSchemaActivities = new Schema({
    "name":{
        type:"String",
        required:true
    },
    "description":{
        type:"String",
        required:true
    },
    "image":{
        type:"String",
        required:true
    }
})
const DataSchemaFeatActivities = new Schema({
    "name":{
        type:"String",
        required:true
    },
    "description":{
        type:"String",
        required:true
    },
    "image":{
        type:"String",
        required:true
    }
})

const DataSchemaDonate=new Schema({
    "upi":{
        type:"String",
        required:true
    }
})
const DataSchemaGallery=new Schema({
    "images":{
        type:"Array",
        required:true
    }
})
const DataSchemaVideo=new Schema({
    "video":{
        type:"String",
        required:true
    }
})

const DataAbout=mongoose.model('aboutData', DataSchemaAbout);
const DataMission=mongoose.model('missionData', DataSchemaMission);
const DataGenBodies=mongoose.model('bodyData', DataSchemaGenBodies);
const DataExeBodies=mongoose.model('exeBodyData', DataSchemaExeBodies);
const DataSlider=mongoose.model('sliderImage', DataSchemaSlider);
const DataActivity=mongoose.model('activity', DataSchemaActivities);
const DataFeatActivity=mongoose.model('activityFeat', DataSchemaFeatActivities);
const DataDonate=mongoose.model('donationUpi', DataSchemaDonate);
const DataGallery=mongoose.model('galleryImages', DataSchemaGallery);
const DataVideo=mongoose.model('galleryVideos', DataSchemaVideo);

export{DataAbout,DataMission,DataGenBodies,DataExeBodies,DataSlider,DataActivity,DataFeatActivity,DataDonate,DataGallery,DataVideo};