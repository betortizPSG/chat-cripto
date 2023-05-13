const User = require("../models/authModel");
const messageModel = require("../models/messageModel");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");



const getLastMessage = async (myId, fdId) => {
  const msg = await messageModel
    .findOne({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: myId,
              },
            },
            {
              reseverId: {
                $eq: fdId,
              },
            },
          ],
        },
        {
          $and: [
            {
              senderId: {
                $eq: fdId,
              },
            },
            {
              reseverId: {
                $eq: myId,
              },
            },
          ],
        },
      ],
    })
    .sort({
      updatedAt: -1,
    });
  return msg;
};

module.exports.getFriends = async (req, res) => {
  const myId = req.myId;
  let fnd_msg = [];

  try {
    const friendGet = await User.find({
      _id: {
        $ne: myId,
      },
    });

    for (let i = 0; i < friendGet.length; i++) {
      let lmsg = await getLastMessage(myId, friendGet[i].id);
      fnd_msg.push({
        fndInfo: friendGet[i],
        msgInfo: lmsg,
      });
    }

    fnd_msg.sort((a, b) => {
      if (!a.msgInfo || !a.msgInfo.createdAt) {
        return 1;
      }
      if (!b.msgInfo || !b.msgInfo.createdAt) {
        return -1;
      }
      return new Date(b.msgInfo.createdAt) - new Date(a.msgInfo.createdAt);
    });

    res.status(200).json({ success: true, friends: fnd_msg });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
        exception: error,
      },
    });
  }
};

module.exports.messageUploadDB = async (req, res) => {
  const { senderName, reseverId, message, messageEncrypt } = req.body;
  const senderId = req.myId;

  if (!senderName || !reseverId || !message || !messageEncrypt) {
    return res.status(400).json({
      error: {
        errorMessage:
          "senderName, reseverId, message, and messageEncrypt fields are required",
      },
    });
  }

  try {
    const insertMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      reseverId: reseverId,
      message: {
        text: message,
        messageEncrypt: messageEncrypt,
        image: "",
      },
    });
    res.status(201).json({
      success: true,
      message: insertMessage,
      messageEncrypt: insertMessage,
    });
  } catch (error) {
    console.error("Error inserting message: ", error);
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
        exception: error,
      },
    });
  }
};


module.exports.messageGet = async (req, res) => {
  const myId = req.myId;
  const fdId = req.params.id;
  const page = req.query.page || 1

  let msgLimit = 20
  let skip = msgLimit * (page - 1)

  try {

    const filter = {
      $or: [{
        $and: [{
          senderId: {
            $eq: myId
          }
        }, {
          reseverId: {
            $eq: fdId
          }
        }]
      }, {
        $and: [{
          senderId: {
            $eq: fdId
          }
        }, {
          reseverId: {
            $eq: myId
          }
        }]
      }]
    };

    const count = await messageModel.count(filter)
    const totalPage = Math.ceil(count / msgLimit)

    let getAllMessage = await messageModel.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(msgLimit)

    res.status(200).json({
      success: true,
      message: getAllMessage.reverse(),
      totalPage
    })

  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: 'Internal Server error',
        exception: error
      }
    })

  }

}


module.exports.ImageMessageSend = (req, res) => {
  const senderId = req.myId;
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    const { senderName, reseverId, imageName } = fields;

    const formatFile = imageName.split(".")[imageName.split(".").length - 1];
    const newnameimg = `${new Date().getTime()}.${formatFile}`;
    const newPath = path.resolve(
      __dirname,
      "..",
      "public",
      "image",
      `${newnameimg}`
    );

    try {
      fs.copyFile(files.image.filepath, newPath, async (err) => {
        if (err) {
          res.status(500).json({
            error: {
              errorMessage: "Image upload fail",
            },
          });
        } else {
          const insertMessage = await messageModel.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: {
              text: "",
              messageEncrypt: "",
              image: newnameimg,
            },
          });

          // Return the image name to the frontend
          res.status(201).json({
            success: true,
            message: insertMessage,
            imageName: newnameimg,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        error: {
          errorMessage: "Internal Sever Error",
        },
      });
    }
  });
};

module.exports.messageSeen = async (req, res) => {
  const messageId = req.body._id;

  await messageModel
    .findByIdAndUpdate(messageId, {
      status: "seen",
    })
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        error: {
          errorMessage: "Internal Server Error",
        },
        exception: error,
      });
    });
};

module.exports.delivaredMessage = async (req, res) => {
  const messageId = req.body._id;

  await messageModel
    .findByIdAndUpdate(messageId, {
      status: "delivared",
    })
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        error: {
          errorMessage: "Internal Server Error",
        },
      });
    });
};

module.exports.getImage = async (req, res) => {
  const imageName = req.params.id;
  //console.log(`esse é onome da imagem getImage:${imageName}`);
  try {
    // return readFile;
    const fullPathFile = path.resolve(
      __dirname,
      "..",
      "public",
      "image",
      `${imageName}`
    );
    /* console.log(fullPathFile) */
    const binary = fs.readFileSync(fullPathFile, "binary").toString("binary");
    res.end(Buffer.from(binary, "binary"));
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Deu ruim na imagem ",
        exception: error,
      },
    });
  }
};

module.exports.getAnexo = async (req, res) => {
  const imageName = req.params.id;

  try {
    const fullPathFile = path.resolve(
      __dirname,
      "..",
      "public",
      "image",
      "anexo",
      `${imageName}`
    );
    const binary = fs.readFileSync(fullPathFile, "binary").toString("binary");
    res.end(Buffer.from(binary, "binary"));
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Deu ruim no anexo ",
        exception: error,
      },
    });
  }
};

module.exports.buscaMensagem = async (req, res) => {
  try {
    const { reseverId } = req.query;
    const { senderId } = req.query;

    await messageModel
      .find({ reseverId, senderId }).sort({ _id: -1 })
      .then((messages) => {
        return res.status(200).send(messages);
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};