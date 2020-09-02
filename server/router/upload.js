const express =require('express');
const multer =require('multer'); // to store videos in local file
const Router= express.Router();

const thumbnailGenerator =require('../helpers/videoThumnail');
const port =require('../configs/default').port;

const storage= multer.diskStorage({
    destination: (req,res,cb)=>{       //cb = callback function
        cb(null, 'media/uploads');
    },
    filename: (req,file, cb)=>{
        cb(null, file.originalname.replace(/ /g, '_'));
    }
});
const upload = multer({   // middleware to callback next only if it executed successful
    storage: storage,
    limits: {
        fileSize: 1024 *1024 * 50 //50 MB
    }
});

Router.post('/', upload.single('file'), (req, res, next)=>{
    thumbnailGenerator.generateThumbnail(
        // /api/videos is made publically available in App.js
        'http://127.0.0.1:' + port + '/api/videos/' + req.file.filename.replace(/ /g, '_'), 
        req.file.filename.replace(/ /g, '_'),
        req.userData.firstName);
        res.status(200).json({
        message: 'Video upload successful'
      });
});

module.exports = Router;