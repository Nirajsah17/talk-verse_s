const { sign, verify } = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");
const secretToken = "7554873567#$@^#$^^!$!";
const createToken = (user) => {
  const accessToken = sign({ email: user.email, id: user.id }, secretToken);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) return res.status(400).json({ err: "Not a Valid user" });
  try {
    const _validToken = verify(accessToken, secretToken);
    if (_validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    res.status(400).json({err: err});
  }
}
module.exports = { createToken, validateToken };