const { Schema, model } = require("mongoose");

const CompanySchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
    unique: true,
  },
  lastActiveSession: {
    type: Date,
  },
  botToken: {
    type: String,
    default: "",
  },
});

module.exports = model("Company", CompanySchema);
