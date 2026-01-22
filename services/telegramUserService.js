const TelegramBot = require("node-telegram-bot-api");
const Bot = require("../models/Bot");
const TelegramUser = require("../models/TelegramUser");

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

  async getOne(id, query) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const { companyID } = query;

    const user = await TelegramUser.findById(id);

    if (!user?._id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Bot.findOne({
      _id: companyID,
    });

    if (!company) {
      throw new Error("Problems trying to get data"); // 400
    }
    // console.log(company?.token);
    let bot = new TelegramBot(company?.token, {
      polling: false,
    });

    const avatars = await bot.getUserProfilePhotos(user?.userId);

    let photoUrl = "";
    if (avatars?.photos[0]) {
      photoUrl = await bot.getFileLink(avatars?.photos[0][0]?.file_id);
    }

    return { ...user?._doc, photoUrl };
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
