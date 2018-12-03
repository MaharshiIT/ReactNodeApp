const express = require('express');
const router  = express.Router();

const jwt = require('jsonwebtoken');
const fs = require('fs');

const auth = require('../middlewares/auth');

module.exports = app => {
    app.post('/login', auth("local"), (req,res)=>{
        const {user} = req;
        if (!user) res.json({user:"",success:false});
        else
            {
            const token = jwt.sign({id:user.id},require('../config/keys').jwtKey,{expiresIn: '30s'});
            if(user.photo !== "")
                {
                let photo_base_64 = "";
                // read binary data
                const image = fs.readFileSync(`${__dirname}/photos/${user.photo}`);
                // convert binary data to base64 encoded string
                photo_base_64 = new Buffer(image).toString('base64');
                user.photo = `data:image/${user.photo.split(".").pop().toLowerCase()};base64,${photo_base_64}`;
                }
            res.json({user,token,success:true});
            }
    });

    app.post('/protected',auth("jwt"),(req, res) => {
        if(req.user) res.json({message:"This is the protected route. It will expire after 30 seconds. Please refresh to check.",success:true});
        else res.json({message:"",success:false});
        });
}