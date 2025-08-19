const InviteLink = require("../models/v.20/InviteLink");
const WorkerBotRelations = require("../models/v.20/WorkerBotRelations");

class PanelCallbacks {
  async generateAuthData(bot, userObject) {
    const message = ``;
    await bot.sendMessage(userObject.id, message, {
      parse_mode: "HTML",
    });
  }

  async inviteWorker(commandData, bot, options) {
    // console.log(commandData, bot, options);

    if (!commandData) {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка запиту!\nБудь ласка, повторіть спробу знову`
      );
      return false;
    }

    const ativeInviteSession = await InviteLink.findOne({ key: commandData });

    if (!ativeInviteSession?._id) {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка запиту!\nСхоже, Ваше посилання не активне`
      );
      return false;
    }

    const hasWorkerRelation = await WorkerBotRelations.findOne({
      workerId: options.telegramUserId,
      botId: ativeInviteSession?.botId,
    });

    // console.log("hasTeacherRelation", hasTeacherRelation);

    if (hasWorkerRelation) {
      await bot.sendMessage(
        options.chatUserId,
        `Ви вже приєднані до даного бота!`
      );
      return false;
    }

    const newWorker = await WorkerBotRelations.create({
      workerId: options.telegramUserId,
      botId: ativeInviteSession?.botId,
    });

    if (newWorker) {
      await InviteLink.findByIdAndDelete(ativeInviteSession._id);
      await bot.sendMessage(
        options.chatUserId,
        `Вітаємо, Ви успішно авторизувалися!\nТепер у Вас є доступ до платформи.`,
        {
          parse_mode: "HTML",
          // reply_markup: {
          //   inline_keyboard: [
          //     [
          //       {
          //         text: "Увійти в платформу",
          //         callback_data: "generateAuthData",
          //       },
          //     ],
          //   ],
          //   one_time_keyboard: true,
          // },
        }
      );
    }
  }
}

module.exports = new PanelCallbacks();
