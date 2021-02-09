const jwt = require('jsonwebtoken');

const checkUserIsAuthenticated = async (req, res, next) => {
  try {
    const data = await jwt.verify(req.cookies.auth, process.env.APP_SECRET);
    req.user = data.id;
    req.isAdmin = data.isAdmin;
    next();
  } catch (error) {
    next(error);
  }
};

const checkUserIsAdmin = (req, res, next) => {
  if (!req.isAdmin)
    return res.status(401).send();
  else
    next();
};

module.exports = {
  checkUserIsAuthenticated,
  checkUserIsAdmin
};