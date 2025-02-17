const TelegramBot = require("node-telegram-bot-api");
const Company = require("../models/Company");

class BotService {
  async getInfo(token) {
    if (!token) {
      throw new Error("Invalid data was sent"); // 400
    }

    let bot = new TelegramBot(token, {
      polling: false,
    });

    // return

    const data = await bot.getMe();

    if (data) {
      const avatars = await bot.getUserProfilePhotos(data?.id);

      if (avatars?.photos[0]) {
        data.avatar = await bot.getFileLink(avatars?.photos[0][0]?.file_id);
      }
    }

    bot.stopPolling();
    bot = null;
    return data;
  }

  async getClientPhoto(clientTelegramId, companyId) {
    if (!clientTelegramId || !companyId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Company.findOne({
      _id: companyId,
    });

    if (!company) {
      throw new Error("Problems trying to get data"); // 400
    }

    let bot = new TelegramBot(company?.botToken, {
      polling: false,
    });

    const avatars = await bot.getUserProfilePhotos(clientTelegramId);
    let avatarUrl = "";
    if (avatars?.photos[0]) {
      avatarUrl = await bot.getFileLink(avatars?.photos[0][0]?.file_id);
    }

    return avatarUrl;
  }
}

module.exports = new BotService();
