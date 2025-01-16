const { Schema, model } = require("mongoose");

const ClientSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    default: "",
  },
  photo_url: {
    type: String,
    default: "",
  },
  initials: {
    type: String,
    default: "",
  },
});

module.exports = model("Client", ClientSchema);
