const SubscriptionsHistory = require("../models/SubscriptionsHistory");

class SubscriptionsService {
  async create(options) {
    if (!options?.botId) {
      throw new Error("Invalid data was sent"); // 400
    }

    options.timestamp = Date.now();
    const response = await SubscriptionsHistory.create(options);
    return response;
  }

  async getAll(query) {
    if (!query) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await SubscriptionsHistory.find(query).sort([
      ["timestamp", -1],
    ]);
    return response;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await SubscriptionsHistory.findById(id);
    return response;
  }

  async update(id, query) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await SubscriptionsHistory.findByIdAndUpdate(id, query, {
      new: true,
    });
    return response;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const response = await SubscriptionsHistory.findByIdAndDelete(id);
    return response;
  }
}

module.exports = new SubscriptionsService();
