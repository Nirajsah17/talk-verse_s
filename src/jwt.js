const { sign, verify } = require("jsonwebtoken");
const secretToken = "7554873567#$@^#$^^!$!";
const createToken = (user)=>{
    const accessToken = sign({email: user.email, id: user.id},secretToken);
    return accessToken;
};
module.exports = {createToken};