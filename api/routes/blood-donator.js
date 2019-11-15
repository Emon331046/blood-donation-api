const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=> {
  res.status(200).json({
    message : 'get donate all hit'
  })
})


router.post('/',(req, res, next)=> {
  res.status(201).json({
    message : 'post donator hit'
  })
})


router.get('/:donateID',(req, res, next)=> {
  const donateID = req.params.donateID;
  res.status(200).json({
    message : 'get id donateID hit',
    Id : donateID
  })
})

router.patch('/:donateID',(req, res, next)=> {
  const donateID = req.params.donateID;
  res.status(201).json({
    message : 'updated id donateID hit',
    Id : donateID
  })
})

router.delete('/:donateID',(req, res, next)=> {
  const donateID = req.params.donateID;
  res.status(200).json({
    message : 'delet id donateID hit',
    Id : donateID
  })
})

module.exports = router;
