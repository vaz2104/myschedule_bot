const { Schema, model } = require("mongoose");

const WorkerBotServicesSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  workerId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  services: {
    type: Array,
  },
  disabledServices: {
    type: Array,
  },
});

module.exports = model("WorkerBotServices", WorkerBotServicesSchema);
