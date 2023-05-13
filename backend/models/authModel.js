const { model, Schema } = require("mongoose");
const crypto = require("crypto");

const registerSchema = new Schema(
  {
    userCode: {
      type: String,
      default: generateUserCode,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

function generateUserCode() {
  const hash = crypto.createHash("sha256");
  const timestamp = new Date().valueOf().toString();
  const random = Math.random().toString();
  hash.update(timestamp + random);
  return hash.digest("hex").substring(0, 4);
}

module.exports = model("user", registerSchema);
