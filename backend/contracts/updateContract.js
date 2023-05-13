const validator = require("validator");

const updateValidator = (fields) => {
  const { userName, email } = fields;
  const error = [];
  if (userName) {
    error.push("Por favor entre com seu nome");
  }
  if (email) {
    error.push("Por favor entre com seu e-mail");
  }
  if (email && validator.isEmail(email)) {
    error.push("Por favor entre com um e-mail valido");
  }
  return error;
};

const updateContract = {
  updateValidator,
};

module.exports = updateContract;
