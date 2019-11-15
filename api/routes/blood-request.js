const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=> {
  res.status(200).json({
    message : 'get request hit'
  })
})


router.post('/',(req, res, next)=> {
  res.status(201).json({
    message : 'post request hit'
  })
})


router.get('/:requestID',(req, res, next)=> {
  const requestID = req.params.requestID;
  res.status(200).json({
    message : 'get id request hit',
    Id : requestID
  })
})

router.patch('/:requestID',(req, res, next)=> {
  const requestID = req.params.requestID;
  res.status(201).json({
    message : 'updated id request hit',
    Id : requestID
  })
})

router.delete('/:requestID',(req, res, next)=> {
  const requestID = req.params.requestID;
  res.status(200).json({
    message : 'delet id request hit',
    Id : requestID
  })
})

module.exports = router;
