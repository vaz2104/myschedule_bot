const TelegramBot = require("node-telegram-bot-api");

class BotService {
  async getInfo(token) {
    if (!token) {
      throw new Error("Invalid data was sent"); // 400
    }

    const bot = new TelegramBot(token, {
      polling: {
        interval: 300,
        autoStart: true,
      },
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
    return data;
  }
}

module.exports = new BotService();
