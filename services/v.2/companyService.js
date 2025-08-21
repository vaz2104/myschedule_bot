const TelegramBot = require("node-telegram-bot-api");
const Bot = require("../../models/v.20/Bot");
const ClientBotRelations = require("../../models/v.20/ClientBotRelations");
const WorkerBotRelations = require("../../models/v.20/WorkerBotRelations");
const botService = require("./botService");

class CompanyService {
  async create(options) {
    let { adminId, token } = options;

    if (!adminId || !token) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Bot.findOne({
      adminId,
      token,
    });

    if (company) {
      throw new Error("Company is already registered"); // 400
    }

    const newCompany = await Bot.create(options);
    return newCompany;
  }

  async getAll(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const bots = await Bot.find(options);

    const botsData = [];

    for (let item = 0; item < bots.length; item++) {
      const botItem = bots[item];

      let bot = new TelegramBot(botItem.token, {
        polling: false,
      });

      if (!bot) return [];

      const data = await bot.getMe();
      const avatars = await bot.getUserProfilePhotos(data?.id);

      if (avatars?.photos[0]) {
        data.avatar = await bot.getFileLink(avatars?.photos[0][0]?.file_id);
      }

      botsData.push({ _id: botItem._id, ...data });
    }

    return botsData;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const botData = await Bot.findById(id);
    let bot = new TelegramBot(botData.token, {
      polling: false,
    });

    if (!bot) return [];

    const telegramData = await bot.getMe();

    return { ...botData, ...telegramData };
  }

  async update(id, options) {
    let { botToken } = options;
    if (!id || !botToken) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedCompany = await Company.findByIdAndUpdate(id, options, {
      new: true,
    });

    return updatedCompany;
  }

  async getClientRelation(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await ClientBotRelations.find(options);
    return relation;
  }

  async getWorkerRelation(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await WorkerBotRelations.find(options);
    return relation;
  }
}

module.exports = new CompanyService();
