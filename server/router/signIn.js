const express= require('express');
const User= require('../models/User');
const router = express.Router();
const bcrtpt = require('bcrypt');
const MYSECRET=require('../configs/default').secret_key;
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next)=>{
    User.find({email: req.body.email})
       // .exec()
        .then(user =>{
           if(user.length<1){
               // user not found
               return res.status(401).json({
                   message:"Authorization failed, user not found"
               });
           }
           bcrtpt.compare(req.body.password, user[0].password, (err,result)=>{
               if(err){ 
                   return res.status(401).json({
                       message: "Authorization failed",
                       error: err
                   });
               }
               if(result) {
                const token = jwt.sign({
                    userId: user[0]._id,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email,
                  }, 
                  MYSECRET,
                  {
                    expiresIn: "1h"
                  });
                  return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                  });
               }
               res.status(401).json({
                message: "Authorization failed, wrong password"
            });
           });
        })
        .catch(err =>{
            console.log(err);
             res.status(404).json({
                error:err
            });
        });
})
 module.exports=router;
