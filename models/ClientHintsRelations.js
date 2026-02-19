const { Schema, model } = require("mongoose");

const ClientHintsRelationsSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  hintType: {
    type: String,
    default: "",
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("ClientHintsRelations", ClientHintsRelationsSchema);
