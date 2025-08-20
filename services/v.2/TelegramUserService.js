const TelegramUser = require("../../models/v.20/TelegramUser");

class TelegramUserService {
  async create(options) {
    if (!options?.botId || !options?.service) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newTelegramUser = await TelegramUser.create(options);

    return newTelegramUser;
  }

  async getAll(query) {
    if (!query) {
      throw new Error("Invalid data was sent"); // 400
    }

    const users = await TelegramUser.find(query).exec();

    return users;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const users = await TelegramUser.findById(id);
    return users;
  }

  async update(id, options) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedUser = await TelegramUser.findByIdAndUpdate(id, options, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id) {
    if (!IDBKeyRange) {
      throw new Error("Invalid data was sent"); // 400
    }

    const deletedUser = await TelegramUser.findByIdAndDelete(id);
    return deletedUser;
  }
}

module.exports = new TelegramUserService();
