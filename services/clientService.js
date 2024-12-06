const Client = require("../models/Client");

class ClientService {
  async create(user) {
    if (!user?.username || !user?.userId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const client = await Client.findOne({
      userId: user?.userId,
    }).exec();

    if (client) {
      throw new Error("Client is already registered"); // 409
    }

    const newClient = await Client.create(user);
    return newClient;
  }

  async getAll() {
    const clients = await Client.find();
    return clients;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }
    const client = await Client.findOne({
      userId: id.toString(),
    }).exec();

    return client;
  }

  async update(user) {
    if (!user?._id) {
      throw new Error("Invalid data was sent");
    }

    const updatedClient = await Client.findByIdAndUpdate(user?._id, user, {
      new: true,
    });

    return updatedClient;
  }
}

module.exports = new ClientService();
