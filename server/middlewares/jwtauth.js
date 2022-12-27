const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(req.headers);
    const tokenCheck = jwt.verify(token, process.env.APP_SECRET_KEY);
    // console.log(tokenCheck);
    req.body.userId = tokenCheck._id;
    next();
  } catch (err) {
    res.status(401).send({
        message: "You are not authenticated",
        data: err,
        success:false,
    });
  }
};
