const ClientHintsRelations = require("../models/ClientHintsRelations");

class ClientHintsService {
  async create(options) {
    if (!options?.botId || !options?.userId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newHint = await ClientHintsRelations.create(options);
    return newHint;
  }

  async getAll(query) {
    if (!query) {
      throw new Error("Invalid data was sent"); // 400
    }

    const hints = await ClientHintsRelations.find(query).sort([
      ["timestamp", -1],
    ]);
    return hints;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const hint = await ClientHintsRelations.findById(id);
    return hint;
  }

  async update(id, query) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedHint = await ClientHintsRelations.findByIdAndUpdate(
      id,
      query,
      {
        new: true,
      },
    );
    return updatedHint;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const deletedService = await ClientHintsRelations.findByIdAndDelete(id);
    return deletedService;
  }
}

module.exports = new ClientHintsService();
