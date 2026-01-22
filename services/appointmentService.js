const AppointmentRelations = require("../models/AppointmentRelations");
const telegramUserService = require("./telegramUserService");

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
    const relations = [];
    const clients = [];
    const appointments = await AppointmentRelations.find(query, {
      clientId: 1,
      botId: 1,
    });

    if (appointments?.length) {
      appointments.forEach((appointment) => {
        if (!clientsIds.includes(appointment?.clientId.toString())) {
          clientsIds.push(appointment?.clientId.toString());
          relations.push(appointment);
        }
      });
    }

    if (clientsIds?.length) {
      await Promise.all(
        relations.map(async (relation) => {
          const userData = await telegramUserService.getOne(
            relation?.clientId,
            {
              companyID: relation?.botId,
            },
          );

          clients.push(userData);
        }),
      ).then(() => {
        return console.log("Success!");
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
      { new: true },
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
