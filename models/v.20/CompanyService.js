const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../../lib/getCurrentDateUkrainTimeZone");

const CompanyServiceSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  service: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    default: "",
  },
  priceWithSale: {
    type: String,
    default: "",
  },
  saleStartDay: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  saleEndDay: {
    type: Date,
    default: "",
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("CompanyService", CompanyServiceSchema);
