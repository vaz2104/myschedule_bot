const { Schema, model } = require("mongoose");

const AppointmentRelationsSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: "WorkerBotSchedule",
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "CompanyService",
  },
  date: {
    type: Date,
    default: new Date(),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("AppointmentRelations", AppointmentRelationsSchema);
