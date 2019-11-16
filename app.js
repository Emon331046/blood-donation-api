const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const blood_request = require('./api/routes/blood-request');

const blood_donate = require('./api/routes/blood-donator');

app.use(morgan('dev'));
mongoose.connect('mongodb+srv://hremon046:331046hr@emoncluster-0ve0o.mongodb.net/test?retryWrites=true&w=majority',
{
  useNewUrlParser: true
}
);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if(res.method === 'OPTIONS')
  {
    res.header("Access-Control-Allow-Methods",'PUT, PATCH, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

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
