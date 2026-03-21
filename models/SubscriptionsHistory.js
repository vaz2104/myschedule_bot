const { Schema, model } = require("mongoose");

const SubscriptionsHistorySchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  orderId: {
    type: String,
    default: "",
  },
  orderDetails: {
    type: String,
    default: "",
  },
  plan: {
    type: String,
    default: "free", // basic | business | businessPlus
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  planEndDate: {
    type: Date,
    default: "",
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("SubscriptionsHistory", SubscriptionsHistorySchema);
