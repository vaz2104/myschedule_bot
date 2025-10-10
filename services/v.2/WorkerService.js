const TelegramBot = require("node-telegram-bot-api");
const Bot = require("../../models/v.20/Bot");
const WorkerBotRelations = require("../../models/v.20/WorkerBotRelations");
const WorkerBotServices = require("../../models/v.20/WorkerBotServices");

class WorkerService {
  async getBots(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relations = await WorkerBotRelations.find(
      { workerId: id },
      { botId: 1 }
    );

    const relatedBots = [];

    await Promise.all(
      relations.map(async (relation) => {
        const botItem = await Bot.findById(relation?.botId);

        let bot = new TelegramBot(botItem.token, {
          polling: false,
        });

        if (!bot) return [];

        const data = await bot.getMe();
        const avatars = await bot.getUserProfilePhotos(data?.id);

        if (avatars?.photos[0]) {
          data.avatar = await bot.getFileLink(avatars?.photos[0][0]?.file_id);
        }

        relatedBots.push({ _id: botItem._id, ...data });
      })
    ).then(() => {
      return console.log("Success!");
    });

    return relatedBots;
  }

  async getServices(query) {
    const { botId, workerId } = query;
    if (!botId || !workerId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await WorkerBotServices.findOne(query);
    return relation?.services;
  }

  async setServices(options) {
    const { botId, workerId } = options;
    if (!botId || !workerId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await WorkerBotServices.findOne({ botId, workerId });

    if (!relation?._id) {
      const newRelation = await WorkerBotServices.create(options);
      return newRelation?.services;
    }

    const updatedRelation = await WorkerBotServices.findByIdAndUpdate(
      relation?._id,
      { services: options?.services },
      { new: true }
    );

    return updatedRelation?.services;
  }
}

module.exports = new WorkerService();
