const validator = require("validator");

const registerValidator = (fields) => {
  const { userName, email, password, confirmPassword } = fields;
  const error = [];
  if (!userName) {
    error.push("Por favor entre com seu nome");
  }
  if (!email) {
    error.push("Por favor entre com seu e-mail");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Por favor entre com um e-mail valido");
  }
  if (!password) {
    error.push("Por favor entre com uma senha");
  }
  if (!confirmPassword) {
    error.push("Por favor confirme sua senha");
  }
  if (password && confirmPassword && password !== confirmPassword) {
    error.push("Sua senha e a confirmação não são iguais");
  }
  if (password && password.length < 6) {
    error.push("Por favor entre com uma senha de 6 digitos");
  }
  return error;
};

const userContract = {
  registerValidator,
};

module.exports = userContract;
