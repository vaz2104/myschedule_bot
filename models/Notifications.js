const { Schema, model } = require("mongoose");
const moment = require("moment-timezone");
const dateUkrain = moment.tz(Date.now(), "Europe/Kyiv");

const NotificationsSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  message: {
    type: String,
    default: "",
  },
  receiver: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: dateUkrain,
  },
});

module.exports = model("Notifications", NotificationsSchema);
