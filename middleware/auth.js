const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  try {
    if (!token) throw err();
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Authoziration Denied" });
  }
};
