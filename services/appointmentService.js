const AppointmentRelations = require("../models/AppointmentRelations");

class AppointmentService {
  async create(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const appointment = await AppointmentRelations.create(options);
    return this.getOne(appointment?._id);
  }

  async getMany(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const query = JSON.parse(JSON.stringify(options));

    const appointments = await AppointmentRelations.find(query)
      .populate(["serviceId", "clientId", "scheduleId", "workerId"])
      .sort([["timestamp", -1]])
      .exec();

    return appointments;
  }

  async getClients(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const query = JSON.parse(JSON.stringify(options));
    const clientsIds = [];
    const clients = [];
    const appointments = await AppointmentRelations.find(query, {
      clientId: 1,
    }).populate(["clientId"]);

    if (appointments?.length) {
      appointments.forEach((client) => {
        if (!clientsIds.includes(client?.clientId?._id)) {
          clientsIds.push(client?.clientId?._id);
          clients.push(client);
        }
      });
    }

    return clients;
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
