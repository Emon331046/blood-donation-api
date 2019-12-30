const express = require('express');
const router = express.Router();
const Requester = require('../models/request-model');
const checkAuth = require('../../middleware/auth');
const mongoose = require('mongoose');

router.get('/',checkAuth ,(req, res, next)=> {
  Requester.find()
            .select("_id name bloodGroup AmountOfBlood location contactNo needWithIn managed")
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

  const requester = new Requester({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    bloodGroup: req.body.bloodGroup,
    AmountOfBlood: req.body.AmountOfBlood,
    location: req.body.location,
    contactNo: req.body.contactNo,
    needWithIn: req.body.needWithIn,
    managed: false

  })
  requester.save().then(result => {
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


router.get('/:requestID',checkAuth, (req, res, next)=> {
  const requestID = req.params.requestID;
  Requester.findById(requestID)
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

router.patch('/:requestID',checkAuth,(req, res, next)=> {
  const requestID = req.params.requestID;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }

  Requester.update({ _id: requestID}, { $set: updateOps} )
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

router.delete('/:requestID',checkAuth,(req, res, next)=> {
  const requestID = req.params.requestID;
  Requester.remove({ _id: requestID}).exec()
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
