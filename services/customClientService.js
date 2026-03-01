const CustomClient = require("../models/CustomClient");

class CustomClientService {
  async create(options) {
    if (!options?.botId || !options?.firstName) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await CustomClient.create(options);
    return response;
  }

  async getAll(query) {
    if (!query) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await CustomClient.find(query).sort([["timestamp", -1]]);
    return response;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await CustomClient.findById(id);
    return response;
  }

  async update(id, query) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await CustomClient.findByIdAndUpdate(id, query, {
      new: true,
    });
    return response;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await CustomClient.findByIdAndDelete(id);
    return response;
  }
}

module.exports = new CustomClientService();
