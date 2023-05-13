const formidable = require("formidable");
const validator = require("validator");
const registerModel = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const console = require("console");
const userContract = require("../contracts/userContract");
const loginContract = require("../contracts/loginContract");
const ImageUtils = require("../utils/ImageUtils.js");
const ResponseUtils = require("../utils/ResponseUtils.js");
const User = require("../models/authModel");
const { default: mongoose } = require("mongoose");

module.exports.userRegister = (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    const { userName, email, password } = fields;
    const registerErrorList = userContract.registerValidator(fields);

    if (registerErrorList.length > 0) {
      ResponseUtils.error(res, 400, registerErrorList);
    } else {
      const imageUtils = new ImageUtils();
      const { newPath, newNameImage } = imageUtils.imageValidator(files);

      if (newPath) {
        fs.copyFile(files.image.filepath, newPath, async (error) => {
          if (!error) {
          } else {
            ResponseUtils.error(res, 500, "HTTP STATUS 500");
          }
        });
      }

      try {
        const checkUser = await registerModel.findOne({
          email: email,
        });
        if (checkUser) {
          ResponseUtils.error(res, 400, "Esse e-mail já está em uso");
        } else {
          const userCreate = await registerModel.create({
            userName,
            email,
            password: await bcrypt.hash(password, 10),
            image: newNameImage,
          });

          const token = authenticate(userCreate);

          ResponseUtils.success(
            res,
            201,
            token,
            "Cadastro realizado com sucesso"
          );
        }
      } catch (error) {
        ResponseUtils.error(res, 500, "Erro ao finalizar registro");
      }
    }
  });
};

const authenticate = (userCreate) => {
  const token = jwt.sign(
    {
      id: userCreate._id,
      email: userCreate.email,
      userName: userCreate.userName,
      image: userCreate.image,
      registerTime: userCreate.createdAt,
      userCode: userCreate.userCode,
    },
    process.env.SECRET,
    {
      expiresIn: process.env.TOKEN_EXP,
    }
  );
  return token;
};

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  const loginErrorList = loginContract.loginValidator(req.body);

  if (loginErrorList.length > 0) {
    ResponseUtils.error(res, 400, loginErrorList);
  } else {
    try {
      const checkUser = await registerModel
        .findOne({
          email: email,
        })
        .select("+password");

      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );

        if (matchPassword) {
          const token = authenticate(checkUser);

          ResponseUtils.success(res, 201, token, "Login efetuado com sucesso");
        } else {
          ResponseUtils.error(res, 400, "Email ou senha inválido");
        }
      } else {
        ResponseUtils.error(res, 400, "Email ou senha inválido");
      }
    } catch (error) {
      console.error(error);
      ResponseUtils.error(res, 400, "Erro ao finalizar autenticação");
    }
  }
};

module.exports.userLogout = (req, res) => {
  res.status(200).header("Authorization", "").json({
    success: true,
  });
};


module.exports.userUpdate = async (req, res) => {
  const { userCode } = req.query;

  try {
    const user = await registerModel.findOne(userCode);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const { userName, email, image } = req.body;

    if (userName) {
      user.userName = userName;
    }

    if (email) {
      user.email = email;
    }

    if (image) {
      user.image = image;
    }

    await user.save();

    return res.status(200).send({ message: "Encontrou usuário:", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/* module.exports.userUpdate = async (req, res) => {
  try {
    const body = req.body;
    const { _id} = req.params;

    if(!_id) return res.json({success: false, message: "Usuário não encontrado"});

    const user = await registerModel.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        ...body
      },
      {
        new: true,
      }
    );
    res.json({success: true, message: "Usuário atualizado com sucesso", data: user});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Erro ao atualizar usuário"});
  }
}; */