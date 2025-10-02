const TelegramBot = require("node-telegram-bot-api");
const Bot = require("../../models/v.20/Bot");
const WorkerBotRelations = require("../../models/v.20/WorkerBotRelations");

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
}

module.exports = new WorkerService();
