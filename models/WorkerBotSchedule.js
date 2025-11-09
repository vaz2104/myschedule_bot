const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const WorkerBotScheduleSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  workerId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  date: {
    type: Date,
    default: "",
  },
  schedule: {
    type: Map,
    of: String,
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("WorkerBotSchedule", WorkerBotScheduleSchema);
