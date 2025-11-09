const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const NotificationSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
    default: null,
  },
  message: {
    type: String,
    default: "",
  },
  metadata: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("Notification", NotificationSchema);
