const AppointmentRelations = require("../../models/v.20/AppointmentRelations");

class AppointmentService {
  async create(options) {
    // let { company_id, client_id, schedule_id } = options;
    // if (!company_id || !client_id || !schedule_id) {
    //   throw new Error("Invalid data was sent"); // 400
    // }
    // const appointment = await AppointmentRelations.create(options);
    // return appointment;
  }

  async getAll(query) {
    if (!query) {
      throw new Error("Invalid data was sent"); // 400
    }

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
    const appointment = await AppointmentRelations.findById(id);
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
