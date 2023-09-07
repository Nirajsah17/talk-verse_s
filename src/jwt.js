const { sign, verify } = require("jsonwebtoken");
const secretToken = "7554873567#$@^#$^^!$!";
const createToken = (user) => {
  const accessToken = sign({ email: user.email, id: user.name }, secretToken);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  console.log(accessToken);
  if (!accessToken) return res.status(400).json({ err: "Not a Valid user" });
  try {
    const _validToken = verify(accessToken, secretToken);
    console.log(_validToken);
    if (_validToken) {
      req.useremail = _validToken.email;
      return next();
    }
  } catch (err) {
    res.status(400).json({err: err});
  }
}
module.exports = { createToken, validateToken };