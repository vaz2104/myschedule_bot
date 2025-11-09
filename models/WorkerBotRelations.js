const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const WorkerBotRelationsSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  workerId: {
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

module.exports = model("WorkerBotRelations", WorkerBotRelationsSchema);
