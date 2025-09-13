const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../../lib/getCurrentDateUkrainTimeZone");

const NotificationUserRelationSchema = new Schema({
  notification: {
    type: Schema.Types.ObjectId,
    ref: "Notification",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  recipientRole: {
    type: String,
    default: "", // client | admin
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
  openedDate: {
    type: Date,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model(
  "NotificationUserRelation",
  NotificationUserRelationSchema
);
