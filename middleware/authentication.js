const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Please Login");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.Userid, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
module.exports = authentication;
