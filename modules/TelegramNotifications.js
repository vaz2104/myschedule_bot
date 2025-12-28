const TelegramBot = require("node-telegram-bot-api");
const Bot = require("../models/Bot");
const AppointmentRelations = require("../models/AppointmentRelations");
const TelegramUser = require("../models/TelegramUser");
const TelegramMessages = require("./TelegramMessages");

class TelegramNotifications {
  async newServiceDiscount(newServiceOptions, systemUserId) {
    const { botId, service, price, priceWithSale, saleEndDay } =
      newServiceOptions;

    const botData = await Bot.findById(botId);
    let bot = new TelegramBot(botData?.token, {
      polling: false,
    });

    if (!bot) {
      return;
    }

    const user = await TelegramUser.findById(systemUserId);

    await bot.sendMessage(
      user?.userId,
      TelegramMessages.newServiceDiscount(
        service,
        price,
        priceWithSale,
        saleEndDay
      ),
      {
        parse_mode: "HTML",
      }
    );

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

    const { botId, service, price, priceWithSale, saleEndDay } =
      newServiceOptions;

    const botData = await Bot.findById(botId);
    let bot = new TelegramBot(botData?.token, {
      polling: false,
    });

    if (!bot) {
      return;
    }

    const user = await TelegramUser.findById(systemUserId);

    await bot.sendMessage(
      user?.userId,
      TelegramMessages.newService(service, price, priceWithSale, saleEndDay),
      {
        parse_mode: "HTML",
      }
    );
  }

  async newAppointment(appointment) {
    const botData = await Bot.findById(appointment?.botId).populate([
      "adminId",
    ]);

    const appointmentData = await AppointmentRelations.findById(
      appointment?._id
    ).populate(["botId", "serviceId", "clientId", "scheduleId", "workerId"]);

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) {
      return;
    }

    const appointments = JSON.parse(
      JSON.stringify(appointmentData?.scheduleId?.schedule)
    );

    await bot.sendMessage(
      botData?.adminId?.userId,
      TelegramMessages.newAppointment(
        appointmentData?.clientId?.firstName,
        appointmentData?.clientId?.username,
        appointmentData?.scheduleId?.date,
        appointments[appointmentData?.appointmentKey],
        appointmentData?.serviceId?.service,
        appointmentData?.serviceId?.price,
        appointmentData?.serviceId?.priceWithSale
      ),
      {
        parse_mode: "HTML",
      }
    );

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
        TelegramMessages.newAppointment(
          appointmentData?.clientId?.firstName,
          appointmentData?.clientId?.username,
          appointmentData?.scheduleId?.date,
          appointments[appointmentData?.appointmentKey],
          appointmentData?.serviceId?.service,
          appointmentData?.serviceId?.price,
          appointmentData?.serviceId?.priceWithSale
        ),
        {
          parse_mode: "HTML",
        }
      );
    }
  }

  async adminCancelAppointment(appointmentData) {
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

    const user = await TelegramUser.findById(appointmentData?.clientId);

    await bot.sendMessage(
      user?.userId,
      TelegramMessages.adminCancelAppointment(
        appointmentData?.scheduleId?.date,
        appointments[appointmentData?.appointmentKey]
      ),
      {
        parse_mode: "HTML",
      }
    );
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

    await bot.sendMessage(
      botData?.adminId?.userId,
      TelegramMessages.clientCancelAppointment(
        appointmentData?.clientId?.firstName,
        appointmentData?.clientId?.username,
        appointmentData?.scheduleId?.date,
        appointments[appointmentData?.appointmentKey]
      ),
      {
        parse_mode: "HTML",
      }
    );

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

      await companyBot.sendMessage(
        user?.userId,
        TelegramMessages.clientCancelAppointment(
          appointmentData?.clientId?.firstName,
          appointmentData?.clientId?.username,
          appointmentData?.scheduleId?.date,
          appointments[appointmentData?.appointmentKey]
        ),
        {
          parse_mode: "HTML",
        }
      );
    }
  }
}

module.exports = new TelegramNotifications();
