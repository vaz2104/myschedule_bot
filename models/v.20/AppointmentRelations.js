const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../../lib/getCurrentDateUkrainTimeZone");

const AppointmentRelationsSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  workerId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: "WorkerBotSchedule",
  },
  appointmentKey: {
    type: String,
    default: "",
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "CompanyService",
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

module.exports = model("AppointmentRelations", AppointmentRelationsSchema);
