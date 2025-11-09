const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const AuthSchema = new Schema({
  telegramUserId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  key: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model("Auth", AuthSchema);
