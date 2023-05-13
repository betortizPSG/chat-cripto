const router = require("express").Router();

const {
  getFriends,
  messageUploadDB,
  messageGet,
  ImageMessageSend,
  messageSeen,
  getAnexo,
  delivaredMessage,
  getImage,
  buscaMensagem
} = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, getFriends);
router.post("/send-message", authMiddleware, messageUploadDB);
router.get("/get-message/:id", authMiddleware, messageGet);
router.post("/image-message-send", authMiddleware, ImageMessageSend);

router.post("/seen-message", authMiddleware, messageSeen);
router.post("/delivared-message", delivaredMessage);
router.get("/image/:id", getImage);
router.get("/anexo/:id", getAnexo);
router.get("/busca-mensagem", buscaMensagem);

module.exports = router;
