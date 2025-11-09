const InviteLink = require("../models/InviteLink");
const TelegramUser = require("../models/TelegramUser");
const WorkerBotRelations = require("../models/WorkerBotRelations");
const AuthService = require("../services/AuthService");

class PanelCallbacks {
  async generateAuthData(bot, options) {
    const { chatId, username } = options;

    const telegramUserResponse = await TelegramUser.findOne({
      userId: chatId,
    });

    if (!telegramUserResponse?._id) {
      await bot.sendMessage(
        chatId,
        `Помилка запиту!\nБудь ласка, повторіть спробу знову`
      );
      return false;
    }

    const authData = await AuthService.createKey({
      telegramUserId: telegramUserResponse?._id,
    });

    if (!authData?._id) {
      await bot.sendMessage(chatId, "Помилка авторизації", {
        parse_mode: "HTML",
      });
      return;
    }

    const message = `Ваші дані для одноразового входу:\n<b>Логін:</b> ${telegramUserResponse?.username}\n<b>Пароль:</b> ${authData.key}`;
    await bot.sendMessage(chatId, message, {
      parse_mode: "HTML",
    });
  }

  async inviteWorker(bot, options, commandData) {
    const { chatId } = options;

    const telegramUserResponse = await TelegramUser.findOne({
      userId: chatId,
    });

    if (!commandData || !telegramUserResponse?._id) {
      await bot.sendMessage(
        chatId,
        `Помилка запиту!\nБудь ласка, повторіть спробу знову`
      );
      return false;
    }

    const ativeInviteSession = await InviteLink.findOne({ key: commandData });

    if (!ativeInviteSession?._id) {
      await bot.sendMessage(
        chatId,
        `Помилка запиту!\nСхоже, Ваше посилання не активне`
      );
      return false;
    }

    const hasWorkerRelation = await WorkerBotRelations.findOne({
      workerId: telegramUserResponse?._id,
      botId: ativeInviteSession?.botId,
    });

    if (hasWorkerRelation) {
      await bot.sendMessage(
        options.chatUserId,
        `Ви вже приєднані до даного бота!`
      );
      return false;
    }

    const newWorker = await WorkerBotRelations.create({
      workerId: telegramUserResponse?._id,
      botId: ativeInviteSession?.botId,
    });

    if (newWorker) {
      await InviteLink.findByIdAndDelete(ativeInviteSession._id);
      await bot.sendMessage(
        chatId,
        `Вітаємо, Ви успішно авторизувалися!\nТепер у Вас є доступ до платформи.`,
        {
          parse_mode: "HTML",
        }
      );
    }
  }
}

module.exports = new PanelCallbacks();
