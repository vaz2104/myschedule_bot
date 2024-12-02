const { Schema, model } = require("mongoose");

const CompanyScheduleSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  date: {
    type: Date,
    default: "",
  },
  hours: {
    type: String,
    default: "",
  },
});

module.exports = model("CompanySchedule", CompanyScheduleSchema);
