const BotHintsRelations = require("../models/BotHintsRelations");

class BotHintsService {
  async create(options) {
    if (!options?.botId || !options?.adminId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newHint = await BotHintsRelations.create(options);
    return newHint;
  }

  async getAll(query) {
    if (!query) {
      throw new Error("Invalid data was sent"); // 400
    }

    const hints = await BotHintsRelations.find(query).sort([["timestamp", -1]]);
    return hints;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const hint = await BotHintsRelations.findById(id);
    return hint;
  }

  async update(id, query) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedHint = await BotHintsRelations.findByIdAndUpdate(id, query, {
      new: true,
    });
    return updatedHint;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const deletedService = await BotHintsRelations.findByIdAndDelete(id);
    return deletedService;
  }
}

module.exports = new BotHintsService();
