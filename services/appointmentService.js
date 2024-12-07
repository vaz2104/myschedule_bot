const AppointmentRelations = require("../models/AppointmentRelations");

class AppointmentService {
  async create(options) {
    let { company_id, client_id, schedule_id } = options;

    if (!company_id && !client_id && !schedule_id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointment = await AppointmentRelations.create(options);
    return appointment;
  }

  async getAllByClientId(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointments = await AppointmentRelations.find({
      client_id: id,
    })
      .populate(["client_id", "service_id", "schedule_id", "company_id"])
      .sort([["date", -1]])
      .exec();

    return appointments;
  }

  async getAllByCompanyId(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointments = await AppointmentRelations.find({
      company_id: id,
    })
      .populate(["client_id", "service_id", "schedule_id", "company_id"])
      .sort([["date", -1]])
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

  async update(options) {
    let { company_id, client_id, schedule_id, _id } = options;

    if (!_id || !company_id || !client_id || !schedule_id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointment = await AppointmentRelations.findByIdAndUpdate(
      _id,
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
