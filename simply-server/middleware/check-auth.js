const jwt = require('jsonwebtoken');

// Bearer authorization
module.exports = (req, res, next) => {
  try {
    const bearer = req.headers['authorization'].split(' ')[1];
    // TODO: Make secretKey as a env var
    const decoded = jwt.verify(bearer, 'secretkey');
    req.userData  = decoded ;
    next();
  } catch (e) {
    return res.status(401).json({
      message : 'Auth failed'
    });
  }
};
