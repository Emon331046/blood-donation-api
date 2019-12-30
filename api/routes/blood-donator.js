const express = require('express');
const router = express.Router();
const Donator = require('../models/donate-model');
const checkAuth = require('../../middleware/auth');
const mongoose = require('mongoose');

router.get('/',checkAuth ,(req, res, next)=> {
  Donator.find()
            .select("_id name bloodGroup location contactNo")
            .exec()
            .then(result => {
              const response = {
                success : true,
                error: null,
                data: result
              }
              res.status(200).json(response)
            })
            .catch(error => {
              res.status(500).json({
                success : false,
                error: error
              })
            });
});


router.post('/', checkAuth, (req, res, next)=> {

  const donator = new Donator({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    bloodGroup: req.body.bloodGroup,
    location: req.body.location,
    contactNo: req.body.contactNo,

  })
  donator.save().then(result => {
    const response = {
      success : true,
      error: null,
      data: result
    }
    res.status(201).json(response)

  }).catch( err => {
    res.status(500).json({
      success : false,
      error: err
    })
  });
})


router.get('/:donatorID',checkAuth, (req, res, next)=> {
  const donatorID = req.params.donatorID;
  Donator.findById(donatorID)
  .exec()
  .then(result => {
    if(result)
    {
      const response = {
        success : true,
        error: null,
        data: result
      }
      res.status(200).json(response)
    }
    else {
      res.status(500).json({
        success : false,
        error: err
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      success : false,
      error: err
    });
  });

});

router.patch('/:donatorID',checkAuth,(req, res, next)=> {
  const donatorID = req.params.donatorID;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }

  Donator.update({ _id: donatorID}, { $set: updateOps} )
          .exec()
          .then(result => {
            const response = {
              success : true,
              error: null,
              data: result
            }
            res.status(200).json(response)
          })
          .catch(error => {
            res.status(500).json({
              success : false,
              error: err
            });
          });

})

router.delete('/:donatorID',checkAuth,(req, res, next)=> {
  const donatorID = req.params.donatorID;
  Donator.remove({ _id: donatorID}).exec()
            .then(result => {
              const response = {
                success : true,
                error: null,
                data: result
              }
              res.status(200).json(response)
            })
            .catch( error=> {
              res.status(500).json({
                success : false,
                error: err
              });
            });
})

module.exports = router;
