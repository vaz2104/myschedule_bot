const TelegramBot = require("node-telegram-bot-api");
const formatDate = require("../lib/formatDate");
const Bot = require("../models/Bot");
const AppointmentRelations = require("../models/AppointmentRelations");
const TelegramUser = require("../models/TelegramUser");

class TelegramNotifications {
  async newServiceDiscount(newServiceOptions, systemUserId) {
    const { botId, service, price, priceWithSale, saleEndDay } =
      newServiceOptions;

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

    const user = await TelegramUser.findById(systemUserId);

    await bot.sendMessage(user?.userId, message, {
      parse_mode: "HTML",
    });

    // return Promise.all(
    //   users.map(async (user) => {
    //     await bot.sendMessage(user?.telegramUserId?.userId, message, {
    //       parse_mode: "HTML",
    //     });
    //   })
    // ).then(() => {
    //   console.log("Notifications have been sent");
    // });
  }

  async newService(newServiceOptions, systemUserId) {
    if (!systemUserId) return;
    // console.log("systemUserId", systemUserId);

    const { botId, service, price, priceWithSale, saleEndDay } =
      newServiceOptions;

    const message = `Привіт!\nУ нас стартує нова послуга <b>"${service}"</b>!\nІі вартість становить <b>${price} грн</b>\nСкористайтесь послугою! Переходьте в панель та обирайте вільне місце 🥰\n${
      priceWithSale &&
      saleEndDay &&
      `Також зараз діє знижка <b>${priceWithSale} грн</b>!\nАкція триватиме до <b>${formatDate(
        saleEndDay
      )}</b>\n`
    }`;

    const botData = await Bot.findById(botId);
    let bot = new TelegramBot(botData?.token, {
      polling: false,
    });

    if (!bot) {
      return;
    }

    const user = await TelegramUser.findById(systemUserId);
    // console.log("user", user);

    await bot.sendMessage(user?.userId, message, {
      parse_mode: "HTML",
    });
  }

  async newAppointment(appointment) {
    // console.log("appointment", appointment);

    const botData = await Bot.findById(appointment?.botId).populate([
      "adminId",
    ]);

    // console.log("botData", botData);

    const appointmentData = await AppointmentRelations.findById(
      appointment?._id
    ).populate(["botId", "serviceId", "clientId", "scheduleId", "workerId"]);

    // console.log("appointmentData", appointmentData);

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

    // console.log("adminId", botData?.adminId?._id);
    // console.log("workerId", appointmentData?.workerId?._id);

    if (
      botData?.adminId?._id.toString() !==
      appointmentData?.workerId?._id.toString()
    ) {
      let companyBot = new TelegramBot(botData?.token, {
        polling: false,
      });

      if (!companyBot) {
        return;
      }

      await companyBot.sendMessage(
        appointmentData?.workerId?.userId,
        fullMessage,
        {
          parse_mode: "HTML",
        }
      );
    }
  }

  async adminCancelAppointment(appointmentData) {
    // console.log(appointmentData);

    const botData = await Bot.findById(appointmentData?.botId?._id).populate([
      "adminId",
    ]);

    let bot = new TelegramBot(botData?.token, {
      polling: false,
    });

    if (!bot) {
      return;
    }

    const appointments = JSON.parse(
      JSON.stringify(appointmentData?.scheduleId?.schedule)
    );

    const message = `Скасовано запис на прийом 🚫\n`;

    const scheduleInfo = `<b>Адміністратор скасував Ваше зарезервоване місце:</b>\n${formatDate(
      appointmentData?.scheduleId?.date
    )}, ${appointments[appointmentData?.appointmentKey]}\n`;

    const fullMessage = `${message}${scheduleInfo}`;

    const user = await TelegramUser.findById(appointmentData?.clientId);

    await bot.sendMessage(user?.userId, fullMessage, {
      parse_mode: "HTML",
    });
  }

  async clientCancelAppointment(appointmentData) {
    const botData = await Bot.findById(appointmentData?.botId?._id).populate([
      "adminId",
    ]);

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

    if (
      botData?.adminId?._id.toString() !== appointmentData?.workerId?.toString()
    ) {
      let companyBot = new TelegramBot(botData?.token, {
        polling: false,
      });

      if (!companyBot) {
        return;
      }

      const user = await TelegramUser.findById(appointmentData?.workerId);

      await companyBot.sendMessage(user?.userId, fullMessage, {
        parse_mode: "HTML",
      });
    }
  }
}

module.exports = new TelegramNotifications();
