const { Schema, model } = require("mongoose");

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
    default: "",
  },
});

module.exports = model("Notifications", NotificationsSchema);
