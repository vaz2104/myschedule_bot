const TelegramBot = require("node-telegram-bot-api");
const formatDate = require("../lib/formatDate");
const Bot = require("../models/v.20/Bot");
const companyService = require("../services/v.2/companyService");

class TelegramNotifications {
  async newServiceDiscount(oldServiceOptions, newServiceOptions) {
    const { botId, service, price, priceWithSale, saleEndDay } =
      newServiceOptions;

    // formatDate(oldServiceOptions?.saleEndDay) !==
    //   formatDate(options?.saleEndDay) ||
    //   oldServiceOptions?.priceWithSale != options?.priceWithSale;

    const message = `Привіт!\nУ нас нова знижка на послугу <b>"${service}"</b>!\nМи знизили ціну з <b>${price} грн</b> до <b>${priceWithSale} грн</b>!\nАкція діє до <b>${formatDate(
      saleEndDay
    )}</b>\nВстигніть скористатися нагодою, переходьте в панель та обирайте вільне місце 🥰`;

    const botData = await Bot.findById(botId);
    let bot = new TelegramBot(botData?.token, {
      polling: false,
    });

    if (!bot) {
      return;
    }

    const users = await companyService.getClientRelation({
      botId,
    });

    return Promise.all(
      users.map(async (user) => {
        await bot.sendMessage(user?.telegramUserId?.userId, message, {
          parse_mode: "HTML",
        });
      })
    ).then(() => {
      console.log("Notifications have been sent");
    });
  }
}

module.exports = new TelegramNotifications();
