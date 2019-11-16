const express = require('express');
const router = express.Router();
const Requester = require('../models/request-model');
const mongoose = require('mongoose');

router.get('/',(req, res, next)=> {
  Requester.find()
            .exec()
            .then(result => {
              if(result.length >= 0){
                res.status(200).json({
                  requesterData : result
                })
              } else {
                res.status(404).json({
                  message: 'not found any data'
                })
              }
            })
            .catch(error => {
              res.status(500).json({
                message : error
              })
            });
});


router.post('/',(req, res, next)=> {

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
    console.log(result);

    res.status(201).json({
      message : 'requester created ',
      requesterData: requester
    })

  }).catch( err => {
    console.log(err);

    res.status(500).json({
      error: error
    });
  });
})


router.get('/:requestID',(req, res, next)=> {
  const requestID = req.params.requestID;
  Requester.findById(requestID)
  .exec()
  .then(result => {
    console.log(result);
    if(result)
    {

      res.status(201).json({
        message : 'requester find with id ',
        requesterData: result
      })
    }
    else {
      res.status(404).json({
        message: 'not found valid '
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: error
    });
  });

});

router.patch('/:requestID',(req, res, next)=> {
  const requestID = req.params.requestID;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }

  Requester.update({ _id: requestID}, { $set: updateOps} )
          .exec()
          .then(result => {
            res.status(201).json({
              message : 'updated id request hit',
              Data : result
            })
          })
          .catch(error => {
            res.status(500).json({
              message : 'updated not done',
              error: error
            })
          });

})

router.delete('/:requestID',(req, res, next)=> {
  const requestID = req.params.requestID;
  Requester.remove({ _id: requestID}).exec()
            .then(result => {
              res.status(200).json({
                message : 'succesfully deleted',
                result : result
              })
            })
            .catch( error=> {
              res.status(500).json({
                message : error
              })
            });
})

module.exports = router;
