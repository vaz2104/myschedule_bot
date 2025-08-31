const TelegramBot = require("node-telegram-bot-api");
const formatDate = require("../lib/formatDate");
const Bot = require("../models/v.20/Bot");
const CompanyService = require("../services/v.2/CompanyService");
const AppointmentRelations = require("../models/v.20/AppointmentRelations");
// const AppointmentService = require("../services/v.2/AppointmentService");

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

    const users = await CompanyService.getClientRelation({
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

  async newAppointment(appointment) {
    const botData = await Bot.findById(appointment?.botId).populate([
      "adminId",
    ]);

    const appointmentData = await AppointmentRelations.findById(
      appointment?._id
    ).populate(["botId", "serviceId", "clientId", "scheduleId"]);

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) {
      return;
    }

    // console.log(appointmentData);

    const appointments = JSON.parse(
      JSON.stringify(appointmentData?.scheduleId?.schedule)
    );

    const message = `Новий запис на прийом 🎉\n`;

    const clientInfo = `<b>Клієнт:</b>\n${
      appointmentData?.clientId?.firstName
    } ${
      appointmentData?.clientId?.username
        ? `@${appointmentData?.clientId?.username}`
        : ""
    }\n`;

    const scheduleInfo = `<b>Зарезервоване місце:</b>\n${formatDate(
      appointmentData?.scheduleId?.date
    )}, ${appointments[appointmentData?.appointmentKey]}\n`;

    const serviceInfo = `<b>Обрана послуга:</b>\n${
      appointmentData?.serviceId?.service
    }\n${
      appointmentData?.serviceId?.priceWithSale
        ? `Активна знижка: <b>${appointmentData?.serviceId?.priceWithSale}</b> <s>${appointmentData?.serviceId?.price}</s>`
        : `${appointmentData?.serviceId?.price}`
    }`;

    const fullMessage = `${message}${clientInfo}${scheduleInfo}${
      appointmentData?.serviceId ? serviceInfo : ""
    }`;

    await bot.sendMessage(botData?.adminId?.userId, fullMessage, {
      parse_mode: "HTML",
    });
  }

  async cancelAppointment(appointmentData) {
    const botData = await Bot.findById(appointmentData?.botId?._id).populate([
      "adminId",
    ]);

    // console.log(botData);
    // console.log(appointmentData);

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) {
      return;
    }

    const appointments = JSON.parse(
      JSON.stringify(appointmentData?.scheduleId?.schedule)
    );

    const message = `Скасовано запис на прийом 🚫\n`;

    const clientInfo = `<b>Клієнт:</b>\n${
      appointmentData?.clientId?.firstName
    } ${
      appointmentData?.clientId?.username
        ? `@${appointmentData?.clientId?.username}`
        : ""
    }\n`;

    const scheduleInfo = `<b>Зарезервоване місце:</b>\n${formatDate(
      appointmentData?.scheduleId?.date
    )}, ${appointments[appointmentData?.appointmentKey]}\n`;

    const fullMessage = `${message}${clientInfo}${scheduleInfo}`;

    await bot.sendMessage(botData?.adminId?.userId, fullMessage, {
      parse_mode: "HTML",
    });
  }
}

module.exports = new TelegramNotifications();
