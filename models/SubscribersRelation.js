const { Schema, model } = require("mongoose");

const SubscribersRelationSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("SubscribersRelation", SubscribersRelationSchema);
