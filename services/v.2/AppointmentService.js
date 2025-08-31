const formatDate = require("../../lib/formatDate");
const AppointmentRelations = require("../../models/v.20/AppointmentRelations");
const TelegramNotifications = require("../../modules/TelegramNotifications");

class AppointmentService {
  async create(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointment = await AppointmentRelations.create(options);
    await TelegramNotifications.newAppointment(
      JSON.parse(JSON.stringify(appointment))
    );
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

    const appointmentData = await AppointmentRelations.findById(id).populate([
      "botId",
      "serviceId",
      "clientId",
      "scheduleId",
    ]);

    const appointment = await AppointmentRelations.findByIdAndDelete(id);

    await TelegramNotifications.cancelAppointment(appointmentData);

    return appointment;
  }
}

module.exports = new AppointmentService();
