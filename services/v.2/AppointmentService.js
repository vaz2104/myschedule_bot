const AppointmentRelations = require("../../models/v.20/AppointmentRelations");

class AppointmentService {
  async create(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointment = await AppointmentRelations.create(options);
    return appointment;
  }

  async getMany(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const query = JSON.parse(JSON.stringify(options));

    const appointments = await AppointmentRelations.find(query)
      .populate(["serviceId", "clientId", "scheduleId"])
      .sort([["timestamp", -1]])
      .exec();

    return appointments;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }
    const appointment = await AppointmentRelations.findById(id).populate([
      "botId",
      "serviceId",
      "clientId",
      "scheduleId",
    ]);
    return appointment;
  }

  async update(id, options) {
    let { botId, clientId, scheduleId } = options;

    if (!botId || !clientId || !scheduleId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointment = await AppointmentRelations.findByIdAndUpdate(
      id,
      options,
      { new: true }
    );

    return appointment;
  }
  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointment = await AppointmentRelations.findByIdAndDelete(id);

    return appointment;
  }
}

module.exports = new AppointmentService();
