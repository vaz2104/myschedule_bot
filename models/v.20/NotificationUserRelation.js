const { Schema, model } = require("mongoose");

const NotificationUserRelationSchema = new Schema({
  notification: {
    type: Schema.Types.ObjectId,
    ref: "Notification",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
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
    default: "",
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
