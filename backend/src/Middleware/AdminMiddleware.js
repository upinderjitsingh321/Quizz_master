require("dotenv").config();
const jwt = require("jsonwebtoken");
const { CustomResponse } = require("../../Utlis/responseformatters");
const { users } = require("../../Database/models");

const AdminMiddleware = async (req, res, next) => {
  const access_token = req.headers.authorization;

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

  if (existUser.role !== "admin") {
    return CustomResponse(res, false, 403, {}, "Access denied: Admins only.");
  }

  req.user = {};
  req.user = token_decoded;
  
  next();
};

module.exports = AdminMiddleware;
