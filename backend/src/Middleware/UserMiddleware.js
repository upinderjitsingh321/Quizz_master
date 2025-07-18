require("dotenv").config();
const jwt = require("jsonwebtoken");
const { CustomResponse } = require("../../Utlis/responseformatters");
const {users} = require("../../Database/models");

const UserMiddleware = async (req, res, next) => {
  const access_token = req.headers.authorization;

    if (!access_token) {
    return CustomResponse(res, false, 401, {}, "No token provided.");
  }

  const token = access_token.split(" ")[1];
  let token_decoded = {};

  try {
    token_decoded = jwt.verify(token, "secretecode304");
  } catch (error) {
    console.log(error);
    return CustomResponse(res, false, 400, {}, "Invalid or expired token.");
  }

   const existUser = await users.findOne({
      where: {
        email: token_decoded.email,
      },
    });

    if (!existUser) {
      return CustomResponse(res, false, 401, {}, "User not exist ");
    }

    if (existUser.role !== 'student') {
  return CustomResponse(res, false, 403, {}, "Access denied: Users only.");
}

   req.user={}
   req.user=token_decoded
  next()
};

module.exports = UserMiddleware;
