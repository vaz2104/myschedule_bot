const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../../lib/getCurrentDateUkrainTimeZone");

const ClientBotRelationsSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  telegramUserId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model("ClientBotRelations", ClientBotRelationsSchema);
