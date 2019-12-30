const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.body);
    const decode = jwt.verify(token,"secret");
    req.userData = decode;
    next();
  } catch(error){
    return res.status(401).json({
      success: false,
      message : "authentication failed",
      error: error
    })
  }
}
