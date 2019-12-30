const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


router.post('/signup',(req, res, next)=> {
  User.find({ email: req.body.email })
  .exec()
  .then( result => {
    if(result.length === 0)
    {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        bloodGroup: req.body.bloodGroup,
        location: req.body.location,
        contactNo: req.body.contactNo
      })
      user.save()
      .then(result => {
        const response = {
          success : true,
          error: null,
          data: result
          }
          res.status(201).json(response);
        })
        .catch(error =>{
          return res.status(500).json({
          success: false,
          error: error
        })
        })
    }
    else {
      return res.status(500).json({
      success: false,
      error: "exists already"
    })
    }

  })
})


router.post('/login',(req, res, next)=> {
  User.find({email: req.body.email})
      .exec()
      .then(result => {
        if(result.length === 0)
        {
          return res.status(501).json({
          success: false,
          error: "authentication failed"
        })
        }
        else {
          if(result[0].password === req.body.password){

            const token = jwt.sign(
              {
                email: result[0].email,
                userId: result[0]._id
              },
              "secret",
              {
                expiresIn:"2h"
              }
            );

            return res.status(401).json({
            success: true,
            message: "authentication done",
            token: token
          })

          }
          else {
            return res.status(500).json({
            success: false,
            message: "authentication failed"
			
          })
          }

        }
      })
      .catch(error => {

      });
});

module.exports = router;
