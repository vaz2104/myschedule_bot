const Notifications = require("../models/Notifications");

class AppointmentService {
  async create(options) {
    let { company_id, client_id } = options;

    if (!company_id || !client_id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const notification = await Notifications.create(options);
    return notification;
  }

  async getAllByClientId(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const notifications = await Notifications.find({
      client_id: id,
    })
      .populate(["client_id", "company_id"])
      .sort([["date", -1]])
      .exec();

    return notifications;
  }

  async getAllByCompanyId(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const notifications = await Notifications.find({
      company_id: id,
    })
      .populate(["client_id", "company_id"])
      .sort([["date", -1]])
      .exec();

    return notifications;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }
    const notification = await Notifications.findById(id);
    return notification;
  }

  async update(options) {
    let { company_id, client_id, _id } = options;

    if (!_id || !company_id || !client_id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const notification = await Notifications.findByIdAndUpdate(_id, options, {
      new: true,
    });

    return notification;
  }
  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const notification = await Notifications.findByIdAndDelete(id);

    return notification;
  }
}

module.exports = new AppointmentService();