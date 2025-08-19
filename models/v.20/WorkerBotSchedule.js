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
  hours: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("WorkerBotSchedule", WorkerBotScheduleSchema);
