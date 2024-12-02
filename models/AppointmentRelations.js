const { Schema, model } = require("mongoose");

const AppointmentRelationsSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  schedule_id: {
    type: Schema.Types.ObjectId,
    ref: "CompanySchedule",
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: "CompanyService",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("AppointmentRelations", AppointmentRelationsSchema);
