
const express = require('express');
const router = express.Router();

const VideoDetails = require('../models/VideoDetails');      //capital V in /VideoDetails running
//const VideoDetails = require('../models/videoDetails');    //small v in /videoDetails giving error


router.get('/', (req, res, next) => {
  VideoDetails
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;