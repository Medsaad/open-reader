'use strict'
const jwt = require("jsonwebtoken");

const SECRET = "NEVER EVER MAKE THIS PUBLIC IN PRODUCTION!";
module.exports = {
    ensureLoggedIn(req, res, next) {
        try {
          const authHeaderValue = req.headers.authorization;
          const token = jwt.verify(authHeaderValue, SECRET); //token contains user email token.email .. so you can use it in controller
          
          return next();
        } catch (e) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }
}