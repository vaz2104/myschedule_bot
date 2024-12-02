const { Schema, model } = require("mongoose");

const CompanyServiceSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  service: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    default: "",
  },
  sale: {
    type: String,
    default: "",
  },
  saleEndDay: {
    type: Date,
    default: "",
  },
});

module.exports = model("CompanyService", CompanyServiceSchema);
