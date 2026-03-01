const { Schema, model } = require("mongoose");

const CustomClientSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("CustomClient", CustomClientSchema);
