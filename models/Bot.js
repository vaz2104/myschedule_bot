const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const BotSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  token: {
    type: String,
    default: "",
  },
  telegramBotId: {
    type: String,
    default: "",
  },
  port: {
    type: Number,
  },
  plan: {
    type: String,
    default: "free", // basic | business | businessPlus
  },
  planEndDay: {
    type: Date,
    default: "",
  },
  // isBlocked: {
  //   type: Boolean,
  //   default: false,
  // },
  // infoMessage: {
  //   type: String,
  //   default: "",
  // },
  themePalette: {
    type: String,
    default: "",
  },
  dateRegistration: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model("Bot", BotSchema);
