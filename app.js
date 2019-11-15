const express = require('express');
const app = express();
const morgan = require('morgan');

const blood_request = require('./api/routes/blood-request');

const blood_donate = require('./api/routes/blood-donator');

app.use(morgan('dev'));

app.use('/blood-request',blood_request);
app.use('/blood-donate',blood_donate);

app.use((req,res,next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
    error : {
      message : error.message
    }
  });
});
module.exports = app;
