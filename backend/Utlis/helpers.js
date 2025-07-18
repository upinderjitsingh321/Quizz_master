const jwt = require("jsonwebtoken");

const Create_Token = (slug, expiresIn="") => {
  const maxtime = 1 * 24 * 60 * 60;
  const Token = jwt.sign({ ...slug }, "secretecode304", {
    expiresIn: expiresIn || maxtime,
  });
  return Token;
};

module.exports = Create_Token;
