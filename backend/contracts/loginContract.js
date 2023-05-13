const validator = require("validator");

const loginValidator = (body) => {
  const error = [];
  const { email, password } = body;
  
  if (!email) {
    error.push("Por favor entre com seu email");
  }
  if (!password) {
    error.push("Por favor entre com sua senha");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Por favor digite um email valido");
  }
  return error;
};
const loginContract = {
  loginValidator,
};

module.exports = loginContract;
