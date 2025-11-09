const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const TelegramUserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  photoUrl: {
    type: String,
    default: "",
  },
  lastActiveSession: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  dateRegistration: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model("TelegramUser", TelegramUserSchema);
